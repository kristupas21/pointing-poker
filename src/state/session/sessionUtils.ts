import { v4 as uuidv4 } from 'uuid';
import { User } from '../../types/global';
import { PointValue } from '../../utils/pointValues/types';

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
  const { id, value, pos } = props;

  return {
    id: id || uuidv4(),
    value: value || '',
    pos,
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
