import { Request, Response } from 'express';
import statusCodes from '../statusCodes';
import servicesMatches from '../services/services.matches';
/* import servicesTeams from '../services/services.teams';
import Tmatches from '../Tmatches/Tmatches';
import Tgames from '../Tmatches/Tgames'; */
import { Classification } from '../middleware/classification';
import Tsort from '../Tmatches/Tsort';

const sortClassification = (array: Classification[]): Classification[] => array.sort((a, b) => {
  if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
  if (b.totalVictories !== a.totalVictories) return b.totalVictories - a.totalVictories;
  if (b.goalsBalance !== a.goalsBalance) return b.goalsBalance - a.goalsBalance;
  return b.goalsFavor - a.goalsFavor;
});

const somaPoints = (a: number, b: number) => {
  if (a > b) return 3;
  if (a === b) return 1;
  return 0;
};

const totale = (bf: Tsort, ini: Classification): Classification => {
  const obj = { name: bf.name,
    totalPoints: ini.totalPoints + somaPoints(bf.goalsFavor, bf.goalsOwn),
    totalGames: ini.totalGames + 1,
    totalVictories: ini.totalVictories + (bf.goalsFavor > bf.goalsOwn ? 1 : 0),
    totalDraws: ini.totalDraws + (bf.goalsFavor === bf.goalsOwn ? 1 : 0),
    totalLosses: ini.totalLosses + (bf.goalsFavor < bf.goalsOwn ? 1 : 0),
    goalsFavor: ini.goalsFavor + bf.goalsFavor,
    goalsOwn: ini.goalsOwn + bf.goalsOwn,
    goalsBalance: ini.goalsBalance + bf.goalsFavor - bf.goalsOwn,
    efficiency: Number((((ini.totalPoints + somaPoints(bf.goalsFavor, bf.goalsOwn))
    / ((ini.totalGames + 1) * 3)) * 100).toFixed(2)),
  };
  return obj as unknown as Classification;
};

const inicial = (bf: Tsort): Classification => {
  const obj = { name: bf.name,
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
  };
  return obj as unknown as Classification;
};

const gerate = (array: Tsort[]): Classification[] => {
  const ar: Array<Classification> = [];
  const bf = array[0];
  let iniciaObj = inicial(bf);
  array.forEach((arr) => {
    if (arr.name !== iniciaObj.name) {
      ar.push(iniciaObj);
      iniciaObj = inicial(arr);
    }
    iniciaObj = totale(arr, iniciaObj);
  });
  ar.push(iniciaObj);
  return ar as unknown as Classification[];
};

const getLeaderBoardAway = async (_req: Request, res: Response) => {
  const inProgress = false;
  const getResult = await servicesMatches.getMatchesFalse(inProgress);
  const r = getResult.map((i) => {
    const t = { name: i.awayTeam?.teamName,
      goalsFavor: i.awayTeamGoals,
      goalsOwn: i.homeTeamGoals };
    return t;
  });
  r.sort((a, b) => (b.name > a.name ? -1 : 1));
  const newArr = sortClassification(gerate(r));
  return res.status(statusCodes.ok).json(newArr);
};

export default { getLeaderBoardAway };
