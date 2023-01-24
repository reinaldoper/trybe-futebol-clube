import * as express from 'express';
import controllerMatches from '../controllers/controles.matches';

const routerMatches = express.Router();

routerMatches.get('/matches', controllerMatches.getMatchs);

export default routerMatches;