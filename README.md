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

You can also use the interactive CLI

```sh
npx nestjs-modules
```

## Examples
```bash
npm install nestjs-knex knex sqlite3
```

### KnexModule.forRoot(options, connection?)

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
      },
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
```

### KnexModule.forRootAsync(options, connection?)

```ts
import { Module } from '@nestjs/common';
import { KnexModule } from 'nestjs-knex';
import { AppController } from './app.controller';

@Module({
  imports: [
    KnexModule.forRootAsync({
      useFactory: () => ({
        config: {
          client: "sqlite3",
          useNullAsDefault: true,
          connection: ':memory:',
        },
      }),
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
```

### InjectKnex(connection?)

```ts
import { Controller, Get, } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';

@Controller()
export class AppController {
  constructor(
    @InjectKnex() private readonly knex: Knex,
  ) {}

  @Get()
  async getHello() {
    if (!await this.knex.schema.hasTable('users')) {
      await this.knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('name');
      });
    }
    await this.knex.table('users').insert({ name: 'Name' });
    const users = await this.knex.table('users');
    return { users };
  }
}
```

## License

MIT
