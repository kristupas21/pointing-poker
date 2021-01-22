import React from 'react';
import { Redirect, RouteChildrenProps } from 'react-router';
import { ErrorState } from '../../state/error/errorTypes';
import Text from '../../components/Text';
import Button, { ButtonVariant } from '../../components/Button';
import ROUTES from '../../constants/routes';

type Props = ErrorState & RouteChildrenProps;

const ErrorPage: React.FC<Props> = (props) => {
  const { errorId, redirectPath, history } = props;

  const handleRedirectClick = () =>
    history.push(redirectPath);

  if (!errorId) {
    return <Redirect to={ROUTES.BASE} />;
  }

  return (
    <div>
      <p style={{ color: 'red' }}>
        <Text id={errorId} />
      </p>
      <Button variant={ButtonVariant.Danger} onClick={handleRedirectClick} role="link">
        <Text id="global.tryAgain" />
      </Button>
    </div>
  );
};

export default ErrorPage;
