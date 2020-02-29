import { Inject } from '@nestjs/common';
import { getKnexConnectionToken } from './knex.utils';

export const InjectKnex = (connection?) => {
  return Inject(getKnexConnectionToken(connection));
};
