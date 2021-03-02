import { createSelector } from 'reselect';
import { State, User } from '../../types/global';
import { calculateVoteAvg, divideUsersByRole, filterAndMapVotes } from './utils';
import { getVoteRoundUsers } from '../../state/voteRound/voteRoundStateGetters';
import { UserRole } from '../userRoles/types';
import { getSessionRoles, getSessionUseRoles } from '../../state/session/sessionStateGetters';

export default () => createSelector<State, boolean, User[], UserRole[], [string, string][]>(
  getSessionUseRoles,
  getVoteRoundUsers,
  getSessionRoles,
  (useRoles, users, roles) => {
    if (!useRoles) {
      return [];
    }

    const groups = divideUsersByRole(users, roles);

    return Object.entries(groups).map(([key, value]) =>
      [key, calculateVoteAvg(filterAndMapVotes(value))]);
  }
);
