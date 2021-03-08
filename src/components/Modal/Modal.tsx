import React from 'react';
import ReactModal, { setAppElement } from 'react-modal';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import { closeModal as closeModalAction } from '../../state/modal/modalActions';
import getModalContent from '../../constants/modalContents';
import { getModalState } from '../../state/modal/modalStateGetters';
import { useMappedDispatch } from '../../utils/customHooks';

const cx = classNames.bind(styles);

const mapDispatchToProps = {
  closeModal: closeModalAction,
};

const Modal: React.FC = () => {
  const { isOpen, id, contentProps } = useSelector(getModalState);
  const { closeModal } = useMappedDispatch(mapDispatchToProps);
  const Content = getModalContent(id);

  return (
    <ReactModal
      isOpen={isOpen}
      shouldCloseOnOverlayClick
      className={cx('content')}
      overlayClassName={cx('overlay')}
      shouldCloseOnEsc
      onRequestClose={closeModal}
    >
      <Content {...contentProps} closeModal={closeModal} />
    </ReactModal>
  );
};

(() => setAppElement('#root'))();

export default Modal;
