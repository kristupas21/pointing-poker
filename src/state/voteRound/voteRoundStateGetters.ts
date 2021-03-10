import { State, User } from 'types/global';
import { VoteRoundState } from './voteRoundModel';

export const getVoteRoundUsers = (state: State): User[] => state.voteRound.users;

export const getVoteRoundState = (state: State): VoteRoundState => state.voteRound;

export const getVotesShownValue = (state: State): boolean => state.voteRound.votesShown;
