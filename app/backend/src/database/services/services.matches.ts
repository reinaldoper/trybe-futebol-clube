/* import { Where } from 'sequelize/types/utils'; */
import Teams from '../models/team.model';
import Match from '../models/matches.model';
import Tmaches from '../Tmatches/Tmatches';

const getAllMatches = async (): Promise<Tmaches[]> => {
  const exchanges = Match.findAll({
    include: [{ model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
      { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } }],
  });
  return exchanges as unknown as Tmaches[];
};

const queryMatches = async (inProgress: boolean): Promise<Tmaches[]> => {
  console.log(inProgress);
  const matches = await Match.findAll({
    where: { inProgress },
    include: [{ model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
      { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } }],
  });
  return matches as unknown as Tmaches[];
};

const getMatchesFalse = async (inProgress: boolean): Promise<Tmaches[]> => {
  const matchesLeaderboard = await Match.findAll({
    where: { inProgress },
    include: [{ model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
      { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } }],
  });
  const r = matchesLeaderboard.map((i) => i.dataValues);
  return r as unknown as Tmaches[];
};

const createMatches = async (body: Tmaches): Promise<Tmaches[] | number> => {
  const status = true;
  const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress = status } = body;
  const matches = await Match.create({
    homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress,
  });
  return matches.id as unknown as Tmaches[];
};

const createMatchesId = async (body: Tmaches, id: number): Promise<Tmaches[] | number> => {
  const { homeTeamGoals, awayTeamGoals } = body;
  const matches = await Match.update(
    { homeTeamGoals, awayTeamGoals },
    { where: { id } },
  );
  return matches as unknown as Tmaches[];
};

const getMathesId = async (id: number): Promise<Tmaches> => {
  const matches = await Match.findByPk(id, {
    attributes: { include: ['id',
      'homeTeamId',
      'homeTeamGoals',
      'awayTeamId',
      'awayTeamGoals',
      'inProgress',
    ] },
  });
  return matches?.dataValues as unknown as Tmaches;
};

const finish = async (id: number): Promise<Tmaches[]> => {
  const [upDate] = await Match.update(
    { inProgress: false },
    { where: { id } },
  );
  return upDate as unknown as Tmaches[];
};
export default { getAllMatches,
  queryMatches,
  createMatches,
  getMathesId,
  finish,
  createMatchesId,
  getMatchesFalse,
};
