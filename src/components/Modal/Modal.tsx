import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import ReactModal from 'react-modal';
import classNames from 'classnames/bind';
import { State } from '../../types/global';
import { ModalType } from '../../state/modal/modalTypes';
import styles from './Modal.module.scss';
import { closeModal as closeModalAction } from '../../state/modal/modalActions';
import getModalContent from '../../constants/modalContents';
import Notification, { NotificationProps } from '../Notification';
import DynamicWrapper, { DynamicWrapperItem } from '../DynamicWrapper';

const cx = classNames.bind(styles);
const intervalMs = 5000;

let timeout: ReturnType<typeof setTimeout>;

type ReduxProps = ConnectedProps<typeof connector>;
type Props = ReduxProps;

const Modal: React.FC<Props> = (props) => {
  const { isOpen, type, id, contentProps, closeModal } = props;
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

ReactModal.setAppElement('#root');

const mapStateToProps = (state: State) => ({ ...state.modal });

const mapDispatchToProps = {
  closeModal: closeModalAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Modal);
