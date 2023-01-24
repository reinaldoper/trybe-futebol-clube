import * as express from 'express';
import routerUser from './database/routes/routers.user';
import routerMatches from './database/routes/router.matches';
import routerTeams from './database/routes/router.teams';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.routes();
    /* this.matches();
    this.teams(); */
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  private routes(): void {
    this.app.use(routerUser);
    this.app.use(routerMatches);
    this.app.use(routerTeams);
  }

  /* private matches(): void {
    this.app.use(routerMatches);
  }

  private teams(): void {
    this.app.use(routerTeams);
  } */

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
