import { User } from '../../types/global';

export interface VoteOption {
  pos: number;
  value: string;
}

export interface SessionState {
  currentSessionId: string;
  user: User;
  voteOptions: VoteOption[];
}

export interface JoinSessionParams {
  sessionId: string;
  isObserver?: boolean;
  user: User;
}
