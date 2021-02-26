import { createSelector } from 'reselect';
import { State, User } from '../../types/global';
import { calculateVoteAvg, divideUsersByRole, filterAndMapVotes } from './utils';
import { getVoteRoundUsers } from '../../state/voteRound/voteRoundStateGetters';

export default () => createSelector<State, User[], [string, string][]>(
  getVoteRoundUsers,
  (users) => {
    const groups = divideUsersByRole(users);

    return Object.entries(groups).map(([key, value]) =>
      [key, calculateVoteAvg(filterAndMapVotes(value))]);
  }
);
