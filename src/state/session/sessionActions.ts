import { action } from 'typesafe-actions';
import { User } from '../../types/global';
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
} from './sessionConstants';
import { CreateSessionFormData } from '../../containers/CreateSessionForm/CreateSessionForm';
import { SessionState } from './sessionTypes';
import { PointValue } from '../../utils/pointValues/types';

export const initSession = (params: Partial<SessionState>) =>
  action(INIT_SESSION, params);

export const setSessionUser = (user: User) => action(SET_SESSION_USER, user);

export const startSession = (formData: CreateSessionFormData) =>
  action(START_SESSION, formData);

export const joinSession = (formData: CreateSessionFormData) =>
  action(JOIN_SESSION, formData);

export const loadSession = (id: string) => action(LOAD_SESSION, id);

export const closeSession = (id?: string) => action(CLOSE_SESSION, id);

export const setSessionParams = (params: Partial<SessionState>) =>
  action(SET_SESSION_PARAMS, params);

export const addSessionPointValue = () => action(ADD_SESSION_POINT_VALUE);

export const removeSessionPointValue = (id: string) =>
  action(REMOVE_SESSION_POINT_VALUE, id);

export const saveSessionPointValue = (value: Partial<PointValue>) =>
  action(SAVE_SESSION_POINT_VALUE, value);
