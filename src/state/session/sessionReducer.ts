import { ActionType, Reducer } from 'typesafe-actions';
import { SessionState } from './sessionTypes';
import { DEFAULT_VOTE_OPTIONS, SET_SESSION_ID, SET_SESSION_USER } from './sessionConstants';
import sessionStorage from '../../utils/sessionStorage';

type Action = ActionType<typeof import('./sessionActions')>;

type State = Readonly<SessionState>;

const initialState: State = {
  sessionId: null,
  user: sessionStorage.getItem('user'),
  voteOptions: DEFAULT_VOTE_OPTIONS,
};

const sessionReducer: Reducer<State, Action> = (state = initialState, action) => {
  switch (action.type) {
    case SET_SESSION_ID:
      return {
        ...state,
        sessionId: action.payload,
      };
    case SET_SESSION_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default sessionReducer;
