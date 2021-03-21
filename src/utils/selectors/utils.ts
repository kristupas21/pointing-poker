import { User } from 'types/global';
import { UserRole } from 'utils/userRoles/types';

export function filterAndMapVotes(users: User[]): number[] {
  return users
    .filter((u) => u.voteValue && !Number.isNaN(Number(u.voteValue)))
    .map((u) => Number(u.voteValue));
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
