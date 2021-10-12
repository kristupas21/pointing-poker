import React, { ReactNode } from 'react';
import classNames from 'classnames/bind';
import { motion } from 'framer-motion';
import animations from 'utils/animations';
import { useSelector } from 'react-redux';
import AppFooter from 'components/AppFooter';
import { getAppLoading } from 'state/app/appStateGetters';
import ClearStorageButton from '_develop/ClearStorageButton';
import { RouteChildrenProps } from 'react-router';
import { AppRoute } from 'utils/routes';
import { getSessionCurrentId } from 'state/session/sessionStateGetters';
import AppHeader from 'components/AppHeader';
import styles from './MainLayout.module.scss';

const cx = classNames.bind(styles);

type Props = RouteChildrenProps & {
  children?: ReactNode;
  renderMenu: boolean;
};

const MainLayout: React.FC<Props> = (props) => {
  const { children, location, history } = props;
  const currentSessionId = useSelector(getSessionCurrentId);
  const isLoading = useSelector(getAppLoading);

  const handleLogoClick = (): void => {
    if (location.pathname !== AppRoute.Base) {
      history.push(AppRoute.Base);
    }
  };

  const handleLeaveClick = () => {
    history.push(AppRoute.Base);
  };

  return (
    <div className={cx('layout')}>
      <div className={cx('layout__content')}>
        <AppHeader onLogoClick={handleLogoClick} onLeaveClick={handleLeaveClick} />
        <motion.div
          className={cx('layout__route', {
            'layout__route--loading': isLoading,
            'layout__route--session': !!currentSessionId
          })}
          key={location?.pathname}
          {...animations.simpleOpacity}
        >
          {children}
        </motion.div>
      </div>
      <AppFooter>
        <ClearStorageButton />
      </AppFooter>
    </div>
  );
};

export default MainLayout;
