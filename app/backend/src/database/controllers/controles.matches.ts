import { Request, Response } from 'express';
import statusCodes from '../statusCodes';
import getAllMatches from '../services/services.matches';

const getMatchs = async (req: Request, res: Response) => {
  /* const { id } = req.body.user; */
  const matches = await getAllMatches.getAllMatches();
  return res.status(statusCodes.ok).json(matches);
};

export default { getMatchs };
