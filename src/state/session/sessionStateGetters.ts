import { State, User } from 'types/global';
import { PointValue } from 'utils/pointValues/types';
import { AvatarId } from 'components/Avatar';
import { UserRole } from 'utils/userRoles/types';
import { SessionState } from './sessionModel';

export const getSessionState = (state: State): SessionState => state.session;

export const getSessionUser = (state: State): User => state.session.user;

export const getSessionUserId = (state: State): string => state.session.user?.id;

export const getSessionUserName = (state: State): string => state.session.user?.name || '';

export const getSessionUserAvatarId = (state: State): AvatarId => state.session.user?.avatarId;

export const getSessionUserIsObserver = (state: State): boolean => state.session.user?.isObserver || false;

export const getSessionPointValues = (state: State): PointValue[] => state.session.pointValues;

export const getSessionRoles = (state: State): UserRole[] => state.session.roles;

export const getSessionUseRoles = (state: State): boolean => state.session.useRoles;

export const getSessionCurrentId = (state: State): string => state.session.currentSessionId;
