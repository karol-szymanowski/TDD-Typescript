import { WinstonLogger } from './common/logger/winstonLogger';
import { HttpServer } from './common/server/http';
import { Configs } from './common/config/config';
import { validateOrReject } from 'class-validator';

const config = new Configs();
const winstonLogger = new WinstonLogger(config.logLevel);

async function init() {
  await validateOrReject(config);

  const httpServer = new HttpServer(winstonLogger, config.port);

  httpServer.setupCors();
  httpServer.setupMiddleware();
  httpServer.setupDocs('./api/openapi');
  httpServer.start();
}

init().catch((err) => {
  winstonLogger.error(err);
  process.exit(1);
});
