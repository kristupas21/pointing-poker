import { createSelector } from 'reselect';
import { State, User } from 'globalTypes';
import { getSessionUsePermissions, getSessionUserId } from 'state/session/sessionStateGetters';
import { getVoteRoundUsers } from 'state/voteRound/voteRoundStateGetters';
import { findHasPermissionById } from './utils';

export default () => createSelector<State, boolean, User[], string, boolean>(
  getSessionUsePermissions,
  getVoteRoundUsers,
  getSessionUserId,
  (usePermissions, users, userId) =>
    (usePermissions ? findHasPermissionById(users, userId) : true)
);
