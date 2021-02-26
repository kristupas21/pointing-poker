import sum from 'lodash/sum';
import { User } from '../../types/global';

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

export function divideUsersByRole(users: User[]): { [role: string]: User[] } {
  return users.reduce((acc, user) => ({
    ...acc,
    [user.role]: [
      ...(acc[user.role] || []),
      user,
    ],
  }), {});
}
