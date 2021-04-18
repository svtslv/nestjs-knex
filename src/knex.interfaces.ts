import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import * as knex from 'knex';

export type Knex = knex.Knex;
export type Connection = knex.Knex;

export interface KnexModuleOptions {
  config: knex.Knex.Config;
}

export interface KnexModuleOptionsFactory {
  createKnexModuleOptions(): Promise<KnexModuleOptions> | KnexModuleOptions;
}

export interface KnexModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<KnexModuleOptionsFactory>;
  useExisting?: Type<KnexModuleOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<KnexModuleOptions> | KnexModuleOptions;
}
