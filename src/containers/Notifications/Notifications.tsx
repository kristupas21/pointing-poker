import React from 'react';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { getNotifications } from 'state/notifications/notificationsStateGetters';
import Notification from 'components/Notification';
import { useMappedDispatch } from 'utils/customHooks';
import {
  clearNotification as clearNotificationAction,
} from 'state/notifications/notificationsActions';
import styles from './Notifications.module.scss';

const cx = classNames.bind(styles);

const actions = {
  clearNotification: clearNotificationAction,
};

const Notifications = () => {
  const items = useSelector(getNotifications);
  const { clearNotification } = useMappedDispatch(actions);

  return (
    <div className={cx('notifications')}>
      <AnimatePresence initial={false}>
        {items.map((item) => (
          <Notification
            {...item}
            key={item.id}
            onCloseClick={() => clearNotification(item.id)}
          >
            {item.content}
          </Notification>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Notifications;
