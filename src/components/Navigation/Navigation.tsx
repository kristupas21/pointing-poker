import React from 'react';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import { AppRoute, getRouteName } from 'constants/routes';
import { useText } from 'utils/customHooks';
import styles from './Navigation.module.scss';

const cx = classNames.bind(styles);

const Navigation: React.FC = () => {
  const text = useText();

  return (
    <ul className={cx('list')}>
      <li className={cx('list__item')}>
        <NavLink to={AppRoute.Base}>
          {text(getRouteName(AppRoute.Base))}
        </NavLink>
      </li>
      <li className={cx('list__item')}>
        <NavLink to={AppRoute.StartSession}>
          {text(getRouteName(AppRoute.StartSession))}
        </NavLink>
      </li>
      <li className={cx('list__item')}>
        <NavLink to={AppRoute.JoinSession}>
          {text(getRouteName(AppRoute.JoinSession))}
        </NavLink>
      </li>
    </ul>
  );
};

export default Navigation;
