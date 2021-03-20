import { v4 as uuidv4 } from 'uuid';
import uniqBy from 'lodash/uniqBy';
import { User } from 'types/global';
import { PointValue } from 'utils/pointValues/types';
import { UserRole } from 'utils/userRoles/types';

export function createUser(props?: Partial<User>): User {
  const { id, ...other } = props;

  return {
    id: id || uuidv4(),
    name: undefined,
    role: undefined,
    isObserver: false,
    ...other,
  };
}

export function createPointValue(props: Partial<PointValue>): PointValue {
  const { id, value, pos, ...other } = props;

  return {
    id: id || uuidv4(),
    value: value || '',
    pos,
    ...other,
  };
}

export function createRole(): UserRole {
  return {
    id: uuidv4(),
    name: '',
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

export function removeEmptyRoles(roles: UserRole[]): UserRole[] {
  return uniqBy((roles || []).filter((r) => r.name), 'id');
}
