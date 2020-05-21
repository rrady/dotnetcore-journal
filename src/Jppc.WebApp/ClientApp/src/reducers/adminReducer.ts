import {
  AuthActions,
  GET_PENDING,
  IAdminState,
  GET_USERS,
  SET_MODERATOR,
  ACCEPT_ARTICLE
} from '../actions/types';

const initialState : IAdminState = {
  pendings: [],
  users: []
};

export default function (state: IAdminState = initialState, action: AuthActions) : IAdminState {
  switch (action.type) {
    case GET_PENDING:
      return {
        ...state,
        pendings: action.payload,
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case SET_MODERATOR:
      return state;
    case ACCEPT_ARTICLE:
      return state;
    default:
      return state;
  }
}
