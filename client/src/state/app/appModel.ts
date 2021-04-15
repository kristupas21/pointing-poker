import { LocaleKey } from 'lang';

export interface AppState {
  hiddenFeatsUnlocked: boolean;
  locale: LocaleKey;
  isSidebarOpen: boolean;
  isLoading: boolean;
}
