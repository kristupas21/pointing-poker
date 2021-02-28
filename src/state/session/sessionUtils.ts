import { v4 as uuidv4 } from 'uuid';
import { User } from '../../types/global';

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
