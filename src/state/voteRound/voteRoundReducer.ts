import { ActionType, Reducer } from 'typesafe-actions';
import { VoteRoundState } from './voteRoundTypes';
import {
  ADD_USER_TO_VOTE_ROUND,
  CLEAR_VOTES,
  HIDE_VOTES,
  MOCK_USERS,
  SET_USER_VOTE_VALUE,
  SHOW_VOTES
} from './voteRoundConstants';

type Action = ActionType<typeof import('./voteRoundActions')>;

type State = Readonly<VoteRoundState>;

const initialState: State = {
  users: MOCK_USERS,
  votesShown: false,
};

const voteRoundReducer: Reducer<State, Action> = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_TO_VOTE_ROUND:
      return {
        ...state,
        users: [
          ...state.users,
          action.payload,
        ],
      };
    case SET_USER_VOTE_VALUE: {
      const { userId, voteValue } = action.payload;

      return {
        ...state,
        users: state.users.map((user) =>
          ({
            ...user,
            ...(userId === user.id && { voteValue }) }))
      };
    }
    case CLEAR_VOTES:
      return {
        ...state,
        votesShown: false,
        users: state.users.map((user) =>
          ({ ...user, voteValue: null })),
      };
    case SHOW_VOTES:
      return {
        ...state,
        votesShown: true,
      };
    case HIDE_VOTES:
      return {
        ...state,
        votesShown: false,
      };
    default:
      return state;
  }
};

export default voteRoundReducer;
