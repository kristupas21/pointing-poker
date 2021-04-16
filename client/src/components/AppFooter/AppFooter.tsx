import React from 'react';
import classNames from 'classnames/bind';
import styles from './AppFooter.module.scss';

const cx = classNames.bind(styles);

const currentYear = new Date().getFullYear();

const AppFooter: React.FC = ({ children }) => {
  const copyright = `© ${currentYear} Pointing Poker`;

  return (
    <footer className={cx('footer')}>
      <div>{children}</div>
      <div className={cx('wrapper')}>
        <div className={cx('darker')} />
        <div className={cx('dark')} />
        <div className={cx('color')} />
        <div className={cx('light')} />
        <div className={cx('lighter')} />
      </div>
      <div>{copyright}</div>
    </footer>
  );
};

export default AppFooter;
