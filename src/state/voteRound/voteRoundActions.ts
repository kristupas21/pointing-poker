import { action } from 'typesafe-actions';
import { ADD_USER_TO_VOTE_ROUND, CLEAR_VOTES, HIDE_VOTES, SET_USER_VOTE_VALUE, SHOW_VOTES } from './voteRoundConstants';
import { User } from '../../types/global';

export const addUserToVoteRound = (user: User) =>
  action(ADD_USER_TO_VOTE_ROUND, user);

export const setUserVoteValue = (userId: string, voteValue: string) =>
  action(SET_USER_VOTE_VALUE, { userId, voteValue });

export const clearVotes = () => action(CLEAR_VOTES);

export const showVotes = () => action(SHOW_VOTES);

export const hideVotes = () => action(HIDE_VOTES);
