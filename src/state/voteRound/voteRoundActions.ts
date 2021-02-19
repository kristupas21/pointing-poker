import { action } from 'typesafe-actions';
import {
  ADD_USER_TO_VOTE_ROUND,
  CLEAR_VOTES,
  HIDE_VOTES,
  INIT_VOTE_ROUND, REMOVE_USER_FROM_VOTE_ROUND,
  SET_USER_VOTE_VALUE,
  SET_VOTE_ROUND_USERS,
  SHOW_VOTES
} from './voteRoundConstants';
import { User } from '../../types/global';

export const setVoteRoundUsers = (users: User[]) =>
  action(SET_VOTE_ROUND_USERS, users);

export const addUserToVoteRound = (user: User) =>
  action(ADD_USER_TO_VOTE_ROUND, user);

export const removeUserFromVoteRound = (userId: string) =>
  action(REMOVE_USER_FROM_VOTE_ROUND, userId);

export const setUserVoteValue = (userId: string, voteValue: string) =>
  action(SET_USER_VOTE_VALUE, { userId, voteValue });

export const clearVotes = () => action(CLEAR_VOTES);

export const showVotes = () => action(SHOW_VOTES);

export const hideVotes = () => action(HIDE_VOTES);

export const initVoteRound = (users: User[]) => action(INIT_VOTE_ROUND, users);
