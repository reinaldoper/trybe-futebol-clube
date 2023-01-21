import { Router } from 'express';
import createUser from '../controllers/controller.user';

const routerUser = Router();
routerUser.post('/login', createUser.createUser);

export default routerUser;
