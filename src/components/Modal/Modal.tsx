import React, { useEffect } from 'react';
import ReactModal, { setAppElement } from 'react-modal';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { ModalType } from '../../state/modal/modalModel';
import styles from './Modal.module.scss';
import { closeModal as closeModalAction } from '../../state/modal/modalActions';
import getModalContent from '../../constants/modalContents';
import Notification, { NotificationProps } from '../Notification';
import DynamicWrapper, { DynamicWrapperItem } from '../DynamicWrapper';
import { getModalState } from '../../state/modal/modalStateGetters';
import { useMappedDispatch } from '../../utils/customHooks';

const cx = classNames.bind(styles);
const intervalMs = 5000;

let timeout: ReturnType<typeof setTimeout>;

const mapDispatchToProps = {
  closeModal: closeModalAction,
};

const Modal: React.FC = () => {
  const { isOpen, type, id, contentProps } = useSelector(getModalState);
  const { closeModal } = useMappedDispatch(mapDispatchToProps);
  const isNotification = type === ModalType.Notification;
  const Content = getModalContent(id);

  const notificationWrapper: DynamicWrapperItem<NotificationProps> = {
    show: isNotification,
    Component: Notification,
    componentProps: { autoCloseIn: intervalMs, onCloseClick: closeModal },
  };

  useEffect(() => {
    clearTimeout(timeout);

    if (isOpen && isNotification) {
      timeout = setTimeout(closeModal, intervalMs);
    }
  }, [isOpen, id]);

  return (
    <ReactModal
      isOpen={isOpen}
      shouldCloseOnOverlayClick={isNotification}
      className={cx('content', `content--${type}`)}
      overlayClassName={cx('overlay')}
      shouldCloseOnEsc
      onRequestClose={closeModal}
    >
      <DynamicWrapper items={[notificationWrapper]}>
        <Content {...contentProps} closeModal={closeModal} />
      </DynamicWrapper>
    </ReactModal>
  );
};

(() => setAppElement('#root'))();

export default Modal;
