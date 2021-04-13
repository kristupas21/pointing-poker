import React, { CSSProperties, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, RouteChildrenProps } from 'react-router';
import Button, { ButtonVariant } from 'components/Button';
import { AppRoute } from 'utils/routes';
import { getErrorState } from 'state/error/errorStateGetters';
import { useMappedDispatch, useText } from 'utils/customHooks';
import { setErrorState } from 'state/error/errorActions';

type Props = RouteChildrenProps;

const _style: CSSProperties = {
  background: '#e44747',
  display: 'flex',
  flexDirection: 'column',
  padding: 50,
  alignItems: 'center',
};

const actions = {
  setState: setErrorState,
};

const ErrorPage: React.FC<Props> = ({ history }) => {
  const { errorId, redirectPath } = useSelector(getErrorState);
  const { setState } = useMappedDispatch(actions);
  const text = useText();
  const handleRedirectClick = () => history.replace(redirectPath || AppRoute.Base);

  useEffect(() => () => setState(null), []);

  if (!errorId) {
    return <Redirect to={AppRoute.Base} />;
  }

  return (
    <div style={_style}>
      <h2>
        {text(errorId)}
      </h2>
      <Button variant={ButtonVariant.Danger} onClick={handleRedirectClick} role="link">
        {text('global.tryAgain')}
      </Button>
    </div>
  );
};

export default ErrorPage;
