import React from 'react';
import classNames from 'classnames/bind';
import styles from './ProgressBar.module.scss';

const cx = classNames.bind(styles);

export type ProgressBarInterval = 2000 | 4000 | 6000;

interface Props {
  interval: ProgressBarInterval;
}

const ProgressBar: React.FC<Props> = ({ interval }) => (
  <div className={cx('progress-bar')}>
    <div className={cx('progress-bar__content', `progress-bar__content--${interval}`)} />
  </div>
);

export default ProgressBar;
