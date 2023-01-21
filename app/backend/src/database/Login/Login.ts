import login from '../login';

export default class Login implements login {
  private _email: string;
  private _password: string;
  constructor(public email: string, public password: string) {
    this._email = email;
    this._password = password;
  }

  set Email(email) {
    this._email = email;
  }

  get Email(): string {
    return this._email;
  }

  get Password(): string {
    return this._password;
  }
}
