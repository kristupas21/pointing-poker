import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import { getVoteRoundUsers } from 'state/voteRound/voteRoundStateGetters';
import { State, User } from 'globalTypes';
import { calcFixedNumber } from '../mathOps';

export default () => createSelector<State, User[], number>(
  getVoteRoundUsers,
  (users) => {
    const validUsers = (users || []).filter((u) => !u.isObserver);

    if (isEmpty(validUsers)) {
      return 0;
    }

    const fraction =
        validUsers.filter((u) => u.voteValue != null).length / validUsers.length;

    return calcFixedNumber.ofTypeNumber(fraction * 100);
  }
);
