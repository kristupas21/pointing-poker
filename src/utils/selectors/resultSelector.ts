import { createSelector } from 'reselect';
import { State, User } from 'types/global';
import { getVoteRoundUsers } from 'state/voteRound/voteRoundStateGetters';
import { calculateVoteAvg, filterAndMapVotes } from './utils';

export default () => createSelector<State, User[], string>(
  getVoteRoundUsers,
  (users) => calculateVoteAvg(filterAndMapVotes(users))
);
