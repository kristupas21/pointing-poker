import { createSelector } from 'reselect';
import { State, User } from 'globalTypes';
import { getVoteRoundUsers } from 'state/voteRound/voteRoundStateGetters';
import { UserRole } from 'utils/userRoles/types';
import { getSessionRoles, getSessionUseRoles } from 'state/session/sessionStateGetters';
import { calcAverage } from 'utils/mathOps';
import { divideUsersByRole, filterAndMapVotes } from './utils';

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
      [key, calcAverage(filterAndMapVotes(value))]);
  }
);
