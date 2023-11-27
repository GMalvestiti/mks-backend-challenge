Documentação
===========================

Objetivo
---------------

1. Autenticação JWT e proteção dos endpoints.
2. CRUD de um catálogo de filmes.
3. Arquitetura composta de uma aplicação provendo uma API RESTful em JSON, utilize do Redis como seu cache.

Experiências Prévias:
---------------

1. TypeScript: 3 meses (JavaScript: 2 anos)
3. Nest.js: Sem Experiência
4. TypeORM: Sem Experiência com TypeORM especificamente
5. Swagger: 1 ano
6. Docker: Pouca Experiência Prática
7. Redis: Sem Experiência
8. PostgreSQL: 2 anos

Aspectos Técnicos
---------------
### Deployment

 Deployment realizdo como um WebService no site render.com

- Deployment: [Aqui](https://mks-backend-challenge.onrender.com/)

### Banco de Dados

 Banco de dados PostgreSQL criado no site vercel.com

```
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS movies (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  director VARCHAR(255),
  release_year INTEGER
);
```

### Rotas da API

 - **/:** Swagger UI
 - **/users:** ´POST` para registrar novos usuários
 - **/auth/login:** ´POST` para autenticar usuários
 - **/movies:** CRUD de filmes ´´´GET, POST, PATCH e DELETE```

Referências
---------------

- Documentação NestJS: [Link](https://docs.nestjs.com/)
- PostgreSQL: [Link](https://blog.devgenius.io/setting-up-nestjs-with-postgresql-ac2cce9045fe)
- Swagger: [Link](https://docs.nestjs.com/openapi/introduction)
- Autenticação JWT: [Link](https://docs.nestjs.com/security/authentication)
- Docker: [Link](https://dev.to/chukwutosin_/step-by-step-guide-setting-up-a-nestjs-application-with-docker-and-postgresql-5hei)
- Redis: [Link](https://www.tomray.dev/nestjs-caching-redis)
