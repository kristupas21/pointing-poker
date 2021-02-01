import { User } from '../../types/global';

export interface VoteOption {
  pos: number;
  value: string;
}

export interface SessionState {
  sessionId: string;
  user: User;
  voteOptions: VoteOption[];
}
