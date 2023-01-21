import { Tuser } from '../Tuser/Tuser';

export interface IuserDb {
  findByEmail(email: string): Promise<Tuser>
}
