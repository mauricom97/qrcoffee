# Emissão de NFC-e (Nota Fiscal de Consumidor Eletrônica)

O Super Atendimento permite converter pedidos em documentos fiscais válidos (NFC-e) para estabelecimentos de bares e restaurantes.

## Fluxo

1. **Configurar dados fiscais** – Acesse **Dados Fiscais** no menu e preencha CNPJ, razão social, endereço e demais informações da empresa.
2. **Emitir NFC-e** – Nos pedidos com status **Pronto** ou **Entregue**, use o botão **Emitir NFC-e** para gerar o documento fiscal.

## Provedores

- **Mock (desenvolvimento)** – Simula a emissão sem integrar com a SEFAZ. Use para testes.
- **Nuvem Fiscal** – API real. Cadastre-se em [nuvemfiscal.com.br](https://nuvemfiscal.com.br) e configure a API Key.
- **NFE.io** – API real. Cadastre-se em [nfe.io](https://nfe.io) e configure a API Key.

## Produção

Para emissão real de NFC-e:

1. Cadastre a empresa no provedor escolhido (Nuvem Fiscal ou NFE.io).
2. Configure certificado digital A1 ou A3 (obrigatório para SEFAZ).
3. Informe a API Key em **Dados Fiscais** > **API Key**.
4. Selecione o provedor correspondente.

## Migração do banco

Execute no backend:

```bash
cd backend
npx prisma migrate deploy
# ou, para criar a migration:
npx prisma migrate dev --name add_fiscal_invoice
```

## Variáveis de ambiente

Nenhuma variável adicional é necessária para o provedor **mock**. Para provedores reais, a API Key é armazenada no banco (criptografar em produção).
