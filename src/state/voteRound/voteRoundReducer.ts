import { ActionType, Reducer } from 'typesafe-actions';
import { VoteRoundState } from './voteRoundModel';
import {
  ADD_USER_TO_VOTE_ROUND,
  CLEAR_VOTE_ROUND_STATE,
  HIDE_VOTES,
  INIT_VOTE_ROUND,
  REMOVE_USER_FROM_VOTE_ROUND,
  RESET_VOTE_ROUND,
  SET_USER_VOTE_VALUE,
  SET_VOTE_ROUND_TOPIC,
  SHOW_VOTES
} from './voteRoundConstants';

type Action = ActionType<typeof import('./voteRoundActions')>;

type State = Readonly<VoteRoundState>;

const initialState: State = {
  currentTopic: '',
  users: [],
  votesShown: false,
};

const voteRoundReducer: Reducer<State, Action> = (state = initialState, action) => {
  switch (action.type) {
    case INIT_VOTE_ROUND:
      return {
        ...initialState,
        ...action.payload,
      };
    case ADD_USER_TO_VOTE_ROUND:
      return {
        ...state,
        users: [
          ...state.users.filter((u) => u.id !== action.payload.id),
          action.payload,
        ],
      };
    case REMOVE_USER_FROM_VOTE_ROUND:
      return {
        ...state,
        users: state.users.filter((u) => u.id !== action.payload),
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
    case RESET_VOTE_ROUND:
      return {
        ...state,
        currentTopic: '',
        votesShown: false,
        users: state.users.map((user) =>
          ({ ...user, voteValue: null })),
      };
    case SET_VOTE_ROUND_TOPIC:
      return {
        ...state,
        currentTopic: action.payload,
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
    case CLEAR_VOTE_ROUND_STATE:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default voteRoundReducer;
