import { createTerminus } from '@godaddy/terminus';
import * as express from 'express';
import * as http from 'http';

export class HttpServer {
  private readonly app = express();

  private async gracefulShutdown() {
    console.log('Shutting down server...');
  }

  private async onHealthCheck() {
    console.log('Health check');
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
      console.log(`Server running at http://localhost:${port}/`);
    });
  }
}
