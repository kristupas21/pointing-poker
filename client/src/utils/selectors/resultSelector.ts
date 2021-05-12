import { createSelector } from 'reselect';
import { State, User } from 'globalTypes';
import { getVoteRoundUsers } from 'state/voteRound/voteRoundStateGetters';
import { calcAverage, calcFixedNumber } from 'utils/mathOps';
import { filterAndMapVotes } from './utils';

export default () => createSelector<State, User[], string>(
  getVoteRoundUsers,
  (users) => {
    const votesArray = filterAndMapVotes(users);
    const average = calcAverage(votesArray) || '0';

    return calcFixedNumber.ofTypeString(average);
  }
);
