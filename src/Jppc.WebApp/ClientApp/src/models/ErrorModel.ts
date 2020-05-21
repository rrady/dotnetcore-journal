export enum ErrorCodes {
  email_in_use,
  invalid_credentials,
  invalid_current_password,
  invalid_email,
  invalid_first_name,
  invalid_last_name,
  invalid_password,
  invalid_role,
  refresh_token_not_found,
  refresh_token_already_revoked,
  user_not_found,
  unknown_error
}

export interface IErrorModel {
  code: ErrorCodes;
  message: string;
}

export class ErrorModel implements IErrorModel {
  public code: ErrorCodes;
  public message: string;

  constructor ();
  constructor (code: ErrorCodes, message: string);
  constructor (code?: ErrorCodes, message?: string) {
    this.code = code || ErrorCodes.unknown_error;
    this.message = message || '';
  }

  static create (model: ErrorModel): ErrorModel {
    const instance = new ErrorModel();
    Object.assign<ErrorModel, ErrorModel>(instance, model);

    return instance;
  }
}
