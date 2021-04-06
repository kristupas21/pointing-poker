import { action } from 'typesafe-actions';
import { MessageId } from 'lang';
import { ErrorState } from './errorModel';
import { SET_ERROR_STATE, THROW_APP_ERROR } from './errorConstants';

export const setErrorState = (state: ErrorState) => action(SET_ERROR_STATE, state);

export const throwAppError = (errorId: MessageId, errorPayload?: any) =>
  action(THROW_APP_ERROR, { errorId, errorPayload });
