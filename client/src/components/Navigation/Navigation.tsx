import React from 'react';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import { AppRoute, getRouteMessageId } from 'utils/routes';
import { useText } from 'utils/customHooks';
import styles from './Navigation.module.scss';

const cx = classNames.bind(styles);

const Navigation: React.FC = () => {
  const text = useText();

  return (
    <ul className={cx('list')}>
      <li className={cx('list__item')}>
        <NavLink to={AppRoute.Base}>
          {text(getRouteMessageId(AppRoute.Base))}
        </NavLink>
      </li>
      <li className={cx('list__item')}>
        <NavLink to={AppRoute.StartSession}>
          {text(getRouteMessageId(AppRoute.StartSession))}
        </NavLink>
      </li>
      <li className={cx('list__item')}>
        <NavLink to={AppRoute.JoinSession}>
          {text(getRouteMessageId(AppRoute.JoinSession))}
        </NavLink>
      </li>
    </ul>
  );
};

export default Navigation;
