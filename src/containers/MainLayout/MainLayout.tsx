import React, { ReactNode } from 'react';
import classNames from 'classnames/bind';
import { motion } from 'framer-motion';
import Button from 'components/Button';
import { IconId } from 'components/Icon';
import { setAppSidebarOpen } from 'state/app/appActions';
import { useMappedDispatch, useText } from 'utils/customHooks';
import { getRouteName, ROUTE } from 'constants/routes';
import ThemeChangeButton from './ThemeChangeButton';
import { mainLayoutContentMotionProps } from './constants';
import styles from './MainLayout.module.scss';

const cx = classNames.bind(styles);

const actions = {
  setSidebarOpen: setAppSidebarOpen,
};

type Props = {
  children?: ReactNode;
  route: string;
};

const MainLayout: React.FC<Props> = (props) => {
  const { children, route } = props;
  const text = useText();
  const { setSidebarOpen } = useMappedDispatch(actions);
  const openSidebar = () => setSidebarOpen(true);

  return (
    <div className={cx('layout')}>
      <div className={cx('layout__content')}>
        <div className={cx('layout__controls')}>
          <Button icon={IconId.Menu} onClick={openSidebar} />
          <div className={cx('layout__route')}>
            {text(getRouteName(route as ROUTE))}
          </div>
          <ThemeChangeButton />
        </div>
        <motion.div
          className={cx('layout__children')}
          key={route}
          {...mainLayoutContentMotionProps}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default MainLayout;
