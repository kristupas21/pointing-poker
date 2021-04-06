import { ActionType, Reducer } from 'typesafe-actions';
import { AppRoute } from 'utils/routes';
import { ErrorState } from './errorModel';
import { SET_ERROR_STATE } from './errorConstants';

type Action = ActionType<typeof import('./errorActions')>;

type State = Readonly<ErrorState>;

const initialState: State = {
  errorId: null,
  errorPayload: undefined,
  redirectPath: AppRoute.Base,
};

const errorReducer: Reducer<State, Action> = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERROR_STATE:
      return {
        ...state,
        ...(action.payload ? action.payload : initialState),
      };
    default:
      return state;
  }
};

export default errorReducer;
