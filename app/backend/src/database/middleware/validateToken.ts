import { NextFunction, Request, Response } from 'express';
import jwt = require('jsonwebtoken');
import statusCodes from '../statusCodes';

const { JWTSECRET } = process.env;

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization: token } = req.headers;
  if (!token) return res.status(statusCodes.unautorizad).json({ message: 'Token not found' });
  try {
    const user = jwt.verify(token, JWTSECRET as string);
    req.body.user = user;
    next();
  } catch (e) {
    return res.status(statusCodes.unautorizad).json({ message: 'Expired or invalid token' });
  }
};

export default validateToken;
