import { AppState } from './store';
import { IAuthState } from '../actions/types';

export const JPPCAUTH_KEY = 'JppcAuthState';

export const loadAuthState = (): AppState => {
  try {
    const serializedAuthState = localStorage.getItem(JPPCAUTH_KEY);
    if (serializedAuthState === null) {
      return undefined;
    }

    return { auth: JSON.parse(serializedAuthState) } as AppState;
  } catch (err) {
    return undefined;
  }
};

export const saveAuthState = (state: IAuthState) => {
  try {
    const serializedAuthState = JSON.stringify(state);
    localStorage.setItem(JPPCAUTH_KEY, serializedAuthState);
  } catch (err) {
    console.error(err.message);
  }
};
