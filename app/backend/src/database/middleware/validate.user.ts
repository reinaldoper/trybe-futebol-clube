import { Request, Response, NextFunction } from 'express';
import statusCodes from '../statusCodes';

const validateEmailPassword = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(statusCodes.badRequest)
      .json({ message: 'All fields must be filled' });
  }
  if (!password) {
    return res.status(statusCodes.badRequest)
      .json({ message: 'All fields must be filled' });
  }
  next();
};

export default validateEmailPassword;
