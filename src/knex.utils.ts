import { KnexModuleOptions } from './knex.interfaces';
import { knex } from 'knex';
import {
  KNEX_MODULE_CONNECTION,
  KNEX_MODULE_CONNECTION_TOKEN,
  KNEX_MODULE_OPTIONS_TOKEN,
} from './knex.constants';

export function getKnexOptionsToken(connection: string): string {
  return `${connection || KNEX_MODULE_CONNECTION}_${KNEX_MODULE_OPTIONS_TOKEN}`;
}

export function getKnexConnectionToken(connection: string): string {
  return `${
    connection || KNEX_MODULE_CONNECTION
  }_${KNEX_MODULE_CONNECTION_TOKEN}`;
}

export function createKnexConnection(options: KnexModuleOptions): any {
  const { config } = options;
  return knex(config);
}
