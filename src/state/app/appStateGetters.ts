import { State } from 'globalTypes';

export const getAppSidebarOpen = (state: State): boolean => state.app.isSidebarOpen;

export const getAppLocale = (state: State): string => state.app.locale;

export const getAppLoading = (state: State): boolean => state.app.isLoading;
