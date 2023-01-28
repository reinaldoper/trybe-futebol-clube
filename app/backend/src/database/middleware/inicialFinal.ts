import Tsort from '../Tmatches/Tsort';
import { Classification } from './classification';

const c = 100;

const s = (a: number, b: number) => a + b;

const w = (a: number, b: number) => ((a / (b * 3)) * c).toFixed(2);

const Final = (result: Classification[], result1: Classification[]): Classification[] => {
  const t: Array<Tsort> = [];
  result.map((i) => {
    result1.find((it) => {
      if (i.name === it.name) {
        const obj = { name: i.name,
          totalPoints: i.totalPoints + it.totalPoints,
          totalGames: i.totalGames + it.totalGames,
          totalVictories: i.totalVictories + it.totalVictories,
          totalDraws: i.totalDraws + it.totalDraws,
          totalLosses: i.totalLosses + it.totalLosses,
          goalsFavor: i.goalsFavor + it.goalsFavor,
          goalsOwn: i.goalsOwn + it.goalsOwn,
          goalsBalance: i.goalsBalance + it.goalsBalance,
          efficiency: w(s(i.totalPoints, it.totalPoints), s(i.totalGames, it.totalGames)) };
        t.push(obj);
      } return null;
    }); return t;
  }); return t as unknown as Classification[];
};

export default Final;
