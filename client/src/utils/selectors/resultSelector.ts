import { createSelector } from 'reselect';
import { State, User } from 'globalTypes';
import { getVoteRoundUsers } from 'state/voteRound/voteRoundStateGetters';
import { calcAverage, calcFixedNumber } from 'utils/mathOps';
import { filterAndMapVotes } from './utils';

export default () => createSelector<State, User[], string>(
  getVoteRoundUsers,
  (users) =>
    calcFixedNumber.ofTypeString(calcAverage(filterAndMapVotes(users)) || '0')
);
