import { ActionType, Reducer } from 'typesafe-actions';
import { FormState } from './formModel';
import { SET_FORM_LOADING } from './formConstants';

type Action = ActionType<typeof import('./formActions')>;

type State = Readonly<FormState>;

const initialState: State = {
  isLoading: false,
};

const formReducer: Reducer<State, Action> = (state = initialState, action) => {
  switch (action.type) {
    case SET_FORM_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default formReducer;
