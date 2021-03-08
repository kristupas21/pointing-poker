import React from 'react';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import { ROUTE } from '../../constants/routes';
import { useText } from '../../utils/customHooks';
import styles from './Navigation.module.scss';

const cx = classNames.bind(styles);

const Navigation: React.FC = () => {
  const text = useText();

  return (
    <ul className={cx('list')}>
      <li className={cx('list__item')}>
        <NavLink to={ROUTE.BASE}>
          {text('nav.home')}
        </NavLink>
      </li>
      <li className={cx('list__item')}>
        <NavLink to={ROUTE.START_SESSION}>
          {text('nav.startSession')}
        </NavLink>
      </li>
      <li className={cx('list__item')}>
        <NavLink to={ROUTE.JOIN_SESSION}>
          {text('nav.joinSession')}
        </NavLink>
      </li>
    </ul>
  );
};

export default Navigation;
