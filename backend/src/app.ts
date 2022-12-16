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
    this.app.use(express.json());
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

export const { app } = new App();
