import login from '../login';
import Users from '../models/users.model';

const getReaderByEmail = async (email: string): Promise<login> => {
  const user = await Users.findOne({ where: { email } });
  return { id: user?.dataValues.id,
    email: user?.dataValues.email,
    password: user?.dataValues.password };
};

export default { getReaderByEmail };
