import { WinstonLogger } from './common/logger/winstonLogger';
import { HttpServer } from './common/server/http';
import { Configs } from './common/config/config';
import { validateOrReject } from 'class-validator';

const winstonLogger = new WinstonLogger();

async function init() {
  const config = new Configs();
  await validateOrReject(config);

  const httpServer = new HttpServer(winstonLogger, config.port);

  httpServer.setupCors();
  httpServer.setupDocs('./api/openapi');
  httpServer.start();
}

init().catch((err) => {
  winstonLogger.error(err);
  process.exit(1);
});
