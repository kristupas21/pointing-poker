import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { motion } from 'framer-motion';
import Button from 'components/Button';
import { AppRoute } from 'constants/routes';
import animations from 'utils/animations';
import Logo from 'components/Logo';
import { setAppSidebarOpen } from 'state/app/appActions';
import { useMappedDispatch } from 'utils/customHooks';
import Sidebar from 'components/Sidebar';
import { ClearStorageButton } from '_develop/_developComponents';
import UserSettings from 'containers/UserSettings';
import styles from './MainLayout.module.scss';

const cx = classNames.bind(styles);

const actions = {
  setSidebarOpen: setAppSidebarOpen,
};

type Props = {
  children?: ReactNode;
  route: string;
  withSettings?: boolean;
};

const MainLayout: React.FC<Props> = (props) => {
  const { children, route, withSettings = false } = props;
  const { setSidebarOpen } = useMappedDispatch(actions);

  return (
    <div className={cx('layout')}>
      <div className={cx('layout__content')}>
        <div className={cx('layout__controls')}>
          <Link to={AppRoute.Base}>
            <Logo />
          </Link>
          {withSettings && <Button onClick={() => setSidebarOpen(true)}>Settings</Button>}
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
          <ClearStorageButton />
        </Sidebar>
      )}
    </div>
  );
};

export default MainLayout;
