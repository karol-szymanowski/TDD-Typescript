import { createTerminus } from '@godaddy/terminus';
import * as express from 'express';
import * as http from 'http';
import * as swaggerUi from 'swagger-ui-express';
import * as path from 'path';
import * as glob from 'glob';
import * as yaml from 'yamljs';
import * as cors from 'cors';
import * as helmet from 'helmet';
import { Logger } from '../logger/logger';

export interface CorsOptions {
  origin: string;
  optionsSuccessStatus: number;
}

export class HttpServer {
  private readonly app = express();
  private readonly baseUrl = 'http://localhost';

  constructor(private readonly logger: Logger, private readonly port: number) {}

  private async gracefulShutdown() {
    this.logger.info('Shutting down server...');
  }

  private async onHealthCheck() {
    this.logger.info('Health check');
  }

  setupDocs(docsPath: string) {
    const docsPaths = glob.sync(`${docsPath}/*.yaml`);
    docsPaths.forEach((docPath) => {
      const swaggerDocument = yaml.load(docPath);
      const name = path.basename(docPath).replace('.yaml', '');
      const url = `/docs/${name}`;
      this.app.use(url, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
      this.logger.info(`Loaded documentation "${name}" ${this.baseUrl}:${this.port}${url}/`);
    });
  }

  setupCors(opts?: CorsOptions) {
    this.logger.info('Setting up cors');
    this.app.use(cors(opts));
  }

  setupMiddleware() {
    this.logger.info('Setting up middlewares');
    this.app.use(helmet());
  }

  start() {
    this.app.get('/', (req, res) => {
      res.send('Hello world!');
    });

    const server = http.createServer(this.app);

    createTerminus(server, {
      signal: 'SIGINT',
      healthChecks: { '/health': this.onHealthCheck },
      onSignal: this.gracefulShutdown,
    });

    server.listen(this.port, () => {
      this.logger.info(`Server running at ${this.baseUrl}:${this.port}/`);
    });
  }
}
