import React from 'react';
import { useSelector } from 'react-redux';
import { getSessionCurrentId, getSessionUser } from 'state/session/sessionStateGetters';
import { pushNotification as pushNotificationAction } from 'state/notifications/notificationsActions';
import classNames from 'classnames/bind';
import Button from 'components/Button';
import { setAppSidebarOpen } from 'state/app/appActions';
import { useMappedDispatch, useText } from 'utils/customHooks';
import renderNotification, { NotificationContent } from 'utils/notificationContent';
import { copyToClipboard } from 'utils/commands';
import styles from './UserSettingsOpener.module.scss';

const cx = classNames.bind(styles);

const actions = {
  setSidebarOpen: setAppSidebarOpen,
  pushNotification: pushNotificationAction,
};

const UserSettingsOpener: React.FC = () => {
  const { name } = useSelector(getSessionUser);
  const { setSidebarOpen, pushNotification } = useMappedDispatch(actions);
  const text = useText();
  const currentSessionId = useSelector(getSessionCurrentId);
  const char = name.slice(0, 1).toLocaleUpperCase();

  const handleCopyClick = () => {
    copyToClipboard(currentSessionId);
    pushNotification(renderNotification(NotificationContent.SessionCopy));
  };

  return (
    <div className={cx('opener')}>
      <div
        className={cx('opener__session-info')}
        onClick={handleCopyClick}
        role="button"
        onKeyDown={undefined}
        tabIndex={-1}
      >
        <div className={cx('opener__session-text')}>{text('global.session')}</div>
        <div className={cx('opener__session-id')}>{currentSessionId}</div>
      </div>
      <Button
        className={cx('opener__user-button')}
        onClick={() => setSidebarOpen(true)}
      >
        {char}
      </Button>
    </div>
  );
};

export default UserSettingsOpener;
