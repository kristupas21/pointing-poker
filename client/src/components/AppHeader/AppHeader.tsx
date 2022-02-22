import React from 'react';
import { useSelector } from 'react-redux';
import { getSessionCurrentId } from 'state/session/sessionStateGetters';
import {
  pushNotification as pushNotificationAction
} from 'state/notifications/notificationsActions';
import classNames from 'classnames/bind';
import { useMappedDispatch, useText } from 'utils/customHooks';
import renderNotification, { NotificationContent } from 'utils/notificationContent';
import { copyToClipboard } from 'utils/commands';
import Button, { ButtonVariant } from 'components/Button';
import Logo from 'components/Logo';
import Icon, { IconId } from 'components/Icon';
import ModeSelector from '../../containers/ModeSelector';
import styles from './AppHeader.module.scss';

const cx = classNames.bind(styles);

const actions = {
  pushNotification: pushNotificationAction,
};

interface Props {
  onLeaveClick: () => void;
  onLogoClick: () => void;
}

const AppHeader: React.FC<Props> = ({ onLeaveClick, onLogoClick }) => {
  const { pushNotification } = useMappedDispatch(actions);
  const text = useText();
  const currentSessionId = useSelector(getSessionCurrentId);

  const handleCopyClick = () => {
    copyToClipboard(currentSessionId);
    pushNotification(renderNotification(NotificationContent.SessionCopy));
  };

  const handleLogoClick = currentSessionId ? handleCopyClick : onLogoClick;

  return (
    <header className={cx('header', { 'header--session': currentSessionId })}>
      <Button className={cx('header__logo')} onClick={handleLogoClick}>
        <Logo />
        {currentSessionId && (
          <div className={cx('header__session')}>
            <span className={cx('header__session-text')}>{text('global.session')}</span>
            <span className={cx('header__session-id')}>{currentSessionId}</span>
          </div>
        )}
      </Button>
      {currentSessionId && (
        <div className={cx('header__controls')}>
          <ModeSelector />
          <Button variant={ButtonVariant.Primary} round onClick={onLeaveClick}>
            <Icon width={29} height={22} id={IconId.Logout} />
          </Button>
        </div>
      )}
    </header>
  );
};

export default AppHeader;
