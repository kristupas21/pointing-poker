import { User } from 'globalTypes';

export function filterAndMapVotes(users: User[]): number[] {
  return users
    .filter((u) => u.voteValue && !Number.isNaN(Number(u.voteValue)))
    .map((u) => Number(u.voteValue));
}

export function divideUsersByRole(users: User[], roles: string[]): { [role: string]: User[] } {
  return users.reduce((acc, user) => {
    if (user.isObserver) {
      return acc;
    }

    const name = (roles || []).find((r) => r === user.role);

    return ({
      ...acc,
      ...(name && {
        [name]: [...(acc[name] || []), user],
      })
    });
  }, {});
}

function findUserById(users: User[], userId: string): User {
  return users.find((u) => u.id === userId);
}

export function findVoteValueById(users: User[], userId: string): string {
  return findUserById(users, userId)?.voteValue;
}

export function findSessionControlPermissionById(users: User[], userId: string): boolean {
  return findUserById(users, userId)?.sessionControlPermission;
}
