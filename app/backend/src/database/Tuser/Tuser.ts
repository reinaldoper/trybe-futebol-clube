import login from '../login';

export interface Tuser extends login {
  id: number;
  username: string;
  email: string;
  role: string;
  password: string;
}
