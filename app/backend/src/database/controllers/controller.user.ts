import { Request, Response } from 'express';
import jwt = require('jsonwebtoken');
import * as bcrypt from 'bcryptjs';
import serviceUser from '../services/services.user';
import statusCodes from '../statusCodes';

require('dotenv/config');

const secret = process.env.JWTSECRET || 'seusecretdetoken';

const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(statusCodes.badRequest)
      .json({ message: 'All fields must be filled' });
  }
  if (!password) {
    return res.status(statusCodes.badRequest)
      .json({ message: 'All fields must be filled' });
  }
  const user = await serviceUser.getUserByEmail(email);
  if (!user || !user.password) {
    return res.status(statusCodes.unautorizad).json({ message: 'Incorrect email or password' });
  }
  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(statusCodes.unautorizad).json({ message: 'Incorrect email or password' });
  }
  const myToken = jwt.sign({ id: user.id, email }, secret as string, { expiresIn: '2d' });

  return res.status(statusCodes.ok).json({ token: myToken });
};

export default { createUser };
