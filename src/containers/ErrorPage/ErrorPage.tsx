import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Redirect, RouteChildrenProps } from 'react-router';
import Text from '../../components/Text';
import Button, { ButtonVariant } from '../../components/Button';
import { ROUTE } from '../../constants/routes';
import { State } from '../../types/global';

type ReduxProps = ConnectedProps<typeof connector>;

type Props = ReduxProps & RouteChildrenProps;

const ErrorPage: React.FC<Props> = (props) => {
  const { errorId, redirectPath, history } = props;

  const handleRedirectClick = () =>
    history.push(redirectPath);

  if (!errorId) {
    return <Redirect to={ROUTE.BASE} />;
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

const mapStateToProps = (state: State) => ({
  errorId: state.error.errorId,
  redirectPath: state.error.redirectPath,
});

const connector = connect(mapStateToProps);

export default connector(ErrorPage);
