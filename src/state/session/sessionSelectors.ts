import { State, User } from '../../types/global';

export const selectSessionUser = (state: State): User => state.session.user;

export const selectSessionUserId = (state: State): string => state.session.user?.id;
