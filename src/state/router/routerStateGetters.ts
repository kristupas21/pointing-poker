import { State } from 'globalTypes';

export const getCurrentRoutePath = (state: State): string => state.router.location.pathname;
