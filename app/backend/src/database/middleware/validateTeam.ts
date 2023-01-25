import TTimes from '../Ttimes/Ttimes';
import servicesTeams from '../services/services.teams';

const validateTeam = async (team: number, team1: number): Promise<TTimes | undefined> => {
  try {
    const verify = await servicesTeams.getTeamId(team);
    const status = verify.teamName;
    const verify1 = await servicesTeams.getTeamId(team1);
    const status1 = verify1.teamName;
    const ok = (status && status1);
    if (ok) return status as unknown as TTimes;
  } catch (error) {
    return undefined;
  }
};

export default validateTeam;
