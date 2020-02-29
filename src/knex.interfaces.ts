import { ModuleMetadata, Type } from "@nestjs/common/interfaces";
import * as knex from 'knex';

export interface KnexModuleOptions {
  config: knex.Config;
}

export interface KnexModuleOptionsFactory {
  createKnexModuleOptions(): Promise<KnexModuleOptions> | KnexModuleOptions;
}

export interface KnexModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<KnexModuleOptionsFactory>;
  useExisting?: Type<KnexModuleOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<KnexModuleOptions> | KnexModuleOptions;
}

export type Knex = knex;
