import { createStore, applyMiddleware, combineReducers } from 'redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import authReducer from '../reducers/authReducer';
import articlesReducer from '../reducers/articlesReducer';

import requestMiddleware from './requestMiddleware';
import { loadAuthState } from './persistAuthState';
import adminReducer from '../reducers/adminReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  articles: articlesReducer,
  admin: adminReducer
});

const persistAuthState = loadAuthState();

export type AppState = ReturnType<typeof rootReducer>;

export function configureStore () {
  const middlewares = [reduxThunk, requestMiddleware()];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(
    rootReducer,
    persistAuthState,
    composeWithDevTools(middleWareEnhancer)
  );

  return store;
}
