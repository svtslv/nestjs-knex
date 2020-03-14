import { Inject } from '@nestjs/common';
import { getKnexConnectionToken } from './knex.utils';

export const InjectKnex = (connection?: string) => {
  return Inject(getKnexConnectionToken(connection));
};

export const InjectConnection = InjectKnex;
