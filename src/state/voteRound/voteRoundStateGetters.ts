import { State, User } from 'globalTypes';
import { findVoteValueById } from 'utils/selectors/utils';
import { VoteRoundState } from './voteRoundModel';

export const getVoteRoundUsers = (state: State): User[] => state.voteRound.users;

export const getVoteRoundState = (state: State): VoteRoundState => state.voteRound;

export const getVotesShownValue = (state: State): boolean => state.voteRound.votesShown;

export const getVoteValueByIdStateGetter = (id: string) => (state: State): string =>
  findVoteValueById(getVoteRoundUsers(state), id);
