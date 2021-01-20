import { action } from 'typesafe-actions';
import { APP_SET_LOADING } from './appConstants';

export const appSetLoading = (status: boolean) => action(APP_SET_LOADING, status);
