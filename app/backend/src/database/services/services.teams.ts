import Teams from '../models/team.model';
import TTimes from '../Ttimes/Ttimes';

const getAllTeams = async (): Promise<TTimes[]> => {
  const teams = await Teams.findAll({
    attributes: {
      include: ['id',
        'teamName',
      ] },
  });
  return teams;
};

const getTeamId = async (id: number): Promise<TTimes> => {
  const team = await Teams.findByPk(id, {
    attributes: { include: ['id', 'teamName'] },
  });
  return team as unknown as TTimes;
};

export default { getAllTeams, getTeamId };
