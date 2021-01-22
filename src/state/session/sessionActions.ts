import { action } from 'typesafe-actions';
import { User } from '../../types/global';
import { CREATE_SESSION, SET_SESSION_ID, SET_SESSION_USER } from './sessionConstants';

export const setSessionId = (id: string) => action(SET_SESSION_ID, id);

export const setSessionUser = (user: User) => action(SET_SESSION_USER, user);

export const createSession = () => action(CREATE_SESSION);
