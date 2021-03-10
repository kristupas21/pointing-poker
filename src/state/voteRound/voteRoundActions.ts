import { action } from 'typesafe-actions';
import { User } from 'types/global';
import {
  ADD_USER_TO_VOTE_ROUND,
  RESET_VOTE_ROUND,
  HIDE_VOTES,
  INIT_VOTE_ROUND, REMOVE_USER_FROM_VOTE_ROUND,
  SET_USER_VOTE_VALUE,
  SHOW_VOTES, SET_VOTE_ROUND_TOPIC, CLEAR_VOTE_ROUND_STATE
} from './voteRoundConstants';
import { VoteRoundState } from './voteRoundModel';

export const addUserToVoteRound = (user: User) =>
  action(ADD_USER_TO_VOTE_ROUND, user);

export const removeUserFromVoteRound = (userId: string) =>
  action(REMOVE_USER_FROM_VOTE_ROUND, userId);

export const setUserVoteValue = (userId: string, voteValue: string) =>
  action(SET_USER_VOTE_VALUE, { userId, voteValue });

export const resetVoteRound = () => action(RESET_VOTE_ROUND);

export const showVotes = () => action(SHOW_VOTES);

export const hideVotes = () => action(HIDE_VOTES);

export const initVoteRound = (params: VoteRoundState) =>
  action(INIT_VOTE_ROUND, params);

export const setVoteRoundTopic = (topic: string) => action(SET_VOTE_ROUND_TOPIC, topic);

export const clearVoteRoundState = () => action(CLEAR_VOTE_ROUND_STATE);
