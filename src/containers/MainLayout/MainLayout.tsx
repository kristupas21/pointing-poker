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
import { useMappedDispatch, useText } from 'utils/customHooks';
import ThemeSelector from 'containers/ThemeSelector';
import Sidebar from 'components/Sidebar';
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
  const isLoading = useSelector(getAppLoading);
  const { setSidebarOpen } = useMappedDispatch(actions);
  const text = useText();

  const handleLogoClick = () => {
    if (renderMenu) {
      setSidebarOpen(true);
    } else {
      history.push(AppRoute.Base);
    }
  };

  const handleLeaveClick = () => {
    setSidebarOpen(false);
    history.push(AppRoute.Base);
  };

  return (
    <div className={cx('layout')}>
      <div className={cx('layout__content')}>
        <div className={cx('layout__controls')}>
          <Button variant={ButtonVariant.None} onClick={handleLogoClick}>
            <Logo />
          </Button>
          {renderMenu && <UserSettings />}
        </div>
        <motion.div
          className={cx('layout__route', {
            'layout__route--loading': isLoading
          })}
          key={location?.pathname}
          {...animations.simpleOpacity}
        >
          {children}
        </motion.div>
      </div>
      {renderMenu && (
        <Sidebar>
          <ThemeSelector />
          <Button onClick={handleLeaveClick}>
            {text('session.leave')}
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
