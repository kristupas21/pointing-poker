import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import { motion } from 'framer-motion';
import styles from './Notification.module.scss';
import Button from '../Button';
import ProgressBar from '../ProgressBar';
import { AppNotification } from '../../state/notifications/notificationsModel';
import { LIFESPAN_TO_INTERVAL_MAP, notificationMotionProps } from './constants';

const cx = classNames.bind(styles);

export interface NotificationProps extends AppNotification {
  onCloseClick?: () => void;
}

let timeout: ReturnType<typeof setTimeout>;

const Notification: React.FC<NotificationProps> = (props) => {
  const { lifespan, children, onCloseClick, id } = props;
  const interval = LIFESPAN_TO_INTERVAL_MAP[lifespan];

  useEffect(() => {
    if (onCloseClick && lifespan) {
      timeout = setTimeout(onCloseClick, interval);
    }

    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div
      className={cx('notification')}
      key={id}
      {...notificationMotionProps}
    >
      <div className={cx('notification__content')}>
        {children}
      </div>
      {lifespan && <ProgressBar interval={interval} />}
      <Button
        onClick={onCloseClick}
        className={cx('notification__close-btn')}
      >
        <span aria-labelledby="" role="img">✖️</span>
      </Button>
    </motion.div>
  );
};

export default Notification;
