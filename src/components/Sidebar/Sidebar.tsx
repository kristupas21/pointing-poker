import React from 'react';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Button from '../Button';

const cx = classNames.bind(styles);

interface Props {
  isOpen: boolean;
  onCloseClick: () => void;
}

const Sidebar: React.FC<Props> = (props) => {
  const { isOpen, onCloseClick, children } = props;
  const sidebarClasses = cx('sidebar', {
    'sidebar--open': isOpen,
  });

  return (
    <div className={sidebarClasses}>
      <Button onClick={onCloseClick}>X</Button>
      <div className={cx('sidebar__content')}>
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
