import { ActionType, Reducer } from 'typesafe-actions';
import { AppState } from './appTypes';
import { APP_SET_LOADING } from './appConstants';

type Action = ActionType<typeof import('./appActions')>;

type State = Readonly<AppState>;

const initialState: State = {
  isLoading: false,
};

const appReducer: Reducer<State, Action> = (state = initialState, action) => {
  switch (action.type) {
    case APP_SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default appReducer;
