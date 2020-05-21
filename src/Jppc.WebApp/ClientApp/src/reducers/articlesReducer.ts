import {
  IArticlesState,
  AuthActions,
  GET_ARTICLES,
  GET_ARTICLE,
  GET_PENDING,
  EXECUTE_SEARCH
} from '../actions/types';
import { ArticleModel } from '../models';

const initialState : IArticlesState = {
  articles: [],
  article: new ArticleModel(),
  content: new Blob()
};

export default function (state: IArticlesState = initialState, action: AuthActions) : IArticlesState {
  switch (action.type) {
    case GET_ARTICLES:
      return {
        ...state,
        articles: action.payload,
      };
    case GET_ARTICLE:
      return {
        ...state,
        article: action.payload,
      };
    case GET_PENDING:
      return {
        ...state,
        articles: action.payload,
      };
    case EXECUTE_SEARCH:
      return {
        ...state,
        articles: action.payload
      };
    default:
      return state;
  }
}
