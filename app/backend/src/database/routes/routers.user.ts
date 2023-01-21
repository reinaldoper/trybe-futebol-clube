import * as express from 'express';
import createUser from '../controllers/controller.user';

const routerUser = express.Router();
routerUser.post('/login', createUser.createUser);

export default routerUser;
