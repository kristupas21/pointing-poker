import { User } from '../../types/global';
import { PointValueLib } from '../../utils/pointValues/types';

export interface SessionState {
  currentSessionId: string;
  useRoles: boolean;
  user: User;
  pointValueLib: PointValueLib;
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
  user: User;
  useRoles: boolean;
}
