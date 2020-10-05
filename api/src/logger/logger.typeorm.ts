import { Logger } from 'typeorm';
import { MyLogger } from './logger.service';

export class TypeORMLogger implements Logger {

  private logger;

  constructor () {
    this.logger = new MyLogger();
    this.logger.setContext('TypeORMLogger');
  }

  logQuery (query: string, parameters?: any[]): any {
    this.logger.debug(`${query}, ${parameters}`);
  }

  log (level: 'log' | 'info' | 'warn', message: any): any {
    this.logger.log(message, level);
  }

  logQueryError (error: string, query: string, parameters?: any[]): any {
    this.logger.error(`${error}, ${query}, ${parameters}`);
  }

  logQuerySlow (time: number, query: string, parameters?: any[]): any {
    this.logger.info(`${time}, ${query}, ${parameters}`);
  }

  logMigration (message: string): any {
    this.logger.info(message);
  }

  logSchemaBuild (message: string): any {
    this.logger.info(message);
  }

}
