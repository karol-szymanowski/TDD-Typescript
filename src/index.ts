import { WinstonLogger } from './common/logger/winstonLogger';
import { HttpServer } from './common/server/http';

const winstonLogger = new WinstonLogger();
const httpServer = new HttpServer(winstonLogger);

httpServer.setupDocs('./api/openapi');
httpServer.start();
