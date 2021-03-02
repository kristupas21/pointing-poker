import React from 'react';
import { useSelector } from 'react-redux';
import sortBy from 'lodash/sortBy';
import VoteRoundUser from './VoteRoundUser';
import { getVoteRoundUsers, getVotesShownValue } from '../../../state/voteRound/voteRoundStateGetters';

const VoteRoundUsers: React.FC = () => {
  const users = useSelector(getVoteRoundUsers);
  const votesShown = useSelector(getVotesShownValue);

  return (
    <ul>
      {sortBy(users, 'name').map((u) => (
        <li key={u.id}>
          <VoteRoundUser showVote={votesShown} {...u} />
        </li>
      ))}
    </ul>
  );
};

export default VoteRoundUsers;
