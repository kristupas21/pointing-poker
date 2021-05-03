import { FIELD_PLACEHOLDER } from '../../utils/form/constants';

export const withURF = (id: string) => `urf-${id}`;

export function mapRolesToFormData(roles: string[]): Record<string, string> {
  return roles.reduce((acc, role) => ({
    ...acc,
    [withURF(role)]: role,
  }), {});
}

export function focusRolePlaceholder(): void {
  const element = document.getElementById(withURF(FIELD_PLACEHOLDER));

  if (element) {
    element.focus();
  }
}
