import { LocaleKey } from 'lang';

export interface AppState {
  locale: LocaleKey;
  isSidebarOpen: boolean;
  isLoading: boolean;
}
