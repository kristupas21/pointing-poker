import React from 'react';
import VoteRoundActions from './VoteRoundActions';
import VoteRoundOptions from './VoteRoundOptions';
import VoteRoundResult from './VoteRoundResult';
import VoteRoundUsers from './VoteRoundUsers';

const VoteRound: React.FC = () => (
  <div>
    <VoteRoundActions />
    <VoteRoundOptions />
    <VoteRoundResult />
    <VoteRoundUsers />
  </div>
);

export default VoteRound;
