export interface IRegisterModel {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
}

export class RegisterModel implements IRegisterModel {
  public email: string;
  public firstName: string;
  public lastName: string;
  public password: string;
  public role: string;

  constructor ();
  constructor (email: string, firstName: string, lastName: string, password: string, role: string);
  constructor (email?: string, firstName?: string, lastName?: string, password?: string, role?: string) {
    this.email = email || '';
    this.firstName = firstName || '';
    this.lastName = lastName || '';
    this.password = password || '';
    this.role = role || 'user';
  }

  static create (model: RegisterModel): RegisterModel {
    const instance = new RegisterModel();
    Object.assign<RegisterModel, RegisterModel>(instance, model);

    return instance;
  }
}
