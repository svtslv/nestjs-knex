import { Module, DynamicModule, Provider } from "@nestjs/common";
import { KnexModuleOptions, KnexModuleAsyncOptions } from './knex.interfaces';
import { createKnexConnection, getKnexOptionsToken, getKnexConnectionToken } from './knex.utils'

@Module({})
export class KnexModule {
  static forRoot(options: KnexModuleOptions, connection?: string): DynamicModule {

    const knexModuleOptions: Provider = {
      provide: getKnexOptionsToken(connection),
      useValue: options,
    };

    const knexConnectionProvider: Provider = {
      provide: getKnexConnectionToken(connection),
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

  static forRootAsync(options: KnexModuleAsyncOptions, connection?: string): DynamicModule {
    return {
      module: KnexModule,
      imports: [KnexModule.forRootAsync(options, connection)],
    };
  }
}
