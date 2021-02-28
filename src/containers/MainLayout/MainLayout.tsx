import React, { ReactNode, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import classNames from 'classnames/bind';
import Button from '../../components/Button';
import { IconId } from '../../components/Icon';
import styles from './MainLayout.module.scss';
import Sidebar from '../../components/Sidebar';
import ThemeChangeButton from './ThemeChangeButton';
import Navigation from '../../components/Navigation';
import { State } from '../../types/global';
import { setAppSidebarOpen } from '../../state/app/appActions';

const cx = classNames.bind(styles);

const mapStateToProps = (state: State) => ({
  isSidebarOpen: state.app.isSidebarOpen,
});

const mapDispatchToProps = {
  setSidebarOpen: setAppSidebarOpen,
};

type ReduxProps = ConnectedProps<typeof connector>;
type Props = ReduxProps & {
  children?: ReactNode;
  route: string;
};

const MainLayout: React.FC<Props> = (props) => {
  const { children, isSidebarOpen, setSidebarOpen, route } = props;
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
          <ThemeChangeButton />
        </div>
        <div className={cx('layout__children')}>
          {children}
        </div>
      </div>
    </div>
  );
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(MainLayout);
