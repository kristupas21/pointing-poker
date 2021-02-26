import { action } from 'typesafe-actions';
import {
  WS_RESET_VOTE_ROUND,
  WS_HIDE_VOTES,
  WS_SET_USER_VOTE_VALUE,
  WS_SHOW_VOTES, WS_USER_JOINED, WS_SET_VOTE_ROUND_TOPIC,
} from './wsConstants';

/**
 * If no emitter is present for WS event,
 * payload will be message.body
 */

export const wsShowVotes = () => action(WS_SHOW_VOTES);

export const wsHideVotes = () => action(WS_HIDE_VOTES);

export const wsResetVoteRound = () => action(WS_RESET_VOTE_ROUND);

export const wsSetUserVoteValue = (userId: string, voteValue: string) =>
  action(WS_SET_USER_VOTE_VALUE, { userId, voteValue });

export const wsUserJoined = (sessionId: string) => action(WS_USER_JOINED, sessionId);

export const wsSetVoteRoundTopic = (topic: string) => action(WS_SET_VOTE_ROUND_TOPIC, { topic });
