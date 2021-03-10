import React from 'react';
import { useSelector } from 'react-redux';
import { getSessionUser } from 'state/session/sessionStateGetters';
import VoteRoundActions from './VoteRoundActions';
import VoteRoundOptions from './VoteRoundOptions';
import VoteRoundResult from './VoteRoundResult';
import VoteRoundUsers from './VoteRoundUsers';

const VoteRound: React.FC = () => {
  const user = useSelector(getSessionUser);

  return (
    <div>
      <VoteRoundActions />
      {user?.isObserver || <VoteRoundOptions />}
      <VoteRoundResult />
      <VoteRoundUsers />
    </div>
  );
};

export default VoteRound;
