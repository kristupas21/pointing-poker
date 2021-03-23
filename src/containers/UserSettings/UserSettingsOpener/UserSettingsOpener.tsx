import React from 'react';
import { useSelector } from 'react-redux';
import { getSessionCurrentId, getSessionUserAvatarId } from 'state/session/sessionStateGetters';
import { pushNotification as pushNotificationAction } from 'state/notifications/notificationsActions';
import classNames from 'classnames/bind';
import Button, { ButtonVariant } from 'components/Button';
import { setAppSidebarOpen } from 'state/app/appActions';
import { useMappedDispatch, useText } from 'utils/customHooks';
import renderNotification, { NotificationContent } from 'utils/notificationContent';
import { copyToClipboard } from 'utils/commands';
import Avatar from 'components/Avatar';
import styles from './UserSettingsOpener.module.scss';

const cx = classNames.bind(styles);

const actions = {
  setSidebarOpen: setAppSidebarOpen,
  pushNotification: pushNotificationAction,
};

const UserSettingsOpener: React.FC = () => {
  const { setSidebarOpen, pushNotification } = useMappedDispatch(actions);
  const avatarId = useSelector(getSessionUserAvatarId);
  const text = useText();
  const currentSessionId = useSelector(getSessionCurrentId);

  const handleCopyClick = () => {
    copyToClipboard(currentSessionId);
    pushNotification(renderNotification(NotificationContent.SessionCopy));
  };

  return (
    <div className={cx('opener')}>
      {currentSessionId && (
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
      )}
      <Button
        onClick={() => setSidebarOpen(true)}
        variant={ButtonVariant.None}
      >
        <Avatar id={avatarId} />
      </Button>
    </div>
  );
};

export default UserSettingsOpener;
