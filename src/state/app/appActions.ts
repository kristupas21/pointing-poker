import { action } from 'typesafe-actions';
import { SET_APP_LOCALE } from './appConstants';

export const setAppLocale = (locale: string) => action(SET_APP_LOCALE, locale);
