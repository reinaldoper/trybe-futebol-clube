import { Request, Response } from 'express';
import statusCodes from '../statusCodes';
import getAllMatches from '../services/services.matches';

const getMatchs = async (req: Request, res: Response) => {
  let matches;
  if (req.query.inProgress) {
    const { inProgress } = req.query;
    const progress = (inProgress === 'true');
    matches = await getAllMatches.queryMatches(progress);
  } else {
    matches = await getAllMatches.getAllMatches();
  }
  return res.status(statusCodes.ok).json(matches);
};

export default { getMatchs };
