# Inventory Management System

Aplicación que permite gestionar el inventario de empresas y exportarlo en PDF. [Demo](http://inventory-management-revstar.s3-website-us-east-1.amazonaws.com/inventoryManagement/)

### Pre-requisitos 📋

Tener instalado node con alguna de las siguientes versiones 14.20.x, 16.13.x and 18.10, npm, y angular cli

## Comenzando

```bash
git clone https://github.com/stevenclar/inventory-management-back.git
cd inventory-management-back/
cp env-example .env
docker compose up -d
```

Ver logs

```bash
docker compose logs
```

## Desarrollo local facil

```bash
git clone https://github.com/stevenclar/inventory-management-back.git
cd inventory-management-back/
cp env-example .env
```

Change `DATABASE_HOST=postgres` to `DATABASE_HOST=localhost`

Change `MAIL_HOST=maildev` to `MAIL_HOST=localhost`

Run additional container:

```bash
docker compose up -d postgres adminer maildev
```

```bash
npm install

npm run migration:run

npm run seed:run

npm run start:dev
```
## Database utils

Crear migration

```bash
npm run migration:generate -- src/database/migrations/CreateNameTable 
```

Correr migration

```bash
npm run migration:run
```

Revertir migration

```bash
npm run migration:revert
```

Eliminar todas las tablas de la base de datos

```bash
npm run schema:drop
```

Run seed

```bash
npm run seed:run
```

## Tests

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e
```

## Tests en Docker

```bash
docker compose -f docker-compose.ci.yaml --env-file env-example -p ci up --build --exit-code-from api && docker compose -p ci rm -svf
```

## Test benchmarking

```bash
docker run --rm jordi/ab -n 100 -c 100 -T application/json -H "Authorization: Bearer USER_TOKEN" -v 2 http://<server_ip>:3000/api/v1/users
```

## Links

- Swagger: http://localhost:3000/docs
- Adminer (client for DB): http://localhost:8080
- Maildev: http://localhost:1080

## Construido con 🛠️

* [NestJs](https://nestjs.com/) - 
* [pdfmake](http://pdfmake.org/) - Client/server side PDF printing in pure JavaScript
* [RxJS](https://rxjs.dev/api/) - Librería Javascript de programación reactiva

## Autores ✒️

* **Deivid Steven Gonzalez** - *Desarrollo del proyecto* - [stevenclar](https://github.com/stevenclar)
## Expresiones de Gratitud 🎁

* Muchas gracias Revstar por la oportunidad 🤓.

---
⌨️ con ❤️ por [StevenClar](https://github.com/stevenclar) 😊

