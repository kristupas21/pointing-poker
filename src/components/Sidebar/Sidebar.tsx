import React, { useRef } from 'react';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import Button, { ButtonVariant } from 'components/Button';
import { getAppSidebarOpen } from 'state/app/appStateGetters';
import { useMappedDispatch, useOutsideClose } from 'utils/customHooks';
import { setAppSidebarOpen } from 'state/app/appActions';
import styles from './Sidebar.module.scss';
import Logo from '../Logo';

const cx = classNames.bind(styles);

const actions = {
  setSidebarOpen: setAppSidebarOpen,
};

interface Props {
  onCloseClick?: () => void;
}

const Sidebar: React.FC<Props> = (props) => {
  const { onCloseClick, children } = props;
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isOpen = useSelector(getAppSidebarOpen);
  const { setSidebarOpen } = useMappedDispatch(actions);

  const handleClose = () => {
    onCloseClick && onCloseClick();
    setSidebarOpen(false);
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
          <Button variant={ButtonVariant.None} onClick={() => setSidebarOpen(true)}>
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
