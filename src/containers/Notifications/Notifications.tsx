import React from 'react';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import styles from './Notifications.module.scss';
import { getNotifications } from '../../state/notifications/notificationsStateGetters';
import Notification from '../../components/Notification';
import { useMappedDispatch, useText } from '../../utils/customHooks';
import { clearNotification as clearNotificationAction } from '../../state/notifications/notificationsActions';

const cx = classNames.bind(styles);

const mapDispatchToProps = {
  clearNotification: clearNotificationAction,
};

const Notifications = () => {
  const items = useSelector(getNotifications);
  const { clearNotification } = useMappedDispatch(mapDispatchToProps);
  const text = useText();

  return (
    <div className={cx('notifications')}>
      <AnimatePresence initial={false}>
        {items.map((item) => (
          <Notification
            {...item}
            key={item.id}
            onCloseClick={() => clearNotification(item.id)}
          >
            {text(item.text)}
          </Notification>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Notifications;
