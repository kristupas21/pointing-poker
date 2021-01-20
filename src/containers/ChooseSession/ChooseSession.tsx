import React from 'react';
import Button from '../../components/Button';
import Text from '../../components/Text/Text';
import { useBreakpoint } from '../../utils/customHooks';

const ChooseSession: React.FC = () => {
  const breakpoint = useBreakpoint();

  return (
    <div>
      <p>
        {breakpoint}
      </p>
      <Button>
        <Text id="complex.msg" values={{ name: 'John' }} tag="i" />
      </Button>
    </div>
  );
};

export default ChooseSession;
