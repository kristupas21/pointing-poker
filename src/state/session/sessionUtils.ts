import { v4 as uuidv4 } from 'uuid';
import uniqBy from 'lodash/uniqBy';
import { User } from '../../types/global';
import { PointValue } from '../../utils/pointValues/types';
import { UserRole } from '../../utils/userRoles/types';

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

export function removeEmptyPointValues(points: PointValue[]): PointValue[] {
  return points
    .filter((p) => p.value)
    .map((p, idx) => ({
      ...p,
      pos: idx,
    }));
}

export function removeEmptyRoles(roles: UserRole[]): UserRole[] {
  return uniqBy((roles || []).filter((r) => r.name), 'id');
}
