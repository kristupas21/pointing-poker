import { State } from 'types/global';
import { ModalState } from './modalModel';

export const getModalState = (state: State): ModalState => state.modal;
