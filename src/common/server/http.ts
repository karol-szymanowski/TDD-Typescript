import { createTerminus } from '@godaddy/terminus';
import * as express from 'express';
import * as http from 'http';
import { Logger } from '../logger/logger';

export class HttpServer {
  private readonly app = express();

  constructor(private readonly logger: Logger) {}

  private async gracefulShutdown() {
    this.logger.info('Shutting down server...');
  }

  private async onHealthCheck() {
    this.logger.info('Health check');
  }

  start(port = 3000) {
    this.app.get('/', (req, res) => {
      res.send('Hello world!');
    });

    const server = http.createServer(this.app);

    createTerminus(server, {
      signal: 'SIGINT',
      healthChecks: { '/health': this.onHealthCheck },
      onSignal: this.gracefulShutdown,
    });

    server.listen(port, () => {
      this.logger.info(`Server running at http://localhost:${port}/`);
    });
  }
}
