interface homeTeam {
  teamName: string;
}

export default interface Tmaches {
  name: string;
  id?: number;
  homeTeamId?: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress?: boolean;
  homeTeam: homeTeam;
  awayTeam?: homeTeam;
  teamName?: string;
}

/* export default interface TTimes extends Tmaches {
    homeTeam: string;
    teamName: string;
} */
