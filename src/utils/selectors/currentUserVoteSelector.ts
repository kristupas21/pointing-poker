import { createSelector } from 'reselect';
import { State, User } from 'globalTypes';
import { getVoteRoundUsers } from 'state/voteRound/voteRoundStateGetters';
import { getSessionUserId } from 'state/session/sessionStateGetters';
import { findVoteValueById } from './utils';

export default () => createSelector<State, User[], string, string>(
  getVoteRoundUsers,
  getSessionUserId,
  findVoteValueById,
);
