# API ClubPetro

## Descrição

api desenvolvida para registrar lugares para se visitar.

## Instalação - Local
```bash
$ cd api
$ npm install
```

## Iniciando aplicação
```bash
$ npm run start
```

## Instalação - Docker
## Iniciar banco de dados e service
```
$ docker-compose up -d
```

## Iniciar banco de dados e service separadamente
```
$ docker-compose up -d db-postgres
$ docker-compose up -d api-service
```

## Test
```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Serviço disponível no google cloud
```
url: https://projetoclubpetro.uc.r.appspot.com
```

## Rotas disponíveis
```
1. listar países: /api/countries
metódo: GET
```

```
2. listar locais: /api/places
metódo: GET
```

```
3. registrar um novo local: /api/places
metódo: POST

body:
  - countryId
  - local
  - meta (mm/aaaa)
```

```
4. atualizar um local: /api/places/placeId
metódo: PATCH

body:
  - local
  - meta (mm/aaaa)
```

```
5. remover um local: /api/places/:placeId
metódo: DELETE
```


## Tecnologias utilizadas

- [Nest](https://github.com/nestjs/nest) - Framework base para o desenvolvimento da aplicação
- [Typescript](https://www.typescriptlang.org/) - Linguagem de programação baseada em javascript
- [Typeorm](https://typeorm.io/) - Biblioteca de manipulação de dados
- [Jest](https://jestjs.io/pt-BR/) - Biblioteca utilizada para o desenvolvimento de testes
- [Docker](https://www.docker.com/) - Ferramenta utilizada para containerização das aplicações
- [docker-compose](https://docs.docker.com/compose/) - Gerenciador dos containers docker
- [Postgres]() 
- [class-validator]()

## Contatos
- Author: Julian Oliveira Campos
- Email: julian.ocampos@hotmail.com
- [Linkedin](https://www.linkedin.com/in/julian-campos/)


