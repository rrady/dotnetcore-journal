import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AnyAction, Dispatch, MiddlewareAPI } from 'redux';

import { AppState } from './store';
import { AuthModel } from '../models';
import { loginSuccessAction } from '../actions/actions';
import { IAuthState } from '../actions/types';

const config: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json'
  }
};

const requestMiddleware = () => {
  return (store: MiddlewareAPI<any, AppState>) => (next: Dispatch) => (action: AnyAction) => {
    const {
      request,
    } = action;

    if (!request) {
      return next(action);
    }

    const auth: IAuthState = store.getState().auth;

    const refreshThreshold = new Date().getTime();

    if (auth.refreshToken && refreshThreshold > auth.expires) {
      const body: string = JSON.stringify({ token: auth.refreshToken });
      axios.post<AuthModel>(`/tokens/${auth.refreshToken}/refresh`, body, config)
        .then((res: AxiosResponse<AuthModel>) => {
          next(loginSuccessAction(res.data));
          return request(auth);
        })
        .catch((err: Error) => {
          console.error(err.message);
        });
    }

    return request(auth);
  };
};

export default requestMiddleware;
