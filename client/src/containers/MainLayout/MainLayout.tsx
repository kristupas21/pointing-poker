import React, { ReactNode } from 'react';
import classNames from 'classnames/bind';
import { motion } from 'framer-motion';
import animations from 'utils/animations';
import Logo from 'components/Logo';
import { useSelector } from 'react-redux';
import AppFooter from 'components/AppFooter';
import { getAppLoading } from 'state/app/appStateGetters';
import UserSettings from 'containers/UserSettings';
import ClearStorageButton from '_develop/ClearStorageButton';
import { RouteChildrenProps } from 'react-router';
import { setAppSidebarOpen } from 'state/app/appActions';
import Button, { ButtonVariant } from 'components/Button';
import { AppRoute } from 'utils/routes';
import { useMappedDispatch } from 'utils/customHooks';
import ThemeSelector from 'containers/ThemeSelector';
import Sidebar from 'components/Sidebar';
import { getSessionCurrentId } from 'state/session/sessionStateGetters';
import Icon, { IconId } from 'components/Icon';
import styles from './MainLayout.module.scss';

const cx = classNames.bind(styles);

const actions = {
  setSidebarOpen: setAppSidebarOpen,
};

type Props = RouteChildrenProps & {
  children?: ReactNode;
  renderMenu: boolean;
};

const MainLayout: React.FC<Props> = (props) => {
  const { children, location, renderMenu, history } = props;
  const currentSessionId = useSelector(getSessionCurrentId);
  const isLoading = useSelector(getAppLoading);
  const { setSidebarOpen } = useMappedDispatch(actions);
  const withSidebar = renderMenu && !!currentSessionId;

  const handleLogoClick = (): void => {
    if (renderMenu) {
      setSidebarOpen(true);
      return;
    }

    if (location.pathname !== AppRoute.Base) {
      history.push(AppRoute.Base);
    }
  };

  const handleLeaveClick = () => {
    setSidebarOpen(false);
    history.push(AppRoute.Base);
  };

  const LogoButton = (
    <Button onClick={handleLogoClick}>
      <Logo />
    </Button>
  );

  return (
    <div className={cx('layout')}>
      <div className={cx('layout__content')}>
        <div className={cx('layout__controls')}>
          {withSidebar
            ? <UserSettings />
            : LogoButton}
        </div>
        <motion.div
          className={cx('layout__route', {
            'layout__route--loading': isLoading,
            'layout__route--with-sidebar': withSidebar,
          })}
          key={location?.pathname}
          {...animations.simpleOpacity}
        >
          {children}
        </motion.div>
      </div>
      {withSidebar && (
        <Sidebar>
          <ThemeSelector />
          <Button variant={ButtonVariant.Primary} round onClick={handleLeaveClick}>
            <Icon width={29} height={22} id={IconId.Logout} />
          </Button>
        </Sidebar>
      )}
      <AppFooter>
        <ClearStorageButton />
      </AppFooter>
    </div>
  );
};

export default MainLayout;
