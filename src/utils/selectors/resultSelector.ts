import { createSelector } from 'reselect';
import { State, User } from 'types/global';
import { getVoteRoundUsers } from 'state/voteRound/voteRoundStateGetters';
import { calcAverage } from 'utils/mathOps';
import { filterAndMapVotes } from './utils';

export default () => createSelector<State, User[], string>(
  getVoteRoundUsers,
  (users) => calcAverage(filterAndMapVotes(users))
);
