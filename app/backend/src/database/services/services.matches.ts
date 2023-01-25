import Teams from '../models/team.model';
import Match from '../models/matches.model';
import Tmaches from '../Tmatches/Tmatches';

const getAllMatches = async (): Promise<Tmaches[]> => {
  const exchanges = Match.findAll({
    include: [{ model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
      { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } }],
  });
  return exchanges;
};

const queryMatches = async (inProgress: boolean): Promise<Tmaches[]> => {
  console.log(inProgress);
  const matches = Match.findAll({
    where: { inProgress },
    include: [{ model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
      { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } }],
  });
  return matches as unknown as Tmaches[];
};

const createMatches = async (body: Tmaches): Promise<Tmaches[] | number> => {
  const status = true;
  const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress = status } = body;
  const matches = await Match.create({
    homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress,
  });
  return matches.id as unknown as Tmaches[];
};

const getMathesId = async (id: number): Promise<Tmaches[] | number> => {
  const matches = await Match.findByPk(id, {
    attributes: { include: ['id',
      'homeTeamId',
      'homeTeamGoals',
      'awayTeamId',
      'awayTeamGoals',
      'inProgress',
    ] },
  });
  return matches as unknown as Tmaches[];
};
export default { getAllMatches, queryMatches, createMatches, getMathesId };
