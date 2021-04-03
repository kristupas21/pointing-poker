import { ActionType, Reducer } from 'typesafe-actions';
import storageService from 'utils/storageService/storageService';
import { StorageKey } from 'utils/storageService';
import { LocaleKey } from 'lang';
import { AppState } from './appModel';
import { SET_APP_LOADING, SET_APP_LOCALE, SET_APP_SIDEBAR_OPEN } from './appConstants';

type Action = ActionType<typeof import('./appActions')>;

type State = Readonly<AppState>;

const initialState: State = {
  locale: initialLocale(),
  isSidebarOpen: false,
  isLoading: false,
};

const appReducer: Reducer<State, Action> = (state = initialState, action) => {
  switch (action.type) {
    case SET_APP_LOCALE: {
      storageService.set(StorageKey.Locale, action.payload);

      return {
        ...state,
        locale: action.payload,
      };
    }
    case SET_APP_SIDEBAR_OPEN:
      return {
        ...state,
        isSidebarOpen: action.payload,
      };
    case SET_APP_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

function initialLocale(): LocaleKey {
  return storageService.get<LocaleKey>(StorageKey.Locale) || 'en';
}

export default appReducer;
