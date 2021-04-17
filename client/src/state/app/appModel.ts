import { LocaleKey } from 'lang';

export interface AppState {
  hiddenFeatsUnlocked: boolean;
  isLoading: boolean;
  isSidebarOpen: boolean;
  locale: LocaleKey;
}
