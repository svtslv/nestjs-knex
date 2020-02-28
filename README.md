# NestJS Knex

<a href="https://www.npmjs.com/package/nestjs-knex"><img src="https://img.shields.io/npm/v/nestjs-knex.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/package/nestjs-knex"><img src="https://img.shields.io/npm/l/nestjs-knex.svg" alt="Package License" /></a>

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Examples](#examples)
- [License](#license)

## Description
Integrates Knex with Nest

## Installation

```bash
npm install nestjs-knex knex
```

## Examples
```bash
npm install nestjs-knex knex sqlite3
```

```ts
import { Module } from '@nestjs/common';
import { KnexModule } from 'nestjs-knex';
import { AppController } from './app.controller';

@Module({
  imports: [
    KnexModule.forRoot({
      config: {
        client: "sqlite3",
        useNullAsDefault: true,
        connection: ':memory:',
      }
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
```

```ts
import { Controller, Get, } from '@nestjs/common';
import { InjectConnection, Connection } from 'nestjs-knex';

@Controller()
export class AppController {
  constructor(
    @InjectConnection() private readonly connection: Connection,
  ) {}

  @Get()
  async getHello() {
    if (!await this.connection.schema.hasTable('users')) {
      await this.connection.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('name');
      });
    }
    await this.connection.table('users').insert({ name: 'Name' });
    const users = await this.connection.table('users');
    return { users };
  }
}
```

## License

MIT
