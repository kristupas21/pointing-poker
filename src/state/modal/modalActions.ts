import { action } from 'typesafe-actions';
import { CLOSE_MODAL, OPEN_MODAL } from './modalConstants';
import { ModalId, ModalType } from './modalModel';

export const openModal = (id: ModalId, type = ModalType.Default, contentProps = {}) =>
  action(OPEN_MODAL, { id, type, contentProps });

export const closeModal = () => action(CLOSE_MODAL);
