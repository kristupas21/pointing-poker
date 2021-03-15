import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import { motion } from 'framer-motion';
import Button from 'components/Button';
import ProgressBar from 'components/ProgressBar';
import { AppNotification } from 'state/notifications/notificationsModel';
import animations from 'utils/animations';
import { LIFESPAN_TO_INTERVAL_MAP } from './constants';
import styles from './Notification.module.scss';

const cx = classNames.bind(styles);

export interface NotificationProps extends AppNotification {
  onCloseClick?: () => void;
}

let timeout: ReturnType<typeof setTimeout>;

const Notification: React.FC<NotificationProps> = (props) => {
  const { lifespan, children, onCloseClick, id } = props;
  const interval = lifespan ? LIFESPAN_TO_INTERVAL_MAP[lifespan] : 0;

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
      {...animations.slideFromRight}
    >
      <div className={cx('notification__content')}>
        {children}
      </div>
      {interval && <ProgressBar interval={interval} />}
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
