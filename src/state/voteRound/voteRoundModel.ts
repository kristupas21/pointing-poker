import { User } from 'types/global';

export interface VoteRoundState {
  currentTopic: string;
  users: User[];
  votesShown: boolean;
}
