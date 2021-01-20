import React from 'react';
import Button, { ButtonVariant } from '../../components/Button';
import Text from '../../components/Text/Text';
import { useBreakpoint } from '../../utils/customHooks';

const ChooseSession: React.FC = () => {
  const breakpoint = useBreakpoint();

  return (
    <div>
      <p>
        {breakpoint}
      </p>
      <Button variant={ButtonVariant.Secondary}>
        <Text id="test.complex" values={{ name: 'John' }} tag="i" />
      </Button>
    </div>
  );
};

export default ChooseSession;
