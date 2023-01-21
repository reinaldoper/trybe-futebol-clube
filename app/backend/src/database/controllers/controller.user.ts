import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import serviceUser from '../services/services.user';
import statusCodes from '../statusCodes';

require('dotenv/config');

const secret = process.env.JWTSECRET || 'seusecretdetoken';

const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await serviceUser.getUserByEmail(email);
  if (!user || !user.id) {
    return res.status(statusCodes.unautorizad).json({
      message: 'Incorrect email or password',
    });
  }
  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(statusCodes.unautorizad).json({ message: 'Incorrect email or password' });
  }
  const myToken = jwt.sign({ id: user.id, email }, secret as string, { expiresIn: '2d' });
  return res.status(statusCodes.ok).json({ token: myToken });
};

const validate = async (req: Request, res: Response) => {
  const { id } = req.body.user;
  const user = await serviceUser.getUserById(Number(id));
  return res.status(statusCodes.ok).json({ role: user.role });
};

export default { createUser, validate };
