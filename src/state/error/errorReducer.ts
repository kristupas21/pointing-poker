import { ActionType, Reducer } from 'typesafe-actions';
import { ErrorState } from './errorTypes';
import ROUTES from '../../constants/routes';
import { SET_ERROR_STATE } from './errorConstants';

type Action = ActionType<typeof import('./errorActions')>;

type State = Readonly<ErrorState>;

const initialState: State = {
  errorId: null,
  redirectPath: ROUTES.BASE,
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