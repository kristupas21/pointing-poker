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
} from './sessionConstants';
import { CreateSessionFormData } from '../../containers/CreateSessionForm/CreateSessionForm';

export const initSession = (sessionId: string, useRoles: boolean) =>
  action(INIT_SESSION, { sessionId, useRoles });

export const setSessionUser = (user: User) => action(SET_SESSION_USER, user);

export const startSession = (formData: CreateSessionFormData, setSubmitting: (v: boolean) => void) =>
  action(START_SESSION, { formData, setSubmitting });

export const joinSession = (formData: CreateSessionFormData, setSubmitting: (v: boolean) => void) =>
  action(JOIN_SESSION, { formData, setSubmitting });

export const loadSession = (id: string) => action(LOAD_SESSION, id);

export const closeSession = (id?: string) => action(CLOSE_SESSION, id);

export const setSessionParams = (sessionId: string, useRoles: boolean) =>
  action(SET_SESSION_PARAMS, { sessionId, useRoles });
