import { Logger } from './logger';
import { createLogger, transports, format } from 'winston';
import * as winston from 'winston';

const { combine, timestamp, label, printf } = format;
const myFormat = printf(({ level, message, timestamp }) => {
  return `[${level.toUpperCase()}] ${timestamp}: ${message}`;
});

export class WinstonLogger implements Logger {
  private readonly logger: winston.Logger;

  constructor(level = 'info') {
    this.logger = createLogger({
      level,
      format: combine(label({ label: 'right meow!' }), timestamp(), myFormat),
      transports: [new transports.Console()],
    });
  }

  debug(msg: string): void {
    this.logger.debug(msg);
  }

  error(msg: string): void {
    this.logger.error(msg);
  }

  info(msg: string): void {
    this.logger.info(msg);
  }

  warn(msg: string): void {
    this.logger.warn(msg);
  }
}
