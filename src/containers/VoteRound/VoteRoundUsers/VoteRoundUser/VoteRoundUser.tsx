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
    ? <span data-className="value">{voteValue}</span>
    : <i data-component="CloseMark">X</i>
  );

  const renderHiddenValue = () => (hasVoted
    ? <i data-component="CheckMark">V</i>
    : <i data-component="CloseMark">X</i>
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
