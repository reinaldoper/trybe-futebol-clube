import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Team from './team.model';

class Match extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awaitTeamsGoals: number;
  declare inProgress: boolean;
}

Match.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  awayTeamId: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  awaitTeamsGoals: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Team.hasMany(Match, { foreignKey: 'id', as: 'matchs' });

Match.belongsTo(Team, { foreignKey: 'homeTeamId', as: 'home_team_ids' });
Match.belongsTo(Team, { foreignKey: 'awayTeamId', as: 'away_team_ids' });

export default Match;
