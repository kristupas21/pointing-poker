import { createSelector } from 'reselect';
import { State } from 'globalTypes';
import { getNormalizedSessionRoles, getSessionUserRole } from 'state/session/sessionStateGetters';

export default () => createSelector<State, string, string[], string>(
  getSessionUserRole,
  getNormalizedSessionRoles,
  (role, roles) => (role && roles.includes(role) ? role : '')
);
