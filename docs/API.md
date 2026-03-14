# Documentação da API - QR Coffee

API REST do backend **QR Coffee**, porta **3352**. A maioria dos endpoints exige autenticação via **JWT** no header `Authorization: Bearer <token>`.

**Base URL:** `http://localhost:3352`

---

## Índice

1. [Autenticação](#autenticação)
2. [Categorias](#categorias)
3. [Produtos](#produtos)
4. [Mesas](#mesas)
5. [Pedidos (Orders)](#pedidos-orders)
6. [Comandas](#comandas)
7. [Dashboard](#dashboard)

---

## Autenticação

Endpoints públicos (sem JWT).

### Registrar empresa e usuário

```http
POST /auth/register
Content-Type: application/json
```

**Body:**

| Campo         | Tipo   | Obrigatório | Descrição        |
|---------------|--------|-------------|------------------|
| companyName   | string | Sim         | Nome da empresa  |
| userName      | string | Sim         | Nome do usuário  |
| email         | string | Sim         | E-mail (login)   |
| password      | string | Sim         | Senha            |

**Resposta 201:**

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "uuid": "uuid-do-usuario",
    "email": "user@example.com",
    "name": "Nome do Usuário",
    "companyUuid": "uuid-da-empresa",
    "companyName": "Nome da Empresa"
  }
}
```

**Erros:** `409` — E-mail já cadastrado.

---

### Login

```http
POST /auth/login
Content-Type: application/json
```

**Body:**

| Campo    | Tipo   | Obrigatório | Descrição |
|----------|--------|-------------|-----------|
| email    | string | Sim         | E-mail    |
| password | string | Sim         | Senha     |

**Resposta 200:** mesmo formato de `POST /auth/register` (`accessToken` + `user`).

**Erros:** `401` — E-mail ou senha inválidos.

---

### Dados do usuário autenticado

Requer JWT.

```http
GET /auth/me
Authorization: Bearer <token>
```

**Resposta 200:**

```json
{
  "uuid": "uuid-do-usuario",
  "email": "user@example.com",
  "name": "Nome do Usuário",
  "companyUuid": "uuid-da-empresa",
  "companyName": "Nome da Empresa"
}
```

---

## Categorias

Base: `/categories`. Todos os endpoints requerem JWT.

### Criar categoria

```http
POST /categories
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**

| Campo | Tipo   | Obrigatório | Descrição      |
|-------|--------|-------------|----------------|
| name  | string | Sim         | Nome da categoria |

**Resposta 201:** objeto da categoria criada (ex.: `{ "uuid": "...", "name": "...", ... }`).

---

### Listar todas as categorias

```http
GET /categories/all
Authorization: Bearer <token>
```

**Resposta 200:** array de categorias da empresa do usuário.

---

## Produtos

Base: `/products`. Todos os endpoints requerem JWT.

### Criar produto

```http
POST /products
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**

| Campo        | Tipo    | Obrigatório | Descrição          |
|--------------|---------|-------------|--------------------|
| uuid         | string  | Sim         | UUID do produto    |
| name         | string  | Sim         | Nome               |
| price        | number  | Sim         | Preço              |
| active       | boolean | Sim         | Ativo              |
| description  | string  | Sim         | Descrição          |
| categoryUuid | string  | Sim         | UUID da categoria  |

**Resposta 201:** objeto do produto criado.

---

### Criar vários produtos

```http
POST /products/many
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:** array de objetos no mesmo formato do corpo de `POST /products` (uuid, name, price, active, description, categoryUuid).

**Resposta 201:** resultado da criação em lote.

---

### Listar produtos

```http
GET /products/all?categoryUuid=<uuid>&name=<texto>
Authorization: Bearer <token>
```

**Query (opcionais):**

| Parâmetro    | Tipo   | Descrição                    |
|--------------|--------|------------------------------|
| categoryUuid | string | Filtrar por categoria        |
| name         | string | Filtrar por nome             |

**Resposta 200:** array de produtos.

---

### Atualizar produto

```http
PUT /products?uuid=<uuid-do-produto>
Authorization: Bearer <token>
Content-Type: application/json
```

**Body (todos opcionais):**

| Campo        | Tipo    | Descrição          |
|--------------|---------|--------------------|
| name         | string  | Nome               |
| price        | string  | Preço              |
| active       | boolean | Ativo              |
| description  | string  | Descrição          |
| stock        | number  | Estoque            |
| categoryUuid | string  | UUID da categoria  |

**Resposta 200:** produto atualizado.

---

### Excluir produto(s)

```http
DELETE /products
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:** conforme implementação do use case (ex.: `{ "uuid": "..." }` ou lista de UUIDs). Ver DTO do controller.

**Resposta:** sucesso sem corpo ou 204.

---

## Mesas

Base: `/tables`. Todos os endpoints requerem JWT.

### Criar mesa

```http
POST /tables
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**

| Campo       | Tipo   | Obrigatório | Descrição        |
|-------------|--------|-------------|------------------|
| number      | number | Sim         | Número da mesa   |
| description | string | Não         | Descrição        |
| qrCode      | string | Não         | Código QR        |

**Resposta 201:** objeto da mesa criada.

---

### Listar mesas

```http
GET /tables
Authorization: Bearer <token>
```

**Resposta 200:** array de mesas da empresa.

---

### Buscar mesa por UUID

```http
GET /tables/:uuid
Authorization: Bearer <token>
```

**Resposta 200:** objeto da mesa.  
**Erros:** `404` — Mesa não encontrada.

---

### Atualizar mesa

```http
PATCH /tables/:uuid
Authorization: Bearer <token>
Content-Type: application/json
```

**Body (todos opcionais):**

| Campo       | Tipo   | Descrição        |
|-------------|--------|------------------|
| number      | number | Número da mesa   |
| description | string | Descrição        |
| qrCode      | string | Código QR        |

**Resposta 200:** mesa atualizada.  
**Erros:** `404` — Mesa não encontrada.

---

### Excluir mesa

```http
DELETE /tables/:uuid
Authorization: Bearer <token>
```

**Resposta:** sucesso sem corpo.  
**Erros:** `404` — Mesa não encontrada.

---

## Pedidos (Orders)

Base: `/orders`. Todos os endpoints requerem JWT.

**Status possíveis:** `PENDING` | `PREPARING` | `READY` | `DELIVERED`

### Criar pedido

```http
POST /orders
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**

| Campo      | Tipo   | Obrigatório | Descrição                          |
|------------|--------|-------------|------------------------------------|
| tableUuid  | string | Sim         | UUID da mesa                       |
| status     | string | Não         | Um dos status acima (default: PENDING) |
| items      | array  | Sim         | Itens do pedido                    |

Cada item em `items`:

| Campo       | Tipo   | Obrigatório | Descrição            |
|-------------|--------|-------------|----------------------|
| productUuid | string | Sim         | UUID do produto      |
| quantity    | number | Sim         | Quantidade           |
| unitPrice   | number | Sim         | Preço unitário       |

**Resposta 201:** pedido criado (com itens e mesa).

---

### Listar pedidos

```http
GET /orders?tableUuid=<uuid>&status=<PENDING|PREPARING|READY|DELIVERED>
Authorization: Bearer <token>
```

**Query (opcionais):**

| Parâmetro  | Tipo   | Descrição         |
|------------|--------|-------------------|
| tableUuid  | string | Filtrar por mesa  |
| status     | string | Filtrar por status |

**Resposta 200:** array de pedidos (cada um com `uuid`, `tableUuid`, `tableNumber`, `status`, `createdAt`, `items`).

---

### Buscar pedido por UUID

```http
GET /orders/:uuid
Authorization: Bearer <token>
```

**Resposta 200:** pedido completo.  
**Erros:** `404` — Pedido não encontrado.

---

### Atualizar pedido (status)

```http
PATCH /orders/:uuid
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**

| Campo  | Tipo   | Descrição     |
|--------|--------|---------------|
| status | string | Novo status   |

**Resposta 200:** pedido atualizado.  
**Erros:** `404` — Pedido não encontrado.

---

### Excluir pedido

```http
DELETE /orders/:uuid
Authorization: Bearer <token>
```

**Resposta:** sucesso sem corpo.  
**Erros:** `404` — Pedido não encontrado.

---

## Comandas

Base: `/comandas`. Todos os endpoints requerem JWT. Comandas são os mesmos pedidos (orders), com endpoints de listagem e resumo por mesa.

### Listar comandas

```http
GET /comandas?tableUuid=<uuid>&status=<status>
Authorization: Bearer <token>
```

**Query (opcionais):** `tableUuid`, `status` — iguais a `GET /orders`.

**Resposta 200:** array de pedidos no formato de orders.

---

### Resumo por mesa

```http
GET /comandas/summary?tableUuid=<uuid>&status=<status>
Authorization: Bearer <token>
```

**Resposta 200:**

```json
{
  "tables": [
    {
      "tableUuid": "uuid-mesa",
      "tableNumber": 1,
      "orders": [ /* lista de pedidos */ ],
      "total": 150.00
    }
  ],
  "grandTotal": 450.00
}
```

---

### Buscar comanda por UUID

```http
GET /comandas/:uuid
Authorization: Bearer <token>
```

**Resposta 200:** pedido (comanda).  
**Erros:** `404` — Comanda não encontrada.

---

### Atualizar comanda (status)

```http
PATCH /comandas/:uuid
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:** `{ "status": "PENDING" | "PREPARING" | "READY" | "DELIVERED" }`

**Resposta 200:** comanda atualizada.  
**Erros:** `404` — Comanda não encontrada.

---

### Excluir comanda

```http
DELETE /comandas/:uuid
Authorization: Bearer <token>
```

**Resposta:** sucesso sem corpo.  
**Erros:** `404` — Comanda não encontrada.

---

## Dashboard

Base: `/dashboard`. Todos os endpoints requerem JWT.

**Período:** `period` pode ser `day` ou `month`. Datas em `from` e `to` no formato ISO (ex.: `YYYY-MM-DD` ou `YYYY-MM`).

### Atendimento (estatísticas por período)

```http
GET /dashboard/attendance?period=day|month&from=<date>&to=<date>
Authorization: Bearer <token>
```

**Resposta 200:** array de pontos de atendimento:

```json
[
  {
    "label": "2025-03",
    "period": "2025-03",
    "total": 120,
    "delivered": 100,
    "pending": 20
  }
]
```

---

### Atendimento (resumo)

```http
GET /dashboard/attendance/summary?from=<date>&to=<date>
Authorization: Bearer <token>
```

**Resposta 200:**

```json
{
  "totalOrders": 120,
  "deliveredOrders": 100,
  "pendingOrders": 20,
  "lastPeriodLabel": "Março 2025"
}
```

---

### Financeiro (estatísticas por período)

```http
GET /dashboard/financial?period=day|month&from=<date>&to=<date>
Authorization: Bearer <token>
```

**Resposta 200:** array de pontos financeiros:

```json
[
  {
    "label": "2025-03",
    "period": "2025-03",
    "revenue": 15000.50,
    "orderCount": 80
  }
]
```

---

### Financeiro (resumo)

```http
GET /dashboard/financial/summary?from=<date>&to=<date>
Authorization: Bearer <token>
```

**Resposta 200:**

```json
{
  "totalRevenue": 15000.50,
  "orderCount": 80,
  "lastPeriodLabel": "Março 2025"
}
```

---

## Autenticação nas requisições

Para todos os endpoints exceto `POST /auth/register` e `POST /auth/login`, envie o token JWT no header:

```http
Authorization: Bearer <seu-access-token>
```

Se o token estiver ausente ou inválido, a API retornará `401 Unauthorized`.

---

## Códigos de status HTTP

| Código | Significado        |
|--------|--------------------|
| 200    | OK                 |
| 201    | Created            |
| 204    | No Content         |
| 400    | Bad Request        |
| 401    | Unauthorized       |
| 404    | Not Found          |
| 409    | Conflict           |
