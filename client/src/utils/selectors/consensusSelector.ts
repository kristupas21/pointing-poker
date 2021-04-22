import { createSelector } from 'reselect';
import { State, User } from 'globalTypes';
import { getVoteRoundValidUsers } from 'state/voteRound/voteRoundStateGetters';

export default () => createSelector<State, User[], boolean>(
  getVoteRoundValidUsers,
  (users) => {
    if (users.length <= 1) {
      return false;
    }

    return users.every((user, idx, arr) =>
      user.voteValue != null && user.voteValue === arr[0].voteValue);
  }
);
