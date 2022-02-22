import { createSelector } from 'reselect';
import { State } from 'globalTypes';
import { getSessionRoles } from 'state/session/sessionStateGetters';
import { removeRolePlaceholders } from 'state/session/sessionUtils';
import { sortAlphabetically } from 'utils/common';

export default () => createSelector<State, string[], string[]>(
  getSessionRoles,
  (roles) => sortAlphabetically(removeRolePlaceholders(roles))
);
