import { IAction, IPayloadedAction } from './actionCreators';
import { AuthModel, ErrorModel, ArticleModel } from '../models';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';

export const NEW_ARTICLE_SUCCESS = 'NEW_ARTICLE_SUCCESS';
export const NEW_ARTICLE_FAIL = 'NEW_ARTICLE_FAIL';

export const GET_ARTICLES = 'GET_ARTICLES';
export const GET_ARTICLE = 'GET_ARTICLE';
export const DOWNLOAD_ARTICLE = 'DOWNLOAD_ARTICLE';
export const GET_PENDING = 'GET_PENDING';
export const ACCEPT_ARTICLE = 'ACCEPT_ARTICLE';

export const GET_USERS = 'GET_USERS';
export const SET_MODERATOR = 'SET_MODERATOR';

export const EXECUTE_SEARCH = 'EXECUTE_SEARCH';

export interface IActionLoginSuccess extends IPayloadedAction<typeof LOGIN_SUCCESS, AuthModel> {}

export interface IActionLoginFail extends IPayloadedAction<typeof LOGIN_FAIL, ErrorModel> {}

export interface IActionLogoutSuccess extends IAction<typeof LOGOUT_SUCCESS> {}

export interface IActionRegisterSuccess extends IAction<typeof REGISTER_SUCCESS> {}

export interface IActionRegisterFail extends IPayloadedAction<typeof REGISTER_FAIL, ErrorModel> {}

export interface IActionNewArticleSuccess extends IAction<typeof NEW_ARTICLE_SUCCESS> {}

export interface IActionNewArticleFail extends IAction<typeof NEW_ARTICLE_FAIL> {}

export interface IActionGetArticles extends IPayloadedAction<typeof GET_ARTICLES, []> {}

export interface IActionGetArticle extends IPayloadedAction<typeof GET_ARTICLE, ArticleModel> {}

export interface IActionDownloadArticle extends IPayloadedAction<typeof DOWNLOAD_ARTICLE, Blob> {}

export interface IActionPending extends IPayloadedAction<typeof GET_PENDING, []> {}

export interface IActionAccept extends IAction<typeof ACCEPT_ARTICLE> {}

export interface IActionGetUsers extends IPayloadedAction<typeof GET_USERS, []> {}

export interface IActionSetModerator extends IAction<typeof SET_MODERATOR> {}

export interface IActionExecuteSearch extends IPayloadedAction<typeof EXECUTE_SEARCH, []> {}

export type AuthActions = IActionLoginSuccess | IActionLoginFail | IActionLogoutSuccess | IActionRegisterSuccess | IActionRegisterFail |
  IActionNewArticleSuccess | IActionNewArticleFail | IActionGetArticles | IActionGetArticle | IActionDownloadArticle | IActionPending |
  IActionAccept | IActionGetUsers | IActionSetModerator | IActionExecuteSearch;

export interface IAuthState {
  accessToken: string;
  refreshToken: string;
  expires: number;
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  isAuthenticated: boolean;
}

export interface IArticlesState {
  articles: [];
  article: ArticleModel;
  content: Blob;
}

export interface IAdminState {
  pendings: [];
  users: [];
}

export interface IErrorState {
  code: string;
  message: string;
}
