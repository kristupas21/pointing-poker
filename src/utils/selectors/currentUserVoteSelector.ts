import { createSelector } from 'reselect';
import { State, User } from 'globalTypes';
import { getVoteRoundUsers } from 'state/voteRound/voteRoundStateGetters';
import { getSessionUserId } from 'state/session/sessionStateGetters';

export default () => createSelector<State, User[], string, string>(
  getVoteRoundUsers,
  getSessionUserId,
  (users, userId) =>
    (users.find((u) => u.id === userId) || {}).voteValue
);
