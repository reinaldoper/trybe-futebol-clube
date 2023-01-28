import { Request, Response } from 'express';
import statusCodes from '../statusCodes';
import servicesMatches from '../services/services.matches';
import { Classification } from '../middleware/classification';
import Tsort from '../Tmatches/Tsort';
import Final from '../middleware/inicialFinal';

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

const juntaTimes = async () => {
  const inProgress = false;
  const getResult = await servicesMatches.getMatchesFalse(inProgress);
  const r = getResult.map((i) => {
    const t = { name: i.homeTeam.teamName,
      goalsFavor: i.homeTeamGoals,
      goalsOwn: i.awayTeamGoals };
    return t;
  });
  r.sort((a, b) => (b.name > a.name ? -1 : 1));
  const newArr = gerate(r);
  return newArr;
};

const jungaTimes1 = async () => {
  const inProgress = false;
  const getResult = await servicesMatches.getMatchesFalse(inProgress);
  const r = getResult.map((i) => {
    const t = { name: i.awayTeam?.teamName,
      goalsFavor: i.awayTeamGoals,
      goalsOwn: i.homeTeamGoals };
    return t;
  });
  r.sort((a, b) => (b.name > a.name ? -1 : 1));
  const newArr = gerate(r);
  return newArr;
};

const getBoard = async (_req: Request, res: Response) => {
  const result = await juntaTimes();
  const result1 = await jungaTimes1();
  const final = Final(result, result1);
  const newFinal = sortClassification(final);
  return res.status(statusCodes.ok).json(newFinal);
};

export default { getBoard };
