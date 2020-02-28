import { Inject } from '@nestjs/common';
import { KNEX_MODULE_TOKEN } from './knex.constants'

export const InjectConnection = () => {
  return Inject(KNEX_MODULE_TOKEN);
};
