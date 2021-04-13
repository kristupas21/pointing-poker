import { User } from 'globalTypes';

export interface VoteRoundState {
  currentTopic: string;
  isPristine?: boolean;
  users: User[];
  votesShown: boolean;
}
