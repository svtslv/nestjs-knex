import { Module, DynamicModule, Provider } from "@nestjs/common";
import { KnexModuleOptions, KnexModuleAsyncOptions } from './knex.interfaces';
import { KNEX_MODULE_TOKEN, KNEX_MODULE_OPTIONS } from './knex.constants'
import { createKnexConnection } from './knex.utils'

@Module({})
export class KnexModule {
  static forRoot(options: KnexModuleOptions): DynamicModule {

    const knexModuleOptions: Provider = {
      provide: KNEX_MODULE_OPTIONS,
      useValue: options,
    };

    const knexConnectionProvider: Provider = {
      provide: KNEX_MODULE_TOKEN,
      useValue: createKnexConnection(options),
    };

    return {
      module: KnexModule,
      providers: [
        knexModuleOptions,
        knexConnectionProvider,
      ],
      exports: [
        knexModuleOptions,
        knexConnectionProvider,
      ],
    };
  }

  static forRootAsync(options: KnexModuleAsyncOptions): DynamicModule {
    return {
      module: KnexModule,
      imports: [KnexModule.forRootAsync(options)],
    };
  }
}
