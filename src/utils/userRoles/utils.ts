import { UserRole } from './types';

export function findRoleById(roles: UserRole[], id: string) {
  return (roles || []).find((r) => r.id === id);
}

export function findRoleByName(roles: UserRole[], name: string) {
  return (roles || []).find((r) => r.name === name);
}
