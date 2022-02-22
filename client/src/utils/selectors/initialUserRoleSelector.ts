import { createSelector } from 'reselect';
import { State } from 'globalTypes';
import { getSessionRoles, getSessionUserRole } from 'state/session/sessionStateGetters';
import { removeRolePlaceholders } from 'state/session/sessionUtils';

export default () => createSelector<State, string, string[], string>(
  getSessionUserRole,
  getSessionRoles,
  (role, roles) => (role && removeRolePlaceholders(roles).includes(role) ? role : '')
);
