import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { motion } from 'framer-motion';
import { AppRoute } from 'constants/routes';
import animations from 'utils/animations';
import Logo from 'components/Logo';
import Sidebar from 'components/Sidebar';
import UserSettings from 'containers/UserSettings';
import UserSettingsOpener from 'containers/UserSettings/UserSettingsOpener';
import { useSelector } from 'react-redux';
import AppFooter from 'components/AppFooter';
import { getAppLoading } from 'state/app/appStateGetters';
import ClearStorageButton from '_develop/ClearStorageButton';
import styles from './MainLayout.module.scss';

const cx = classNames.bind(styles);

type Props = {
  children?: ReactNode;
  route: string;
  withUserSettings?: boolean;
};

const MainLayout: React.FC<Props> = (props) => {
  const { children, route, withUserSettings = false } = props;
  const isLoading = useSelector(getAppLoading);

  return (
    <div className={cx('layout')}>
      <div className={cx('layout__content')}>
        <div className={cx('layout__controls')}>
          <Link to={AppRoute.Base}>
            <Logo />
          </Link>
          <UserSettingsOpener />
        </div>
        <motion.div
          className={cx('layout__route', {
            'layout__route--loading': isLoading
          })}
          key={route}
          {...animations.simpleOpacity}
        >
          {children}
        </motion.div>
      </div>
      <Sidebar>
        <UserSettings withForm={withUserSettings} />
      </Sidebar>
      <AppFooter>
        <ClearStorageButton />
      </AppFooter>
    </div>
  );
};

export default MainLayout;
