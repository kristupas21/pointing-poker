import { createSelector } from 'reselect';
import { State, User } from '../../types/global';
import { calculateVoteAvg, filterAndMapVotes } from './utils';
import { getVoteRoundUsers } from '../../state/voteRound/voteRoundStateGetters';

export default () => createSelector<State, User[], string>(
  getVoteRoundUsers,
  (users) => calculateVoteAvg(filterAndMapVotes(users))
);
