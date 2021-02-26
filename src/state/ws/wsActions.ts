import { action } from 'typesafe-actions';
import {
  WS_CLEAR_VOTES,
  WS_HIDE_VOTES,
  WS_SET_USER_VOTE_VALUE,
  WS_SHOW_VOTES, WS_USER_JOINED,
} from './wsConstants';

export const wsShowVotes = () => action(WS_SHOW_VOTES);

export const wsHideVotes = () => action(WS_HIDE_VOTES);

export const wsClearVotes = () => action(WS_CLEAR_VOTES);

export const wsSetUserVoteValue = (userId: string, voteValue: string) =>
  action(WS_SET_USER_VOTE_VALUE, { userId, voteValue });

export const wsUserJoined = (sessionId: string) => action(WS_USER_JOINED, sessionId);
