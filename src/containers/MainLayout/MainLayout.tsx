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
import styles from './MainLayout.module.scss';

const cx = classNames.bind(styles);

type Props = {
  children?: ReactNode;
  route: string;
  withSettings?: boolean;
};

const MainLayout: React.FC<Props> = (props) => {
  const { children, route, withSettings = false } = props;

  return (
    <div className={cx('layout')}>
      <div className={cx('layout__content')}>
        <div className={cx('layout__controls')}>
          <Link to={AppRoute.Base}>
            <Logo />
          </Link>
          {withSettings && <UserSettingsOpener />}
        </div>
        <motion.div
          className={cx('layout__children')}
          key={route}
          {...animations.simpleOpacity}
        >
          {children}
        </motion.div>
      </div>
      {withSettings && (
        <Sidebar>
          <UserSettings />
        </Sidebar>
      )}
    </div>
  );
};

export default MainLayout;
