import { ModuleMetadata, Type } from "@nestjs/common/interfaces";
import * as Knex from 'knex';

export interface KnexModuleOptions {
  config: Knex.Config;
}

export interface KnexModuleOptionsFactory {
  createS3ModuleOptions(): Promise<KnexModuleOptions> | KnexModuleOptions;
}

export interface KnexModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<KnexModuleOptionsFactory>;
  useExisting?: Type<KnexModuleOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<KnexModuleOptions> | KnexModuleOptions;
}

export type Connection = Knex;
