# Documentação do QR Coffee

## API

- **[API.md](./API.md)** — Documentação da API em Markdown (endpoints, body, query, respostas e códigos de status).
- **[openapi.yaml](./openapi.yaml)** — Especificação OpenAPI 3.0 para uso com Swagger UI, Redoc ou outras ferramentas.

### Visualizar OpenAPI (Swagger UI)

Você pode visualizar o `openapi.yaml` em:

- [Swagger Editor](https://editor.swagger.io/) — cole o conteúdo do arquivo ou use *File → Import file*.
- [Redoc](https://redocly.github.io/redoc/) — arraste o arquivo ou use a URL se estiver hospedado.

Para servir a API localmente na porta 3352:

```bash
cd backend && npm run start
```

A base URL da API é: `http://localhost:3352`.
