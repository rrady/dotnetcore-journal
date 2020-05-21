import { createAction, createPayloadedAction } from './actionCreators';

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  NEW_ARTICLE_SUCCESS,
  NEW_ARTICLE_FAIL,
  GET_ARTICLES,
  IActionLoginSuccess,
  IActionLoginFail,
  IActionLogoutSuccess,
  IActionRegisterSuccess,
  IActionRegisterFail,
  IActionNewArticleSuccess,
  IActionNewArticleFail,
  IActionGetArticles,
  IActionGetArticle,
  GET_ARTICLE,
  DOWNLOAD_ARTICLE,
  IActionDownloadArticle,
  GET_PENDING,
  IActionPending,
  IActionAccept,
  ACCEPT_ARTICLE,
  IActionGetUsers,
  GET_USERS,
  IActionSetModerator,
  SET_MODERATOR,
  IActionExecuteSearch,
  EXECUTE_SEARCH
} from './types';

export const loginSuccessAction = createPayloadedAction<IActionLoginSuccess>(
  LOGIN_SUCCESS
);

export const loginFailAction = createPayloadedAction<IActionLoginFail>(
  LOGIN_FAIL
);

export const logoutSuccessAction = createAction<IActionLogoutSuccess>(
  LOGOUT_SUCCESS
);

export const registertSuccessAction = createAction<IActionRegisterSuccess>(
  REGISTER_SUCCESS
);

export const registertFailAction = createPayloadedAction<IActionRegisterFail>(
  REGISTER_FAIL
);

export const newArticleSuccessAction = createAction<IActionNewArticleSuccess>(
  NEW_ARTICLE_SUCCESS
);

export const newArticleFailAction = createAction<IActionNewArticleFail>(
  NEW_ARTICLE_FAIL
);

export const getArticles = createPayloadedAction<IActionGetArticles>(
  GET_ARTICLES
);

export const getArticle = createPayloadedAction<IActionGetArticle>(
  GET_ARTICLE
);

export const downloadArticle = createPayloadedAction<IActionDownloadArticle>(
  DOWNLOAD_ARTICLE
);

export const getPending = createPayloadedAction<IActionPending>(
  GET_PENDING
);

export const acceptArticle = createAction<IActionAccept>(
  ACCEPT_ARTICLE
);

export const getUsers = createPayloadedAction<IActionGetUsers>(
  GET_USERS
);

export const setModerator = createAction<IActionSetModerator>(
  SET_MODERATOR
);

export const executeSearch = createPayloadedAction<IActionExecuteSearch>(
  EXECUTE_SEARCH
);
