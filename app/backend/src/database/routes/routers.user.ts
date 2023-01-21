import * as express from 'express';
import createUser from '../controllers/controller.user';
import validateUser from '../middleware/validate.user';
/* import validate from '../controllers/controller.user'; */
import validateToken from '../middleware/validateToken';

const routerUser = express.Router();
routerUser.post('/login', validateUser, createUser.createUser);
routerUser.get('/login/validate', validateToken, createUser.validate);

export default routerUser;
