import { State, User } from 'globalTypes';
import { findVoteValueById } from 'utils/selectors/utils';

export const getVoteRoundUsers = (state: State): User[] => state.voteRound.users;

export const getVoteRoundTopic = (state: State): string => state.voteRound.currentTopic;

export const getVotesShownValue = (state: State): boolean => state.voteRound.votesShown;

export const getVoteRoundPristine = (state: State): boolean => state.voteRound.isPristine;

export const getVoteValueByIdStateGetter = (id: string) => (state: State): string =>
  findVoteValueById(getVoteRoundUsers(state), id);
