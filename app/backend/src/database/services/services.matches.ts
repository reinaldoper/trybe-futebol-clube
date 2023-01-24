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
  const matches = Match.findAll({
    where: { inProgress },
  });
  return matches as unknown as Tmaches[];
};

export default { getAllMatches, queryMatches };
