import React, { ReactNode } from 'react';
import classNames from 'classnames/bind';
import { motion } from 'framer-motion';
import Button from '../../components/Button';
import { IconId } from '../../components/Icon';
import styles from './MainLayout.module.scss';
import ThemeChangeButton from './ThemeChangeButton';
import { setAppSidebarOpen } from '../../state/app/appActions';
import storageService from '../../utils/storageService';
import { useMappedDispatch } from '../../utils/customHooks';
import { mainLayoutContentMotionProps } from './constants';

const cx = classNames.bind(styles);

const mapDispatchToProps = {
  setSidebarOpen: setAppSidebarOpen,
};

type Props = {
  children?: ReactNode;
  route: string;
};

const MainLayout: React.FC<Props> = (props) => {
  const { children, route } = props;
  const { setSidebarOpen } = useMappedDispatch(mapDispatchToProps);
  const openSidebar = () => setSidebarOpen(true);

  return (
    <div className={cx('layout')}>
      <div className={cx('layout__content')}>
        <div className={cx('layout__controls')}>
          <Button icon={IconId.Menu} onClick={openSidebar} />
          {route}
          <Button onClick={storageService.clearState} isOutline>
            Clear Storage
          </Button>
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
