import axios from 'axios';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { AppState, JPPCAUTH_KEY } from '../store';

import {
  loginSuccessAction,
  loginFailAction,
  logoutSuccessAction,
  registertSuccessAction,
  registertFailAction,
  newArticleSuccessAction,
  newArticleFailAction,
  getArticles,
  getArticle,
  downloadArticle,
  getPending,
  acceptArticle,
  getUsers,
  setModerator,
  executeSearch
} from './actions';

import { RegisterModel, LoginModel, AuthModel, ErrorModel, ArticleModel } from '../models';
import { IAuthState } from './types';

export const loginThunk = (model: LoginModel):
 ThunkAction<void, AppState, null, AnyAction> => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body: string = JSON.stringify(model);

  axios.post<AuthModel>('/api/auth/sign-in', body, config)
    .then((res) => {
      dispatch(loginSuccessAction(res.data));
    })
    .catch((err) => {
      dispatch(loginFailAction(new ErrorModel()));
    });
};

export const logoutThunk = ():
 ThunkAction<void, AppState, null, AnyAction> => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  dispatch(logoutSuccessAction());
};

export const registerThunk = (model: RegisterModel):
 ThunkAction<void, AppState, null, AnyAction> => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body: string = JSON.stringify(model);

  axios.post('/api/auth/sign-up', body, config)
    .then((res) => {
      dispatch(registertSuccessAction());
    })
    .catch((err) => {
      dispatch(registertFailAction(new ErrorModel()));
    });
};

export const createArticleThunk = (model: ArticleModel):
 ThunkAction<void, AppState, null, AnyAction> => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  const authState = JSON.parse(window.localStorage.getItem(JPPCAUTH_KEY)) as IAuthState;
  const config = {
    timeout: 30000,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${authState.accessToken}`
    }
  };
  const formData = new FormData();
  Object.keys(model).forEach((key) => formData.append(key, model[key]));

  axios.post('/api/article', formData, config)
    .then((res) => {
      dispatch(newArticleSuccessAction());
    })
    .catch((err) => {
      dispatch(newArticleFailAction());
    });
};

export const getArticlesThunk = ():
 ThunkAction<void, AppState, null, AnyAction> => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  const authState = JSON.parse(window.localStorage.getItem(JPPCAUTH_KEY)) as IAuthState;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authState.accessToken}`
    }
  };

  axios.get('/api/article', config)
    .then((res) => {
      dispatch(getArticles(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getArticleThunk = (id: string):
 ThunkAction<void, AppState, null, AnyAction> => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  const authState = JSON.parse(window.localStorage.getItem(JPPCAUTH_KEY)) as IAuthState;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authState.accessToken}`
    }
  };

  axios.get(`/api/article/${id}`, config)
    .then((res) => {
      dispatch(getArticle(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const downloadArticleThunk = (id: string):
 ThunkAction<void, AppState, null, AnyAction> => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  const authState = JSON.parse(window.localStorage.getItem(JPPCAUTH_KEY)) as IAuthState;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authState.accessToken}`
    }
  };

  axios.get(`/api/article/${id}/download`, config)
    .then((res) => {
      dispatch(downloadArticle(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getPendingThunk = ():
 ThunkAction<void, AppState, null, AnyAction> => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  const authState = JSON.parse(window.localStorage.getItem(JPPCAUTH_KEY)) as IAuthState;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authState.accessToken}`
    }
  };

  axios.get('/api/article/pending', config)
    .then((res) => {
      dispatch(getPending(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const acceptThunk = (id: string):
 ThunkAction<void, AppState, null, AnyAction> => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  const authState = JSON.parse(window.localStorage.getItem(JPPCAUTH_KEY)) as IAuthState;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authState.accessToken}`
    }
  };

  axios.post(`/api/article/${id}/accept`, null, config)
    .then((res) => {
      dispatch(acceptArticle());
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getUsersThunk = ():
 ThunkAction<void, AppState, null, AnyAction> => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  const authState = JSON.parse(window.localStorage.getItem(JPPCAUTH_KEY)) as IAuthState;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authState.accessToken}`
    }
  };

  axios.get('/api/auth/users', config)
    .then((res) => {
      dispatch(getUsers(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const setModeratorThunk = (id: string):
 ThunkAction<void, AppState, null, AnyAction> => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  const authState = JSON.parse(window.localStorage.getItem(JPPCAUTH_KEY)) as IAuthState;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authState.accessToken}`
    }
  };

  axios.post(`/api/auth/${id}/moderator`, null, config)
    .then((res) => {
      dispatch(setModerator());
    })
    .catch((err) => {
      console.log(err);
    });
};

export const executeSearchThunk = (query: string):
 ThunkAction<void, AppState, null, AnyAction> => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  const authState = JSON.parse(window.localStorage.getItem(JPPCAUTH_KEY)) as IAuthState;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authState.accessToken}`
    }
  };

  const body: string = JSON.stringify({ querytext: query });

  axios.post('/api/article/search', body, config)
    .then((res) => {
      dispatch(executeSearch(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};
