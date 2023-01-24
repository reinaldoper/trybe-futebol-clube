import * as express from 'express';
import controllerTeams from '../controllers/controller.teams';

const routerTeams = express.Router();

routerTeams.get('/teams', controllerTeams.getAllTeams);
routerTeams.get('/teams/:id', controllerTeams.getTeamId);

export default routerTeams;
