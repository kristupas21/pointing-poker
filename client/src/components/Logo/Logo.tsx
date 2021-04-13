import React from 'react';
import Icon, { IconId } from 'components/Icon';
import classNames from 'classnames/bind';
import styles from './Logo.module.scss';

const cx = classNames.bind(styles);

const Logo: React.FC = () => (
  <span className={cx('logo')}>
    <Icon width={50} height={50} id={IconId.Logo1} />
  </span>
);

export default Logo;
