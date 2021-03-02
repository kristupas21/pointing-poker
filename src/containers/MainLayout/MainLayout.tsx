import React, { ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import Button from '../../components/Button';
import { IconId } from '../../components/Icon';
import styles from './MainLayout.module.scss';
import Sidebar from '../../components/Sidebar';
import ThemeChangeButton from './ThemeChangeButton';
import Navigation from '../../components/Navigation';
import { setAppSidebarOpen } from '../../state/app/appActions';
import storageService from '../../utils/storageService';
import { getSidebarOpenValue } from '../../state/app/appStateGetters';
import { useMappedDispatch } from '../../utils/customHooks';

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
  const isSidebarOpen = useSelector(getSidebarOpenValue);
  const { setSidebarOpen } = useMappedDispatch(mapDispatchToProps);
  const closeSidebar = () => setSidebarOpen(false);
  const openSidebar = () => setSidebarOpen(true);

  useEffect(() => {
    closeSidebar();
  }, []);

  return (
    <div className={cx('layout')}>
      <Sidebar isOpen={isSidebarOpen} onCloseClick={closeSidebar}>
        <Navigation />
      </Sidebar>
      <div className={cx('layout__content')}>
        <div className={cx('layout__controls')}>
          <Button icon={IconId.Menu} onClick={openSidebar} />
          {route}
          <Button onClick={storageService.clearState}>
            Clear Storage
          </Button>
          <ThemeChangeButton />
        </div>
        <div className={cx('layout__children')}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
