import { v4 as uuid } from 'uuid';
import { User } from 'globalTypes';
import { PointValue } from 'utils/pointValues/types';
import { FIELD_PLACEHOLDER } from 'utils/form/constants';

export function createUser(props?: Partial<User>): User {
  const { id, name, role = '', isObserver = false, ...other } = props;

  return {
    id: id || uuid(),
    name,
    role,
    isObserver,
    ...other,
  };
}

export function createPointValue(props?: Partial<PointValue>): PointValue {
  const { id, value, pos, ...other } = props || {};

  return {
    id: id || FIELD_PLACEHOLDER,
    value: value || '',
    pos: pos || 0,
    ...other,
  };
}

export function normalizePointValues(points: PointValue[]): PointValue[] {
  const duplicates: string[] = [];
  const unique = points.filter((point, idx, arr) => {
    const value = `${point.value ?? ''}`;

    if (!value) {
      return false;
    }

    if (arr.some((f, i) => `${f.value}` === value && i !== idx)) {
      if (duplicates.includes(value)) {
        return false;
      }

      duplicates.push(value);
    }

    return true;
  });

  return unique.map((p, idx) => ({
    ...p,
    value: `${p.value}`,
    pos: idx,
  }));
}

export function removeRolePlaceholders(roles: string[]): string[] {
  return (roles || []).filter((r) => r && r !== FIELD_PLACEHOLDER);
}

export function removePointValuePlaceholders(points: PointValue[]): PointValue[] {
  return (points || []).filter((p) => p.id !== FIELD_PLACEHOLDER);
}
