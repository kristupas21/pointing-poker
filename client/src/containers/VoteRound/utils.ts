import { User } from 'globalTypes';
import sortBy from 'lodash/sortBy';

export function sortUsersByName(users: User[]): User[] {
  const sortFn = (user: User) => user.name.toLocaleLowerCase();
  return sortBy(users, sortFn);
}
