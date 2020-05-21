export interface ILoginModel {
  email: string;
  password: string;
}

export class LoginModel implements ILoginModel {
  public email: string;
  public password: string;

  constructor ();
  constructor (email: string, password: string);
  constructor (email?: string, password?: string) {
    this.email = email || '';
    this.password = password || '';
  }

  static create (model: LoginModel): LoginModel {
    const instance = new LoginModel();
    Object.assign<LoginModel, LoginModel>(instance, model);

    return instance;
  }
}
