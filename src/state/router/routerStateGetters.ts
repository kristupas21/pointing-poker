import { State } from 'types/global';

export const getCurrentRoutePath = (state: State): string => state.router.location.pathname;
