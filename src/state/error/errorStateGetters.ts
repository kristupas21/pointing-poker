import { State } from 'globalTypes';
import { ErrorState } from './errorModel';

export const getErrorState = (state: State): ErrorState => state.error;

export const getCurrentErrorId = (state: State) => state.error.errorId;
