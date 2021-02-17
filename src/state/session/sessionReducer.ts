import { ActionType, Reducer } from 'typesafe-actions';
import { SessionState } from './sessionTypes';
import { CLOSE_SESSION, DEFAULT_VOTE_OPTIONS, SET_SESSION_ID, SET_SESSION_USER } from './sessionConstants';
import storageService from '../../utils/storageService';
import { User } from '../../types/global';

type Action = ActionType<typeof import('./sessionActions')>;

type State = Readonly<SessionState>;

const getSessionUser = (): User => storageService.getItem('user');

const initialState: State = {
  currentSessionId: null,
  user: getSessionUser(),
  voteOptions: DEFAULT_VOTE_OPTIONS,
};

const sessionReducer: Reducer<State, Action> = (state = initialState, action) => {
  switch (action.type) {
    case SET_SESSION_ID:
      return {
        ...state,
        currentSessionId: action.payload,
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
