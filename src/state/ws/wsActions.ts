import { action } from 'typesafe-actions';
import { WS_CLEAR_VOTES, WS_HIDE_VOTES, WS_SHOW_VOTES, WS_USER_JOINED, WS_USER_LEFT } from './wsConstants';

export const wsUserJoined = (sessionId: string) => action(WS_USER_JOINED, sessionId);

export const wsUserLeft = (sessionId: string) => action(WS_USER_LEFT, sessionId);

export const wsShowVotes = () => action(WS_SHOW_VOTES);

export const wsHideVotes = () => action(WS_HIDE_VOTES);

export const wsClearVotes = () => action(WS_CLEAR_VOTES);
