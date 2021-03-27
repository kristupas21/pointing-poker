import { User } from 'globalTypes';

export interface VoteRoundState {
  currentTopic: string;
  users: User[];
  votesShown: boolean;
}
