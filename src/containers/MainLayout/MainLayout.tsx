import React, { useState } from 'react';
import { History } from 'history';
import classNames from 'classnames/bind';
import Button from '../../components/Button';
import { ROUTE } from '../../constants/routes';
import { IconId } from '../../components/Icon';
import styles from './MainLayout.module.scss';
import Sidebar from '../../components/Sidebar';
import ThemeChangeButton from './ThemeChangeButton';

const cx = classNames.bind(styles);

export interface MainLayoutProps {
  history?: History;
  pathname?: string;
}

const MainLayout: React.FC<MainLayoutProps> = (props) => {
  const { children, history, pathname } = props;

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const onHomeClick = () => history.push(ROUTE.BASE);
  const closeSidebar = () => setSidebarOpen(false);
  const openSidebar = () => setSidebarOpen(true);
  const isHomeRoute = pathname === ROUTE.BASE;

  const contentClasses = cx('layout__content', {
    'layout__content--disabled': isSidebarOpen,
  });

  const getContentProps = () => ({
    ...(isSidebarOpen && { onClick: closeSidebar }),
  });

  return (
    <div className={cx('layout')}>
      <Sidebar isOpen={isSidebarOpen} onCloseClick={closeSidebar} />
      <div className={contentClasses} {...getContentProps()}>
        <div className={cx('layout__controls')}>
          <ThemeChangeButton />
          {isHomeRoute || <Button icon={IconId.Home} onClick={onHomeClick} />}
          <Button icon={IconId.Settings} onClick={openSidebar} />
        </div>
        <div className={cx('layout__children')}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
