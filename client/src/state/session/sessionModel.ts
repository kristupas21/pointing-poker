import { User } from 'globalTypes';
import { AxiosResponse } from 'axios';
import { PointValue } from 'utils/pointValues/types';

export interface Session {
  createdBy: string;
  currentTopic?: string;
  pointValues: PointValue[];
  roles: string[];
  showVotes: boolean;
  usePermissions: boolean;
  useRoles: boolean;
  users: User[];
}

export interface SessionState {
  currentSessionId: string;
  currentInfoId: string;
  isCreatedByMe: boolean;
  pointValues: PointValue[];
  roles: string[];
  usePermissions: boolean;
  useRoles: boolean;
  user: User;
}

export interface JoinSessionParams {
  isObserver?: boolean;
  sessionId: string;
  user: User;
}

export interface LoadSessionParams {
  sessionId: string;
  userId: string;
}

export interface StartSessionParams {
  pointValues: PointValue[];
  roles: string[];
  usePermissions: boolean;
  user: User;
  useRoles: boolean;
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
