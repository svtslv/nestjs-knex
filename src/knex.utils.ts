import { KnexModuleOptions } from "./knex.interfaces";
import * as Knex from 'knex';

export function createKnexConnection(options: KnexModuleOptions): any {
  const { config } = options;
  return Knex(config);
}
