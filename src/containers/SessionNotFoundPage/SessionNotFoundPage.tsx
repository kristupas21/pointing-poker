import React from 'react';
import { Redirect } from 'react-router';
import Text from '../../components/Text';
import { ROUTE } from '../../constants/routes';
import { useSessionId } from '../../utils/customHooks';

const SessionNotFoundPage: React.FC = () => {
  const id = useSessionId();

  if (!id) {
    return <Redirect to={ROUTE.BASE} />;
  }

  return (
    <Text id="session.not-found" values={{ id }} tag="span" />
  );
};

export default SessionNotFoundPage;
