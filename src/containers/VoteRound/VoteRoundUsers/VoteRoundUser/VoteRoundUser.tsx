import React from 'react';
import { User } from '../../../../types/global';
import Avatar from '../../../../components/Avatar';

interface Props extends User {
  showVote: boolean;
}

const VoteRoundUser: React.FC<Props> = (props) => {
  const { avatarId, name, voteValue, showVote } = props;
  const hasVoted = voteValue != null;

  const renderValue = () => (hasVoted
    ? <i>{voteValue}</i>
    : <i>X</i>
  );

  const renderHiddenValue = () => (hasVoted
    ? <i style={{ background: 'lawngreen' }}>V</i>
    : <i>X</i>
  );

  return (
    <div>
      <Avatar id={avatarId} />
      <span>{name}</span>
      <span>
        {showVote ? renderValue() : renderHiddenValue()}
      </span>
    </div>
  );
};
export default VoteRoundUser;
