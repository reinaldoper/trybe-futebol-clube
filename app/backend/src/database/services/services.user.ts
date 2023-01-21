import Users from '../models/users.model';
import { Tuser } from '../Tuser/Tuser';

const getUserByEmail = async (email: string): Promise<Tuser> => {
  const user = await Users.findOne({ where: { email } });
  return { id: user?.dataValues.id,
    username: user?.dataValues.username,
    role: user?.dataValues.role,
    email: user?.dataValues.email,
    password: user?.dataValues.password };
};

const getUserById = async (id: number): Promise<Tuser> => {
  const user = await Users.findByPk(id, {
    attributes: { exclude: ['password'] },
  });
  return user as unknown as Tuser;
};

export default { getUserByEmail, getUserById };
