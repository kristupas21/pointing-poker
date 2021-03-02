import { action } from 'typesafe-actions';
import { ErrorState } from './errorModel';
import { SET_ERROR_STATE, THROW_APP_ERROR } from './errorConstants';
import { MessageId } from '../../lang';

export const setErrorState = (state: ErrorState) => action(SET_ERROR_STATE, state);

export const throwAppError = (errorId: string) => action(THROW_APP_ERROR, errorId as MessageId);
