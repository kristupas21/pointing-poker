import { v4 as uuidv4 } from 'uuid';
import { User } from 'globalTypes';
import { PointValue } from 'utils/pointValues/types';
import { FIELD_ID_PLACEHOLDER, FIELD_VALUE_PLACEHOLDER } from '../../utils/form/constants';

export function createUser(props?: Partial<User>): User {
  const { id, name, role = '', isObserver = false, ...other } = props;

  return {
    id: id || uuidv4(),
    name,
    role,
    isObserver,
    ...other,
  };
}

export function createPointValue(props: Partial<PointValue>): PointValue {
  const { id, value, pos, ...other } = props;

  return {
    id: id || FIELD_ID_PLACEHOLDER,
    value: value || '',
    pos,
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

export function removeEmptyRoles(roles: string[]): string[] {
  return (roles || []).filter((r) => r && r !== FIELD_VALUE_PLACEHOLDER);
}
