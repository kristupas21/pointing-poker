import { ActionType, Reducer } from 'typesafe-actions';
import { SessionState } from './sessionTypes';
import { CLOSE_SESSION, INIT_SESSION, SET_SESSION_PARAMS, SET_SESSION_USER } from './sessionConstants';
import storageService from '../../utils/storageService';
import { User } from '../../types/global';
import { PointValueLib } from '../../utils/pointValues/types';

type Action = ActionType<typeof import('./sessionActions')>;

type State = Readonly<SessionState>;

const getSessionUser = (): User => storageService.get('user');

const initialState: State = {
  currentSessionId: null,
  user: getSessionUser(),
  useRoles: false,
  pointValueLib: PointValueLib.Default,
};

const sessionReducer: Reducer<State, Action> = (state = initialState, action) => {
  switch (action.type) {
    case INIT_SESSION:
    case SET_SESSION_PARAMS:
      return {
        ...state,
        currentSessionId: action.payload.sessionId,
        useRoles: action.payload.useRoles,
      };
    case SET_SESSION_USER:
      return {
        ...state,
        user: action.payload,
      };
    case CLOSE_SESSION:
      return {
        ...initialState,
        user: getSessionUser(),
      };
    default:
      return state;
  }
};

export default sessionReducer;
