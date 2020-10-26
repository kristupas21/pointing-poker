import React from 'react';
import classNames from 'classnames/bind';
import styles from './App.module.scss';

const cx = classNames.bind(styles);

interface Props {
  name: string;
}

const App: React.FC<Props> = ({ name }) => (
  <p className={cx('test')}>
    {name}
  </p>
);

export default App;
