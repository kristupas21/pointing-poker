import React from 'react';
import { useText } from 'utils/customHooks';

const SessionCopy: React.FC = () => {
  const text = useText();

  return (
    <span>
      {text('notifications.sessionIdCopied')}
    </span>
  );
};

export default SessionCopy;
