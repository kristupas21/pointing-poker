import React from 'react';
import { useSelector } from 'react-redux';
import { getVoteRoundUsers, getVotesShownValue } from 'state/voteRound/voteRoundStateGetters';
import { getSessionUserId } from 'state/session/sessionStateGetters';
import VoteRoundUser from './VoteRoundUser';
import { sortUsersByName } from '../utils';

const VoteRoundUsers: React.FC = () => {
  const users = useSelector(getVoteRoundUsers);
  const votesShown = useSelector(getVotesShownValue);
  const userId = useSelector(getSessionUserId);

  return (
    <ul>
      {sortUsersByName(users).map((u) => (
        <li key={u.id}>
          <VoteRoundUser showVote={votesShown} {...u} isMe={userId === u.id} />
        </li>
      ))}
    </ul>
  );
};

export default VoteRoundUsers;
