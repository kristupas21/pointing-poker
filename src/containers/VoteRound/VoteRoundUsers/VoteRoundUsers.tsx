import React from 'react';
import { useSelector } from 'react-redux';
import sortBy from 'lodash/sortBy';
import { getVoteRoundUsers, getVotesShownValue } from 'state/voteRound/voteRoundStateGetters';
import { getSessionUserId } from 'state/session/sessionStateGetters';
import VoteRoundUser from './VoteRoundUser';

const VoteRoundUsers: React.FC = () => {
  const users = useSelector(getVoteRoundUsers);
  const votesShown = useSelector(getVotesShownValue);
  const userId = useSelector(getSessionUserId);

  return (
    <ul>
      {sortBy(users, 'name').map((u) => (
        <li key={u.id}>
          <VoteRoundUser showVote={votesShown} {...u} isMe={userId === u.id} />
        </li>
      ))}
    </ul>
  );
};

export default VoteRoundUsers;
