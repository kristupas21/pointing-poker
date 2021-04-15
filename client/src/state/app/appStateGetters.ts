import { State } from 'globalTypes';
import { LocaleKey } from 'lang';

export const getAppSidebarOpen = (state: State): boolean => state.app.isSidebarOpen;

export const getAppLocale = (state: State): LocaleKey => state.app.locale;

export const getAppLoading = (state: State): boolean => state.app.isLoading;

export const getAppHiddenFeatsUnlocked = (state: State): boolean => state.app.hiddenFeatsUnlocked;
