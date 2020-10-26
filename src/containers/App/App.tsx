import React from 'react';
import classNames from 'classnames/bind';
import { Intent } from '@blueprintjs/core';
import styles from './App.module.scss';
import Button from '../../components/Button';
import FormattedMessage from '../../components/FormattedMessage';

const cx = classNames.bind(styles);

interface Props {
  name: string;
}

const App: React.FC<Props> = ({ name }) => (
  <>
    <p className={cx('test')}>
      {name}
    </p>
    <div>
      <Button icon="info-sign" intent={Intent.PRIMARY}>
        <FormattedMessage id="complex.msg" values={{ name: 'John' }} tagName="i" />
      </Button>
    </div>
  </>
);

export default App;
