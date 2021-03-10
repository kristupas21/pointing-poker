import { UserRole } from 'utils/userRoles/types';

export const withURF = (id: string) => `urf-${id}`;

export function mapRolesToFormData(roles: UserRole[]): Record<string, string> {
  return roles.reduce((acc, role) => ({
    ...acc,
    [withURF(role.id)]: role.name,
  }), {});
}
