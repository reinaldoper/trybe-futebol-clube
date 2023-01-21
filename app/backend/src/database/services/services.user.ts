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

export default { getUserByEmail };
