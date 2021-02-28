import { ActionType, Reducer } from 'typesafe-actions';
import { AppState } from './appTypes';
import { SET_APP_LOCALE, SET_APP_SIDEBAR_OPEN } from './appConstants';

type Action = ActionType<typeof import('./appActions')>;

type State = Readonly<AppState>;

const initialState: State = {
  locale: 'en',
  isSidebarOpen: false,
};

const appReducer: Reducer<State, Action> = (state = initialState, action) => {
  switch (action.type) {
    case SET_APP_LOCALE:
      return {
        ...state,
        locale: action.payload,
      };
    case SET_APP_SIDEBAR_OPEN:
      return {
        ...state,
        isSidebarOpen: action.payload,
      };
    default:
      return state;
  }
};

export default appReducer;
