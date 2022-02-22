import { ActionType, Reducer } from 'typesafe-actions';
import storageService from 'utils/storageService/storageService';
import { StorageKey } from 'utils/storageService';
import { LocaleKey } from 'lang';
import { AppState } from './appModel';
import {
  SET_APP_LOADING,
  SET_APP_LOCALE,
  SET_APP_SIDEBAR_OPEN,
  UNLOCK_APP_HIDDEN_FEATS
} from './appConstants';

type Action = ActionType<typeof import('./appActions')>;

type State = Readonly<AppState>;

const initialState: State = {
  hiddenFeatsUnlocked: initialHiddenFeats(),
  isLoading: false,
  isSidebarOpen: false,
  locale: initialLocale(),
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
    case UNLOCK_APP_HIDDEN_FEATS:
      storageService.set(StorageKey.HiddenFeats, true);

      return {
        ...state,
        hiddenFeatsUnlocked: true,
      };
    default:
      return state;
  }
};

function initialLocale(): LocaleKey {
  return storageService.get<LocaleKey>(StorageKey.Locale) || 'en';
}

function initialHiddenFeats(): boolean {
  return storageService.get<boolean>(StorageKey.HiddenFeats) || false;
}

export default appReducer;
