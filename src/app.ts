import express, { Express, Request, Response, NextFunction } from 'express';
import router from './Controller/routes';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { swaggerOptions } from './swagger/swaggerDocs';
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // limite cada IP para 100 requisições por janela
});

export class App {
  public app: Express;
  public port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(limiter);
  }

  private initializeRoutes() {
    const swaggerDocs = swaggerJSDoc(swaggerOptions);
    this.app.use(router);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.status(404).json({
        message: 'Recurso não encontrado',
      });
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
