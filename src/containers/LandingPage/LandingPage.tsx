import React from 'react';
import { RouteChildrenProps } from 'react-router';
import Button, { ButtonVariant } from '../../components/Button';
import { useBreakpoint, useText } from '../../utils/customHooks';
import { ROUTE } from '../../constants/routes';

type Props = RouteChildrenProps;

const LandingPage: React.FC<Props> = (props) => {
  const { history } = props;
  const breakpoint = useBreakpoint();
  const text = useText();

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
        {text('session.start')}
      </Button>
      <Button variant={ButtonVariant.Primary} onClick={handleJoinClick} role="link">
        {text('session.join')}
      </Button>
    </div>
  );
};

export default LandingPage;
