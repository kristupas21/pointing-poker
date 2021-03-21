import { State } from 'types/global';

export const getSidebarOpenValue = (state: State): boolean => state.app.isSidebarOpen;

export const getAppLocale = (state: State): string => state.app.locale;