import { State } from '../../types/global';
import { ModalState } from './modalTypes';

export const getModalState = (state: State): ModalState => state.modal;
