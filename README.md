# ng-cash

## Tecnologias utilizadas

- Express
- Typescript
- Vitest
- BCrypt
- Prisma
- Git-commit-msg-linter
- Husky
- joi
- JsonWebToken
= Swagger Ui Express
- Eslint
- Lint-staged

## Requisitos para executar o projeto

- Node >= 14.15
- Docker + docker-compose
- Insomnia ou Postman

## Como executar o projeto

Clone o projeto

```bash
git clone git@github.com:breno5g/ng-cash.git
```

Na raiz do projeto, executa o comando para subir os containers do docker

```bash
docker-compose up -d
```

## Documentação

Para acessar a documentação, basta entrar em:
```
http://localhost:3001/docs
```

## Testes

Normais

```bash
npm test
```

Cobertura

```bash
npm run test:coverage
```