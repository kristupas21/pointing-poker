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
import styles from './MainLayout.module.scss';
import { getSessionUser } from '../../state/session/sessionStateGetters';

const cx = classNames.bind(styles);

type Props = {
  children?: ReactNode;
  route: string;
  withSettings?: boolean;
};

const MainLayout: React.FC<Props> = (props) => {
  const { children, route, withSettings = false } = props;
  const user = useSelector(getSessionUser);
  const showSettings = withSettings && !!user;

  return (
    <div className={cx('layout')}>
      <div className={cx('layout__content')}>
        <div className={cx('layout__controls')}>
          <Link to={AppRoute.Base}>
            <Logo />
          </Link>
          {showSettings && <UserSettingsOpener />}
        </div>
        <motion.div
          className={cx('layout__children')}
          key={route}
          {...animations.simpleOpacity}
        >
          {children}
        </motion.div>
      </div>
      {showSettings && (
        <Sidebar>
          <UserSettings />
        </Sidebar>
      )}
    </div>
  );
};

export default MainLayout;
