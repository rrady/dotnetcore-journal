export interface IAuthModel {
  accessToken: string;
  refreshToken: string;
  expires: number;
  claims: IUserClaims;
}

export interface IUserClaims {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
}

export class AuthModel implements IAuthModel {
  public accessToken: string;
  public refreshToken: string;
  public expires: number;
  public claims: IUserClaims;

  constructor ();
  constructor (accessToken: string, refreshToken: string, expires: number, claims: IUserClaims);
  constructor (accessToken?: string, refreshToken?: string, expires?: number, claims?: IUserClaims) {
    this.accessToken = accessToken || '';
    this.refreshToken = refreshToken || '';
    this.expires = expires || 0;
    this.claims = claims || null;
  }

  static create (model: AuthModel): AuthModel {
    const instance = new AuthModel();
    Object.assign<AuthModel, AuthModel>(instance, model);

    return instance;
  }
}
