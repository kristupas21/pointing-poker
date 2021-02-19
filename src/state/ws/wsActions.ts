import { action } from 'typesafe-actions';
import { WS_USER_JOINED, WS_USER_LEFT } from './wsConstants';

export const wsUserJoined = (sessionId: string) => action(WS_USER_JOINED, sessionId);

export const wsUserLeft = (sessionId: string) => action(WS_USER_LEFT, sessionId);
