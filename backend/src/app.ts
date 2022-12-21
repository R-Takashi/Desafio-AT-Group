import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/error';
import userRouter from './routes/user.route';

class App {
  public app: express.Express;

  constructor () {
    this.app = express();

    this.config();

    this.app.use('/', userRouter);

    this.app.use(errorHandler);
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

export const { app } = new App();
