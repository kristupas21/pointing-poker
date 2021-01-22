import { action } from 'typesafe-actions';
import { ErrorState } from './errorTypes';
import { SET_ERROR_STATE, THROW_APP_ERROR } from './errorConstants';
import { MessageId } from '../../lang';

export const setErrorState = (state: ErrorState) => action(SET_ERROR_STATE, state);

export const throwAppError = (errorId: MessageId) => action(THROW_APP_ERROR, errorId);
