import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, RouteChildrenProps } from 'react-router';
import Text from '../../components/Text';
import Button, { ButtonVariant } from '../../components/Button';
import { ROUTE } from '../../constants/routes';
import { getErrorState } from '../../state/error/errorStateGetters';

type Props = RouteChildrenProps;

const ErrorPage: React.FC<Props> = (props) => {
  const { history } = props;
  const { errorId, redirectPath } = useSelector(getErrorState);

  const handleRedirectClick = () =>
    history.push(redirectPath);

  if (!errorId) {
    return <Redirect to={ROUTE.BASE} />;
  }

  return (
    <div>
      <div>
        <Text id={errorId} />
      </div>
      <Button variant={ButtonVariant.Danger} onClick={handleRedirectClick} role="link">
        <Text id="global.tryAgain" />
      </Button>
    </div>
  );
};

export default ErrorPage;
