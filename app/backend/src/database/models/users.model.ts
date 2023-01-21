import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';

class Users extends Model {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

Users.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },
    username: {
      allowNull: false,
      type: STRING(255),
    },
    role: {
      allowNull: false,
      type: STRING(255),
    },
    email: {
      allowNull: false,
      type: STRING(255),
    },
    password: {
      allowNull: false,
      type: STRING(255),
    },
  },
  {
  // ... Outras configs
    underscored: true,
    sequelize: db,
    modelName: 'users',
    timestamps: false,
  },
);

export default Users;
