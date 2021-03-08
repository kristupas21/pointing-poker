import { action } from 'typesafe-actions';
import { CLOSE_MODAL, OPEN_MODAL } from './modalConstants';
import { ModalId } from './modalModel';

export const openModal = (id: ModalId, contentProps = {}) =>
  action(OPEN_MODAL, { id, contentProps });

export const closeModal = () => action(CLOSE_MODAL);
