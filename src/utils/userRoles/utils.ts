import { UserRole } from './types';

export function findRoleById(roles: UserRole[], id: string) {
  return (roles || []).find((r) => r.id === id);
}

export function findRoleMatchOnlyByName(roles: UserRole[], role: UserRole) {
  return (roles || []).find((r) => r.id !== role.id && r.name === role.name);
}
