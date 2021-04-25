import React, { useRef } from 'react';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import Button from 'components/Button';
import { getAppSidebarOpen } from 'state/app/appStateGetters';
import { useMappedDispatch, useOutsideClose } from 'utils/customHooks';
import { setAppSidebarOpen } from 'state/app/appActions';
import Logo from 'components/Logo';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

const actions = {
  setSidebarOpen: setAppSidebarOpen,
};

const Sidebar: React.FC = (props) => {
  const { children } = props;
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isOpen = useSelector(getAppSidebarOpen);
  const { setSidebarOpen } = useMappedDispatch(actions);

  const handleClose = () => {
    isOpen && setSidebarOpen(false);
  };

  const sidebarClasses = cx('sidebar', {
    'sidebar--open': isOpen,
  });

  useOutsideClose(sidebarRef, handleClose);

  return (
    <div className={sidebarClasses} ref={sidebarRef}>
      <div className={cx('sidebar__drawer')}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={handleClose}>X</Button>
          <Button onClick={() => setSidebarOpen(true)}>
            <Logo />
          </Button>
        </div>
        <div className={cx('sidebar__content')}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
