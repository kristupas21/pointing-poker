import { User } from '../../types/global';
import { PointValue } from '../../utils/pointValues/types';

export interface SessionState {
  currentSessionId: string;
  useRoles: boolean;
  user: User;
  pointValues: PointValue[];
}

export interface JoinSessionParams {
  sessionId: string;
  isObserver?: boolean;
  user: User;
}

export interface LoadSessionParams {
  sessionId: string;
  userId: string;
}

export interface StartSessionParams {
  pointValues: PointValue[];
  user: User;
  useRoles: boolean;
}
