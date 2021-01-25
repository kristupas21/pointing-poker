import React from 'react';
import { RouteChildrenProps } from 'react-router';
import Button, { ButtonVariant } from '../../components/Button';
import Text from '../../components/Text/Text';
import { useBreakpoint } from '../../utils/customHooks';
import { ROUTE } from '../../constants/routes';

type Props = RouteChildrenProps;

const LandingPage: React.FC<Props> = (props) => {
  const { history } = props;
  const breakpoint = useBreakpoint();

  const handleStartClick = () =>
    history.push(ROUTE.START_SESSION);

  const handleJoinClick = () =>
    history.push(ROUTE.JOIN_SESSION);

  return (
    <div>
      <p>
        {breakpoint}
      </p>
      <Button variant={ButtonVariant.Primary} onClick={handleStartClick} role="link">
        <Text id="session.start" />
      </Button>
      <Button variant={ButtonVariant.Primary} onClick={handleJoinClick} role="link">
        <Text id="session.join" />
      </Button>
    </div>
  );
};

export default LandingPage;
