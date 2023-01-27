import * as express from 'express';
/* import controllerMatches from '../controllers/controles.matches';
import validateToken from '../middleware/validateToken'; */
import controllerLeaderboard from '../controllers/controller.leaderboard';

const routerLeaderboard = express.Router();

routerLeaderboard.get('/leaderboard/home', controllerLeaderboard.getLeaderBoard);

export default routerLeaderboard;
