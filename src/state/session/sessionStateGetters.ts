import { State, User } from '../../types/global';
import { PointValue } from '../../utils/pointValues/types';

export const getSessionUser = (state: State): User => state.session.user;

export const getSessionUserId = (state: State): string => state.session.user?.id;

export const getSessionPointValues = (state: State): PointValue[] => state.session.pointValues;
