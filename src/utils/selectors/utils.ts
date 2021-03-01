import sum from 'lodash/sum';
import { User } from '../../types/global';
import { UserRole } from '../userRoles/types';

export function filterAndMapVotes(users: User[]): number[] {
  return users
    .filter((u) => u.voteValue && !Number.isNaN(Number(u.voteValue)))
    .map((u) => Number(u.voteValue));
}

export function calculateVoteAvg(values: number[]): string {
  if (!values.length) {
    return null;
  }

  return (sum(values) / values.length).toString();
}

export function divideUsersByRole(users: User[], roles: UserRole[]): { [role: string]: User[] } {
  const findRole = (id: string) =>
    roles.find((r) => r.id === id).name;

  return users.reduce((acc, user) => {
    if (user.isObserver) {
      return acc;
    }

    const roleName = findRole(user.role);

    return ({
      ...acc,
      [roleName]: [
        ...(acc[roleName] || []),
        user,
      ],
    });
  }, {});
}
