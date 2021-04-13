import React from 'react';
import { useSelector } from 'react-redux';
import { getSessionCurrentId } from 'state/session/sessionStateGetters';
import { pushNotification as pushNotificationAction } from 'state/notifications/notificationsActions';
import classNames from 'classnames/bind';
import { useMappedDispatch, useText } from 'utils/customHooks';
import renderNotification, { NotificationContent } from 'utils/notificationContent';
import { copyToClipboard } from 'utils/commands';
import styles from './UserSettings.module.scss';
import AvatarSelector from '../AvatarSelector';

const cx = classNames.bind(styles);

const actions = {
  pushNotification: pushNotificationAction,
};

const UserSettingsOpener: React.FC = () => {
  const { pushNotification } = useMappedDispatch(actions);
  const text = useText();
  const currentSessionId = useSelector(getSessionCurrentId);

  const handleCopyClick = () => {
    copyToClipboard(currentSessionId);
    pushNotification(renderNotification(NotificationContent.SessionCopy));
  };

  return (
    <div className={cx('settings')}>
      {currentSessionId && (
        <div
          className={cx('settings__session-info')}
          onClick={handleCopyClick}
          role="button"
          onKeyDown={undefined}
          tabIndex={-1}
        >
          <div className={cx('settings__session-text')}>{text('global.session')}</div>
          <div className={cx('settings__session-id')}>{currentSessionId}</div>
        </div>
      )}
      <AvatarSelector />
    </div>
  );
};

export default UserSettingsOpener;
