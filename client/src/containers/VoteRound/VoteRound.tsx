import React from 'react';
import { useSelector } from 'react-redux';
import { getSessionUserIsObserver } from 'state/session/sessionStateGetters';
import VoteRoundActions from './VoteRoundActions';
import VoteRoundOptions from './VoteRoundOptions';
import VoteRoundResult from './VoteRoundResult';
import VoteRoundUsers from './VoteRoundUsers';

const VoteRound: React.FC = () => {
  const isObserver = useSelector(getSessionUserIsObserver);

  return (
    <div>
      {isObserver || <VoteRoundOptions />}
      <VoteRoundActions />
      <VoteRoundResult />
      <VoteRoundUsers />
    </div>
  );
};

export default VoteRound;
