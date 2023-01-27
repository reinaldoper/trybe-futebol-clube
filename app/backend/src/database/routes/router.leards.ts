import * as express from 'express';
/* import controllerMatches from '../controllers/controles.matches';
import validateToken from '../middleware/validateToken'; */
import controllerLeaderboard from '../controllers/controller.leaderboard';
import controllerLeaderboardAway from '../controllers/controller.leaderboard.away';

const routerLeaderboard = express.Router();

routerLeaderboard.get('/leaderboard/home', controllerLeaderboard.getLeaderBoard);
routerLeaderboard.get('/leaderboard/away', controllerLeaderboardAway.getLeaderBoardAway);

export default routerLeaderboard;
