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

const createMatches = async (req: Request, res: Response) => {
  const resultMatches = await getAllMatches.createMatches(req.body);
  const newMatche = await getAllMatches.getMathesId(Number(resultMatches));
  return res.status(statusCodes.created).json(newMatche);
};

export default { getMatchs, createMatches };
