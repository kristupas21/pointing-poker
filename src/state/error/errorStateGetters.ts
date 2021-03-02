import { State } from '../../types/global';
import { ErrorState } from './errorModel';

export const getErrorState = (state: State): ErrorState => state.error;
