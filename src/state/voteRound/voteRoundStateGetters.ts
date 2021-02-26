import { State, User } from '../../types/global';

export const getVoteRoundUsers = (state: State): User[] =>
  state.voteRound.users;
