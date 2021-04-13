import { action } from 'typesafe-actions';
import { User } from 'globalTypes';
import { PointValue } from 'utils/pointValues/types';
import { SessionFormData } from 'containers/SessionForms/types';
import { SessionState } from './sessionModel';
import {
  START_SESSION,
  SET_SESSION_USER,
  JOIN_SESSION,
  LOAD_SESSION,
  CLOSE_SESSION,
  INIT_SESSION,
  SET_SESSION_PARAMS,
  ADD_SESSION_POINT_VALUE,
  REMOVE_SESSION_POINT_VALUE,
  SAVE_SESSION_POINT_VALUE,
  ADD_SESSION_ROLE,
  REMOVE_SESSION_ROLE,
  SAVE_SESSION_ROLES,
  MODIFY_SESSION_USER,
  GET_SESSION_INFO,
  RESET_SESSION_STATE,
  RESET_SESSION_ROLES,
  RESET_SESSION_POINT_VALUES, SET_SESSION_FORM_LOADING,
} from './sessionConstants';

export const initSession = (params: Partial<SessionState>) =>
  action(INIT_SESSION, params);

export const setSessionUser = (user: User) => action(SET_SESSION_USER, user);

export const startSession = (formData: SessionFormData) =>
  action(START_SESSION, formData);

export const joinSession = (
  formData: SessionFormData,
  setSubmitting: (value: boolean) => void,
) =>
  action(JOIN_SESSION, { formData, setSubmitting });

export const loadSession = (id: string) => action(LOAD_SESSION, id);

export const closeSession = (id?: string) => action(CLOSE_SESSION, id);

export const resetSessionState = () => action(RESET_SESSION_STATE);

export const setSessionParams = (params: Partial<SessionState>) =>
  action(SET_SESSION_PARAMS, params);

export const addSessionPointValue = () => action(ADD_SESSION_POINT_VALUE);

export const removeSessionPointValue = (id: string) =>
  action(REMOVE_SESSION_POINT_VALUE, id);

export const saveSessionPointValue = (value: Partial<PointValue>) =>
  action(SAVE_SESSION_POINT_VALUE, value);

export const addSessionRole = () => action(ADD_SESSION_ROLE);

export const removeSessionRole = (role: string) =>
  action(REMOVE_SESSION_ROLE, role);

export const saveSessionRoles = (roles: string[]) =>
  action(SAVE_SESSION_ROLES, roles);

export const modifySessionUser = (params: Partial<User>) => action(MODIFY_SESSION_USER, params);

export const getSessionInfo = (
  sessionId: string,
  callback?: () => void,
) => action(GET_SESSION_INFO, { sessionId, callback });

export const resetSessionRoles = () => action(RESET_SESSION_ROLES);

export const resetSessionPointValues = () => action(RESET_SESSION_POINT_VALUES);

export const setSessionFormLoading = (status: boolean) => action(SET_SESSION_FORM_LOADING, status);
