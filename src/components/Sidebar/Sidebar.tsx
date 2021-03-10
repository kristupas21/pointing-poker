import React from 'react';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import Button from 'components/Button';
import { getSidebarOpenValue } from 'state/app/appStateGetters';
import { useMappedDispatch } from 'utils/customHooks';
import { setAppSidebarOpen } from 'state/app/appActions';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

const actions = {
  setSidebarOpen: setAppSidebarOpen,
};

interface Props {
  onCloseClick?: () => void;
}

const Sidebar: React.FC<Props> = (props) => {
  const { onCloseClick, children } = props;
  const isOpen = useSelector(getSidebarOpenValue);
  const { setSidebarOpen } = useMappedDispatch(actions);

  const handleClose = () => {
    onCloseClick && onCloseClick();
    setSidebarOpen(false);
  };

  const sidebarClasses = cx('sidebar', {
    'sidebar--open': isOpen,
  });

  return (
    <div className={sidebarClasses}>
      <div className={cx('sidebar__shade')} onClick={handleClose} role="presentation" />
      <div className={cx('sidebar__drawer')}>
        <Button onClick={handleClose}>X</Button>
        <div className={cx('sidebar__content')}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
