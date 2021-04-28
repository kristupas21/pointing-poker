import { action } from 'typesafe-actions';
import {
  SET_FORM_LOADING
} from './formConstants';

export const setFormLoading = (status: boolean) => action(SET_FORM_LOADING, status);
