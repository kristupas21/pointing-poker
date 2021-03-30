import { User } from 'globalTypes';
import { AxiosResponse } from 'axios';
import { PointValue } from 'utils/pointValues/types';
import { UserRole } from 'utils/userRoles/types';

export interface Session {
  useRoles: boolean;
  users: User[];
  showVotes: boolean;
  currentTopic?: string;
  pointValues: PointValue[];
  roles: UserRole[];
}

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

export type StartSessionResponse = AxiosResponse<{
  sessionId: string;
}>

export type JoinSessionResponse = AxiosResponse<{
  sessionId: string,
}>

export type LoadSessionResponse = AxiosResponse<{
  session: Session;
}>

export type SessionInfoResponse = AxiosResponse<{
  session: Session;
}>
