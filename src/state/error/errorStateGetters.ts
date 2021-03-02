import { State } from '../../types/global';
import { ErrorState } from './errorTypes';

export const getErrorState = (state: State): ErrorState => state.error;
