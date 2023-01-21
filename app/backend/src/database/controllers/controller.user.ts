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
  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(statusCodes.notFound).json({ message: 'Invalid password' });
  }
  const token = jwt.sign({ id: user.id, email }, secret as string, { expiresIn: '2d' });

  res.status(statusCodes.ok).json({ token });
};

export default { createUser };
