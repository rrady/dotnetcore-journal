import {
  IAuthState,
  AuthActions,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGIN_FAIL
} from '../actions/types';

const initialState : IAuthState = {
  accessToken: '',
  refreshToken: '',
  expires: 0,
  id: '',
  firstName: '',
  lastName: '',
  role: '',
  isAuthenticated: false,
};

export default function (state: IAuthState = initialState, action: AuthActions) : IAuthState {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        expires: action.payload.expires,
        id: action.payload.claims.id,
        firstName: action.payload.claims.firstName,
        lastName: action.payload.claims.lastName,
        role: action.payload.claims.role,
        isAuthenticated: true
      };
    case LOGIN_FAIL:
      return state;
    case LOGOUT_SUCCESS:
      return {
        ...state,
        accessToken: '',
        refreshToken: '',
        expires: 0,
        id: '',
        firstName: '',
        lastName: '',
        role: '',
        isAuthenticated: false
      };
    default:
      return state;
  }
}
