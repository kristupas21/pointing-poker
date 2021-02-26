import { User } from '../../types/global';

export interface VoteOption {
  pos: number;
  value: string;
}

export interface SessionState {
  currentSessionId: string;
  useRoles: boolean;
  user: User;
  voteOptions: VoteOption[];
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
