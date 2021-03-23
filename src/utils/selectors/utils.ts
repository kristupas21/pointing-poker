import { User } from 'types/global';
import { UserRole } from 'utils/userRoles/types';
import { findRoleById } from '../userRoles/utils';

export function filterAndMapVotes(users: User[]): number[] {
  return users
    .filter((u) => u.voteValue && !Number.isNaN(Number(u.voteValue)))
    .map((u) => Number(u.voteValue));
}

export function divideUsersByRole(users: User[], roles: UserRole[]): { [role: string]: User[] } {
  return users.reduce((acc, user) => {
    if (user.isObserver) {
      return acc;
    }

    const { name } = findRoleById(roles, user.role?.id) || {};

    return ({
      ...acc,
      ...(name && {
        [name]: [...(acc[name] || []), user],
      })
    });
  }, {});
}
