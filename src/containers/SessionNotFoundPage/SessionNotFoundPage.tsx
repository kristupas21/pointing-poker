import React, { useEffect, useRef } from 'react';
import { Redirect, RouteChildrenProps } from 'react-router';
import Text from '../../components/Text';
import ROUTES from '../../constants/routes';

type Props = RouteChildrenProps<any, { sessionId: string }>;

const SessionNotFoundPage: React.FC<Props> = (props) => {
  const { location: { state }, history } = props;
  const { current: id } = useRef(state?.sessionId);

  useEffect(() => {
    history.replace({ state: null });
  }, []);

  if (!id) {
    return <Redirect to={ROUTES.BASE} />;
  }

  return (
    <Text id="session.not-found" values={{ id }} tag="span" />
  );
};

export default SessionNotFoundPage;
