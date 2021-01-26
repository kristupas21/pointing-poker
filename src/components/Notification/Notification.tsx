import React from 'react';
import classNames from 'classnames/bind';
import styles from './Notification.module.scss';
import Button from '../Button';
import ProgressBar, { ProgressBarInterval } from '../ProgressBar';

const cx = classNames.bind(styles);

export interface NotificationProps {
  autoCloseIn?: ProgressBarInterval;
  onCloseClick?: () => void;
}

const Notification: React.FC<NotificationProps> = (props) => {
  const { autoCloseIn, children, onCloseClick } = props;

  return (
    <div className={cx('notification')}>
      {children}
      {autoCloseIn && <ProgressBar interval={autoCloseIn} />}
      <Button onClick={onCloseClick} className={cx('notification__close-btn')}>X</Button>
    </div>
  );
};

export default Notification;
