import { ActionType, Reducer } from 'typesafe-actions';
import { SessionState } from './sessionTypes';
import { SESSION_SET_ID, SESSION_SET_USER } from './sessionConstants';

type Action = ActionType<typeof import('./sessionActions')>;

type State = Readonly<SessionState>;

const initialState: State = {
  sessionId: null,
  user: null,
};

const sessionReducer: Reducer<State, Action> = (state = initialState, action) => {
  switch (action.type) {
    case SESSION_SET_ID:
      return {
        ...state,
        sessionId: action.payload,
      };
    case SESSION_SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default sessionReducer;
