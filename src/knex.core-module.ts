import { Global, Module, DynamicModule, Provider } from '@nestjs/common';
import {
  KnexModuleAsyncOptions,
  KnexModuleOptions,
  KnexModuleOptionsFactory,
} from './knex.interfaces';
import {
  createKnexConnection,
  getKnexOptionsToken,
  getKnexConnectionToken,
} from './knex.utils';

@Global()
@Module({})
export class KnexCoreModule {
  /* forRoot */
  static forRoot(
    options: KnexModuleOptions,
    connection?: string,
  ): DynamicModule {
    const knexOptionsProvider: Provider = {
      provide: getKnexOptionsToken(connection),
      useValue: options,
    };

    const knexConnectionProvider: Provider = {
      provide: getKnexConnectionToken(connection),
      useValue: createKnexConnection(options),
    };

    return {
      module: KnexCoreModule,
      providers: [knexOptionsProvider, knexConnectionProvider],
      exports: [knexOptionsProvider, knexConnectionProvider],
    };
  }

  /* forRootAsync */
  public static forRootAsync(
    options: KnexModuleAsyncOptions,
    connection: string,
  ): DynamicModule {
    const knexConnectionProvider: Provider = {
      provide: getKnexConnectionToken(connection),
      useFactory(options: KnexModuleOptions) {
        return createKnexConnection(options);
      },
      inject: [getKnexOptionsToken(connection)],
    };

    return {
      module: KnexCoreModule,
      imports: options.imports,
      providers: [
        ...this.createAsyncProviders(options, connection),
        knexConnectionProvider,
      ],
      exports: [knexConnectionProvider],
    };
  }

  /* createAsyncProviders */
  public static createAsyncProviders(
    options: KnexModuleAsyncOptions,
    connection?: string,
  ): Provider[] {
    if (!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error(
        'Invalid configuration. Must provide useFactory, useClass or useExisting',
      );
    }

    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options, connection)];
    }

    return [
      this.createAsyncOptionsProvider(options, connection),
      { provide: options.useClass, useClass: options.useClass },
    ];
  }

  /* createAsyncOptionsProvider */
  public static createAsyncOptionsProvider(
    options: KnexModuleAsyncOptions,
    connection?: string,
  ): Provider {
    if (!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error(
        'Invalid configuration. Must provide useFactory, useClass or useExisting',
      );
    }

    if (options.useFactory) {
      return {
        provide: getKnexOptionsToken(connection),
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    return {
      provide: getKnexOptionsToken(connection),
      async useFactory(
        optionsFactory: KnexModuleOptionsFactory,
      ): Promise<KnexModuleOptions> {
        return optionsFactory.createKnexModuleOptions();
      },
      inject: [options.useClass || options.useExisting],
    };
  }
}
