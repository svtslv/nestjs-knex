import { DynamicModule, Module } from '@nestjs/common';
import { KnexCoreModule } from './knex.core-module';
import { KnexModuleAsyncOptions, KnexModuleOptions } from './knex.interfaces';

@Module({})
export class KnexModule {
  public static forRoot(options: KnexModuleOptions, connection?: string): DynamicModule {
    return {
      module: KnexModule,
      imports: [KnexCoreModule.forRoot(options, connection)],
      exports: [KnexCoreModule],
    };
  }

  public static forRootAsync(options: KnexModuleAsyncOptions, connection?: string): DynamicModule {
    return {
      module: KnexModule,
      imports: [KnexCoreModule.forRootAsync(options, connection)],
      exports: [KnexCoreModule],
    };
  }
}
