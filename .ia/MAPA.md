# Mapa do projeto — Super Atendimento (qrcoffee)

Contexto para agentes. Leia este arquivo antes de alterar código. Detalhe de endpoints está em `docs/API.md` e `docs/openapi.yaml`; este mapa diz **onde mexer** e **como o domínio se encaixa**.

Nome de produto: **Super Atendimento**. Pasta e pacotes: **qrcoffee**.

## O que o sistema faz

Atendimento de estabelecimento (café, bar, restaurante), multiempresa (`Company`):

- Cardápio público por QR da mesa — o cliente pede sem login.
- Painel da equipe — produtos, mesas, pedidos, comandas, caixa, dashboard e configurações.
- Pedido entra pelo QR ou pelo garçom no painel.
- Cliente pode chamar o atendente a partir do cardápio.

Tudo que é dado de negócio pertence a uma empresa. Usuário autenticado só vê a própria `companyUuid`.

## Como subir

| Peça | Onde | Porta |
| --- | --- | --- |
| API NestJS | `backend/` | **3352** (`backend/src/main.ts`) |
| App Next.js | `frontend/` | **3000** (`npm run start:dev`) |
| Banco | PostgreSQL via Prisma | `DATABASE_URL` |

Variáveis em `.env.example`:

- `DATABASE_URL` — obrigatória no backend.
- `NEXT_PUBLIC_BASE_API_URL` — padrão `http://localhost:3352`.
- `NEXT_PUBLIC_BASE_FRONTEND_URL` — origem usada no QR da mesa (padrão: origin do browser).
- `JWT_SECRET` — lido no gateway; há fallback inseguro no código se não estiver definido.

Backend: Node `>= 22`. `npm run start:dev` gera o Prisma Client antes de subir. Cliente gerado em `backend/src/infrastructure/prisma/generated` (não editar).

## Árvore que importa

```
qrcoffe/
  backend/src/
    domain/            entidades, repositórios (contratos), regras puras
    application/       use cases e serviços
    infrastructure/    Prisma, repositórios concretos
    interfaces/http/   controllers, guards, módulos Nest (API viva)
    interfaces/websocket/
    main.ts            escuta 3352, CORS aberto, Socket.IO
  frontend/app/        App Router (baseUrl = app/)
    <rota>/page.tsx
    components/ contexts/ hooks/ lib/ i18n/
  docs/                API.md, openapi.yaml
  .ia/                 este mapa
  .cursor/rules/       regra always-on de produto
```

Aliases do backend (`backend/tsconfig.json`, `baseUrl` = `src`): `@domain/*`, `@application/*`, `@infrastructure/*`, `@interfaces/*`, `@/*`.

Aliases do frontend (`frontend/tsconfig.json`, `baseUrl` = `app/`): imports como `components/sidebar`, `hooks/useRealtimeUpdates`, `lib/panelPermissions`, `contexts/AuthContext`, `i18n/LocaleContext`. `@/*` aponta para `frontend/app/*`.

## Camadas do backend

Fluxo esperado de uma feature autenticada:

1. Controller em `interfaces/http/` — HTTP, guards, DTO.
2. Use case em `application/<agregado>/use-cases/`.
3. Contrato em `domain/<agregado>/repositories/`.
4. Implementação Prisma em `infrastructure/<agregado>/repositories/`.
5. Schema em `backend/prisma/schema.prisma` + migration em `backend/prisma/migrations/`.

Módulos registrados em `backend/src/app.module.ts`: Auth, Realtime, Product, Category, Table, Order, Comanda, Dashboard, Cashier, Public, Company, Team, Ifood.

Exceções que furam a camada (Prisma direto no controller ou serviço): cardápio público (`public.controller.ts`), empresa, equipe, caixa e dashboard. Pedido, produto, categoria e mesa passam por use case + repositório.

**Controller morto:** `backend/src/interfaces/product/product.controller.ts` não entra em nenhum módulo. A API de produto que o painel usa é `backend/src/interfaces/http/product.controller.ts`.

## Modelo de dados

Fonte: `backend/prisma/schema.prisma`.

| Modelo | Papel |
| --- | --- |
| `Company` | Tenant. Tema do cardápio (`menuTheme` JSON), horário da cozinha (`kitchenHours` JSON), som ao pedido ficar pronto. |
| `User` | `ADMIN` ou `STAFF`. Senha em `passwordHash`. Pertence a uma empresa. |
| `UserGroup` + `UserGroupMember` | Grupos com lista de permissões do painel. STAFF herda a união dos grupos. ADMIN ignora e tem acesso total. |
| `Category` | Categoria de produto, por empresa. |
| `Product` | Preço, ativo, `isKitchenProduct` (some do cardápio público fora do horário da cozinha), `ifoodExternalCode` (mapeamento iFood). |
| `ProductAddon` | Opcional com `extraPrice` (ex.: shot extra). |
| `Table` | Número único por empresa, `qrCode`, descrição. `attendantCallAt` / `attendantCallMessage` enquanto o cliente chama o atendente. Mesa `number=0` = canal sintético iFood. |
| `Order` | Pedido de uma mesa. Status em string. `source` (`INTERNAL`\|`IFOOD`) + `externalId` (idempotência). |
| `OrderItem` | Quantidade, `unitPrice` no momento do pedido, `addonsSnapshot` JSON `[{ name, extraPrice }]`. |
| `IfoodIntegration` | 1:1 com Company — merchantId, credenciais, tokens, `enabled`, webhookSecret. |
| `CashierSession` | Caixa `OPEN` ou `CLOSED`, saldos. |
| `CashierMovement` | `REINFORCEMENT` ou `SANGRIA`. |

Status do pedido (`domain/order/entities/order.entity.ts`):

`PENDING` → `PREPARING` → `READY` → `DELIVERED`

Pedido e comanda são o **mesmo** `Order`. Dois controllers leem os mesmos use cases com permissões diferentes:

- `GET/POST/PATCH/DELETE /orders` — permissão `ORDERS` (fila de produção / cozinha).
- `GET/PATCH/DELETE /comandas` — permissão `TABS` (visão por mesa, com `GET /comandas/summary`).

Sem `ATTENDANCE_FINANCE` (e não sendo ADMIN), preços são ocultados por `redact-order-finance.ts`.

## Fluxos

**Cardápio (sem JWT).** QR aponta para `/cardapio?` com o uuid da mesa. Página: `frontend/app/cardapio/page.tsx`.

- `GET /public/menu/:tableUuid` — mesa, tema, produtos ativos. Produto de cozinha só entra se a cozinha estiver aberta (`domain/company/kitchen-hours.ts`). Horário vazio = sem restrição.
- `POST /public/orders` — cria pedido `PENDING` e emite `orders:update`.
- `POST /public/call-attendant` e `POST /public/table/:tableUuid/call-attendant` — grava a chamada na mesa (cooldown ~45s) e emite `attendant:call`.

**Painel.** Login `POST /auth/login`, cadastro `POST /auth/register`, sessão `GET /auth/me`. Token em `localStorage` na chave `qrcoffee_token` (`frontend/app/contexts/AuthContext.tsx`). Header `Authorization: Bearer <token>`.

**Chamada de atendente no painel.** Sino (`PanelNotificationBell`) e banner (`AttendantCallBanner`). `PATCH /tables/:uuid/attendant-call` marca como atendido e limpa os campos.

**Caixa.** Sessão independente do pedido. Faturamento do dashboard usa pedidos `DELIVERED`, não o movimento de caixa. Ver `application/dashboard/dashboard.service.ts` e `application/cashier/cashier.service.ts`.

**Estoque.** `frontend/app/stock/page.tsx` é tela com dados mock. Não há modelo nem endpoint de estoque.

## HTTP (prefixos)

Base `http://localhost:3352`. Guards: `JwtAuthGuard` + `PermissionsGuard` + `@RequirePanelPermission`. Público não usa JWT.

| Prefixo | Auth | Permissão | Função |
| --- | --- | --- | --- |
| `POST /auth/register`, `POST /auth/login` | não | — | conta e token |
| `GET /auth/me` | sim | — | usuário, empresa, permissões efetivas |
| `/products`, `/categories` | sim | `PRODUCTS` | cardápio interno. Listagem em `GET /products/all` e `GET /categories/all` |
| `/tables` | sim | `TABLES` | CRUD + `PATCH :uuid/attendant-call` |
| `/orders` | sim | `ORDERS` | CRUD da fila. Criação pelo garçom |
| `/comandas` | sim | `TABS` | mesma entidade, visão de comanda |
| `/dashboard/attendance`, `/dashboard/financial` | sim | `DASHBOARD`; financeiro também `DASHBOARD_FINANCE` | métricas |
| `/cashier` | sim | `CASHIER` | `status`, `open`, `close`, `movement`, `history` |
| `/company` | sim | `SETTINGS` | tema, som, horário da cozinha |
| `/integrations/ifood` | sim | `SETTINGS` | config + simulate; webhook público em `POST .../webhook` |
| `/team` | sim | admin de empresa | usuários, grupos, membros |
| `/public/...` | não | — | cardápio, pedido e chamada |

**iFood (MVP).** Webhook `ORDER_PLACED` ou `POST /integrations/ifood/simulate` → `IngestIfoodOrderUseCase` mapeia itens por `ifoodExternalCode`, cria `Order` com `source=IFOOD`, confirma na API Merchant e emite `orders:update`. Módulo: `interfaces/http/ifood.module.ts`. Sem sync de cardápio nem despacho bi-direcional ainda.

Contrato completo: `docs/API.md`.

## Tempo real

Socket.IO no mesmo processo da API, path `/socket.io`. Cliente entra na sala `company:<uuid>` com `{ token, companyUuid }` no handshake (`interfaces/websocket/realtime.gateway.ts`).

Eventos (mesmos nomes no front, `hooks/useRealtimeUpdates.ts`):

- `products:update`
- `orders:update`
- `tables:update`
- `menu:update`
- `attendant:call` — payload com mesa, mensagem e horário

Quem altera produto, pedido, mesa ou cardápio deve emitir o evento correspondente via `RealtimeGateway`. O cardápio público escuta `menu:update` / `orders` conforme a página.

## Frontend — rotas

App Router em `frontend/app`. Sidebar some em `/`, `/login`, `/register` e em qualquer `/cardapio...` (`components/sidebarWrapper.tsx`).

| Rota | Permissão | O que é |
| --- | --- | --- |
| `/` | — | landing (`welcome`) |
| `/login`, `/register` | — | auth |
| `/cardapio` | pública | cardápio da mesa |
| `/dashboard` | `DASHBOARD` | atendimento; bloco financeiro se `DASHBOARD_FINANCE` |
| `/products` | `PRODUCTS` | produtos, categorias, adicionais |
| `/tables` | `TABLES` | mesas e QR |
| `/tabs` | `TABS` | comandas; valores se `ATTENDANCE_FINANCE` |
| `/orders` | `ORDERS` | fila de pedidos e troca de status |
| item Cardápio na sidebar | `MENU` | modal (`CardapioModal`), não é rota |
| `/cashier` | `CASHIER` | caixa |
| `/stock` | `STOCK` | mock, sem API |
| `/settings` | `SETTINGS` | som, cozinha, tema, idioma; aba equipe só `ADMIN` |
| `/team` | — | redireciona para `/settings#team` |

Permissões do front espelham o back e precisam continuar iguais:

- `backend/src/application/permissions/panel-permissions.ts`
- `frontend/app/lib/panelPermissions.ts`

Códigos: `DASHBOARD`, `DASHBOARD_FINANCE`, `PRODUCTS`, `TABLES`, `TABS`, `ORDERS`, `ATTENDANCE_FINANCE`, `MENU`, `CASHIER`, `STOCK`, `SETTINGS`.

`ADMIN` passa em todo guard e em `userHasPanelPermission`. `STAFF` só com o código no grupo. Rota sem permissão cai no primeiro caminho permitido (`hooks/useRequirePanelPermission.ts`).

UI: Tailwind 4 e Mantine 8. Idiomas `pt`, `en`, `es` em `frontend/app/i18n/catalog/`. Texto novo entra nos três catálogos.

## Onde alterar o quê

| Mudança | Primeiro arquivo |
| --- | --- |
| Campo novo no banco | `backend/prisma/schema.prisma` + migration |
| Regra de pedido | `application/order/use-cases/` e `domain/order/` |
| Cardápio público / cozinha fechada | `interfaces/http/public.controller.ts`, `domain/company/kitchen-hours.ts` |
| Permissão nova | os dois arquivos de códigos acima, guard, sidebar e a página |
| Evento em tempo real | `realtime.gateway.ts` e `useRealtimeUpdates.ts` |
| Tela do painel | `frontend/app/<rota>/page.tsx` |
| Configuração da empresa | `interfaces/http/company.controller.ts` + componente em `frontend/app/components/` |
| Equipe | `interfaces/http/team.controller.ts`, `components/TeamSettingsSection.tsx` |

## Convenções para agentes

- Nomenclatura de produto: **comanda** na UI (`/tabs`, `/comandas`); no código a entidade é **Order**.
- Não criar endpoint de estoque assumindo que a tela já persiste — ela não persiste.
- Não ligar o controller em `interfaces/product/`; ele está fora do grafo Nest.
- Isolar por `companyUuid`. Não listar dado de outra empresa.
- Preço de item é snapshot (`unitPrice` + `addonsSnapshot`). Não recalcular pedido antigo com o preço atual do produto.
- Documentação de contrato HTTP fica em `docs/`, não neste mapa. Se o contrato mudar, atualizar `docs/API.md` (e o OpenAPI, se o endpoint estiver lá) junto com o código.
