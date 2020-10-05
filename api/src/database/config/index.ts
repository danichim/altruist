import { TypeORMLogger } from '../../logger/logger.typeorm';

const getConfig = (env = '.env') => {
  const envConfig = require('dotenv').config().parsed;

  return {
    type: 'mysql',
    host: envConfig?.DATABASE_HOST || process.env.DATABASE_HOST,
    port: envConfig?.DATABASE_PORT || process.env.DATABASE_PORT,
    username: envConfig?.DATABASE_USERNAME || process.env.DATABASE_USERNAME,
    password: envConfig?.DATABASE_PASSWORD || process.env.DATABASE_PASSWORD,
    database: envConfig?.DATABASE_NAME || process.env.DATABASE_NAME,
    synchronize: false,
    logging: ['error', 'query'],
    logger: new TypeORMLogger(),
    'entities': [
      __dirname + '/../../**/**.entity{.ts,.js}',
    ],
    'migrations': [
      __dirname + '/../../database/migrations/**/*.ts',
    ],
    'cli': {
      'entitiesDir': '/src/database/entity',
      'migrationsDir': '/src/database/migrations',
    },
  }
};

export default getConfig;
