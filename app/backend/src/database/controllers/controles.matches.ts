import { Request, Response } from 'express';
import statusCodes from '../statusCodes';
import getAllMatches from '../services/services.matches';
/* import validateTeam from '../middleware/validateTeam'; */
/* import validateMatches from '../middleware/validate.matches'; */
import servicesTeams from '../services/services.teams';

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
  const { homeTeamId, awayTeamId } = req.body;
  const user = await servicesTeams.getTeamId(homeTeamId);
  if (!user || !user.id) {
    return res.status(statusCodes.notFound).json({ message: 'There is no team with such id!' });
  }
  const user1 = await servicesTeams.getTeamId(awayTeamId);
  if (!user1 || !user1.id) {
    return res.status(statusCodes.notFound).json({ message: 'There is no team with such id!' });
  }
  const resultMatches = await getAllMatches.createMatches(req.body);
  const dataValues = await getAllMatches.getMathesId(Number(resultMatches));
  if (dataValues.homeTeamId === dataValues.awayTeamId) {
    return res.status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
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
