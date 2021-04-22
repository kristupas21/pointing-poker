import { createSelector } from 'reselect';
import { getVoteRoundValidUsers } from 'state/voteRound/voteRoundStateGetters';
import { State, User } from 'globalTypes';
import { calcFixedNumber } from 'utils/mathOps';

export default () => createSelector<State, User[], number>(
  getVoteRoundValidUsers,
  (users) => {
    if (!users.length) {
      return 0;
    }

    const fraction = users
      .filter((u) => u.voteValue != null).length / users.length;

    return calcFixedNumber.ofTypeNumber(fraction * 100);
  }
);
