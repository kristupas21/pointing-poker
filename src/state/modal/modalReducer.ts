import { ActionType, Reducer } from 'typesafe-actions';
import { ModalId, ModalState, ModalType } from './modalModel';
import { CLOSE_MODAL, OPEN_MODAL } from './modalConstants';

type Action = ActionType<typeof import('./modalActions')>;

type State = Readonly<ModalState>;

const initialState: State = {
  isOpen: false,
  contentProps: {},
  id: ModalId.Generic,
  type: ModalType.Default,
};

const modalReducer: Reducer<State, Action> = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        ...action.payload,
        isOpen: true,
      };
    case CLOSE_MODAL:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default modalReducer;
