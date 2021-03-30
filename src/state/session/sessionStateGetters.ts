import { State, User } from 'globalTypes';
import { PointValue } from 'utils/pointValues/types';
import { AvatarId } from 'components/Avatar';
import { SessionState } from './sessionModel';
import { removeEmptyRoles } from './sessionUtils';

export const getSessionState = (state: State): SessionState => state.session;

export const getSessionUser = (state: State): User => state.session.user;

export const getSessionUserId = (state: State): string => state.session.user?.id;

export const getSessionUserName = (state: State): string => state.session.user?.name || '';

export const getSessionUserAvatarId = (state: State): AvatarId => state.session.user?.avatarId;

export const getSessionUserRole = (state: State): string => state.session.user?.role || '';

export const getSessionUserIsObserver = (state: State): boolean =>
  state.session.user?.isObserver || false;

export const getSessionPointValues = (state: State): PointValue[] => state.session.pointValues;

export const getSessionRoles = (state: State): string[] => state.session.roles;

export const getNormalizedSessionRoles = (state: State): string[] =>
  removeEmptyRoles(state.session.roles);

export const getSessionUseRoles = (state: State): boolean => state.session.useRoles;

export const getSessionCurrentId = (state: State): string => state.session.currentSessionId;

export const getSessionFormLoading = (state: State): boolean => state.session.isFormLoading;
