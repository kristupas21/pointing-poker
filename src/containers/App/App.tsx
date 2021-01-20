import React from 'react';
import classNames from 'classnames/bind';
import styles from './App.module.scss';
import Button from '../../components/Button';
import Text from '../../components/Text';
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
        <Button>
          <Text id="complex.msg" values={{ name: 'John' }} tag="i" className={cx('i')} />
        </Button>
      </div>
    </>
  );
};

export default App;
