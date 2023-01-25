import * as express from 'express';
import controllerMatches from '../controllers/controles.matches';
import validateToken from '../middleware/validateToken';

const routerMatches = express.Router();

routerMatches.get('/matches', controllerMatches.getMatchs);
routerMatches.post('/matches', validateToken, controllerMatches.createMatches);
routerMatches.patch('/matches/:id/finish', controllerMatches.finishMatche);

export default routerMatches;
