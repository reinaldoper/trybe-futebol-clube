import { Request, Response } from 'express';
import statusCodes from '../statusCodes';
import servicesTeams from '../services/services.teams';

const getAllTeams = async (_req: Request, res: Response) => {
  const teams = await servicesTeams.getAllTeams();
  return res.status(statusCodes.ok).json(teams);
};

const getTeamId = async (req: Request, res: Response) => {
  const { id } = req.params;
  const teamId = await servicesTeams.getTeamId(Number(id));
  return res.status(statusCodes.ok).json(teamId);
};
export default { getAllTeams, getTeamId };
