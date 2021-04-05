import { User } from 'globalTypes';
import { AxiosResponse } from 'axios';
import { PointValue } from 'utils/pointValues/types';

export interface Session {
  createdBy: string;
  currentTopic?: string;
  pointValues: PointValue[];
  roles: string[];
  showVotes: boolean;
  useRoles: boolean;
  usePermissions: boolean;
  users: User[];
}

export interface SessionState {
  currentSessionId: string;
  isFormLoading: boolean;
  pointValues: PointValue[];
  roles: string[];
  user: User;
  useRoles: boolean;
  usePermissions: boolean;
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
  roles: string[];
}

export type StartSessionResponse = AxiosResponse<{
  sessionId: string;
}>

export type JoinSessionResponse = AxiosResponse<{
  sessionId: string,
  user: User;
}>

export type LoadSessionResponse = AxiosResponse<{
  session: Session;
}>

export type SessionInfoResponse = AxiosResponse<{
  session: Session;
}>
