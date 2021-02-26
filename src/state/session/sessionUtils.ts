import { v4 as uuidv4 } from 'uuid';
import { CreateSessionFormData } from '../../containers/CreateSessionForm/CreateSessionForm';
import { JoinSessionParams } from './sessionTypes';
import { User } from '../../types/global';

export function createJoinSessionParams(formData: CreateSessionFormData, userId: string): JoinSessionParams {
  const { sessionId, name, isObserver, role } = formData;

  return {
    sessionId,
    isObserver,
    user: { id: userId, name, role, },
  };
}

export function createUser(props?: Partial<User>): User {
  return {
    id: uuidv4(),
    name: undefined,
    role: undefined,
    isObserver: false,
    ...props,
  };
}
