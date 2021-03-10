import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, RouteChildrenProps } from 'react-router';
import Button, { ButtonVariant } from 'components/Button';
import { ROUTE } from 'constants/routes';
import { getErrorState } from 'state/error/errorStateGetters';
import { useText } from 'utils/customHooks';

type Props = RouteChildrenProps;

const ErrorPage: React.FC<Props> = (props) => {
  const { history } = props;
  const { errorId, redirectPath } = useSelector(getErrorState);
  const text = useText();

  const handleRedirectClick = () =>
    history.push(redirectPath);

  if (!errorId) {
    return <Redirect to={ROUTE.BASE} />;
  }

  return (
    <div>
      <div>
        {text(errorId)}
      </div>
      <Button variant={ButtonVariant.Danger} onClick={handleRedirectClick} role="link">
        {text('global.tryAgain')}
      </Button>
    </div>
  );
};

export default ErrorPage;
