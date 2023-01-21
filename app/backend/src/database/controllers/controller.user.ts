import { Request, Response } from 'express';
import jwt = require('jsonwebtoken');
import * as bcrypt from 'bcryptjs';
import login from '../login';
import serviceUser from '../services/services.user';
import statusCodes from '../statusCodes';

require('dotenv/config');

const secret = process.env.JWTSECRET || 'seusecretdetoken';

const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body as login;
  const user = await serviceUser.getReaderByEmail(email);

  if (!user || !user.id) {
    return res.status(statusCodes.notFound).json({ message: 'User not found' });
  }
  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(statusCodes.notFound).json({ message: 'Invalid password' });
  }
  const userData = {
    id: user.id,
    email,
  };
  const jwtConfig = {
    expiresIn: '1d',
  /*  algorithm: 'HS256', */
  };
  const token = jwt.sign(userData, secret as string, jwtConfig);

  res.status(statusCodes.ok).json({ token });
};

export default { createUser };
