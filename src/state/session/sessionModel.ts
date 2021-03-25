import { User } from 'types/global';
import { PointValue } from 'utils/pointValues/types';
import { UserRole } from 'utils/userRoles/types';

export interface SessionState {
  currentSessionId: string;
  useRoles: boolean;
  user: User;
  pointValues: PointValue[];
  roles: UserRole[];
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
  roles: UserRole[];
}

export interface StartSessionResponse {
  data: {
    sessionId: string;
  };
}

export interface JoinSessionResponse {
  data: {
    sessionId: string,
  }
}

export interface LoadSessionResponse {
  data: {
    session: {
      useRoles: boolean,
      users: User[],
      showVotes: boolean,
      currentTopic: string,
      pointValues: PointValue[],
      roles: UserRole[],
    }
  }
}
