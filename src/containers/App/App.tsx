import React from 'react';
import classNames from 'classnames/bind';
import styles from './App.module.scss';
import Button from '../../components/Button';
import FormattedMessage from '../../components/FormattedMessage';
import { useBreakpoint } from '../../utils/customHooks';

const cx = classNames.bind(styles);

interface Props {
  name: string;
}

const App: React.FC<Props> = ({ name }) => {
  const breakpoint = useBreakpoint();

  return (
    <>
      <p className={cx('test')}>
        {`${name} - ${breakpoint}`}
      </p>
      <div>
        <Button className={cx('button')}>
          <FormattedMessage id="complex.msg" values={{ name: 'John' }} tagName="i" />
        </Button>
      </div>
    </>
  );
};

export default App;
