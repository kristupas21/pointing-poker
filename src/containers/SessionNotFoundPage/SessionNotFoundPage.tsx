import React from 'react';
import { Redirect } from 'react-router';
import { ROUTE } from 'constants/routes';
import { useSessionId, useText } from 'utils/customHooks';

const SessionNotFoundPage: React.FC = () => {
  const id = useSessionId();
  const text = useText();

  if (!id) {
    return <Redirect to={ROUTE.BASE} />;
  }

  return (
    <span>
      {text('session.not-found', { id })}
    </span>
  );
};

export default SessionNotFoundPage;
