import { action } from 'typesafe-actions';
import { SESSION_SET_ID, SESSION_SET_USER } from './sessionConstants';
import { User } from '../../types/global';

export const sessionSetId = (id: string) => action(SESSION_SET_ID, id);

export const sessionSetUser = (user: User) => action(SESSION_SET_USER, user);
