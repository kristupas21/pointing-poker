export const withURF = (id: string) => `urf-${id}`;

export function mapRolesToFormData(roles: string[]): Record<string, string> {
  return roles.reduce((acc, role) => ({
    ...acc,
    [withURF(role)]: role,
  }), {});
}
