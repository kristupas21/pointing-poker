import React from 'react';
import { RouteChildrenProps } from 'react-router';
import Button, { ButtonVariant } from 'components/Button';
import { useBreakpoint, useText } from 'utils/customHooks';
import { AppRoute } from 'constants/routes';

type Props = RouteChildrenProps;

const LandingPage: React.FC<Props> = (props) => {
  const { history } = props;
  const breakpoint = useBreakpoint();
  const text = useText();

  const handleStartClick = () =>
    history.push(AppRoute.StartSession);

  const handleJoinClick = () =>
    history.push(AppRoute.JoinSession);

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
