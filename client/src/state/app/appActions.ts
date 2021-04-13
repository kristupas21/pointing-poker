import { action } from 'typesafe-actions';
import { LocaleKey } from 'lang';
import { SET_APP_LOADING, SET_APP_LOCALE, SET_APP_SIDEBAR_OPEN } from './appConstants';

export const setAppLocale = (locale: LocaleKey) => action(SET_APP_LOCALE, locale);

export const setAppSidebarOpen = (isOpen: boolean) => action(SET_APP_SIDEBAR_OPEN, isOpen);

export const setAppLoading = (status: boolean) => action(SET_APP_LOADING, status);
