import { Request, Response } from 'express';
import statusCodes from '../statusCodes';
import getAllMatches from '../services/services.matches';
import validateTeam from '../middleware/validateTeam';
/* import validateMatches from '../middleware/validate.matches'; */

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
  const dataValues = await getAllMatches.getMathesId(Number(resultMatches));
  const { homeTeamId, awayTeamId } = dataValues;
  if (awayTeamId === homeTeamId) {
    return res.status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }
  const result = await validateTeam(homeTeamId, awayTeamId);
  if (result === undefined) {
    return res.status(statusCodes.notFound).json({ message: 'There is no team with such id!' });
  }
  return res.status(statusCodes.created).json(dataValues);
};

const finishMatche = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await getAllMatches.finish(Number(id));
  if (result) return res.status(statusCodes.ok).json({ message: 'Finished' });
  res.status(statusCodes.error).json({ message: 'Not finished' });
};

export default { getMatchs, createMatches, finishMatche };
