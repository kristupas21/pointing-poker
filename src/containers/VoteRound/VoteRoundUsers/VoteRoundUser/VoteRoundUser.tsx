import React from 'react';
import { User } from 'types/global';
import Avatar from 'components/Avatar';
import { POINT_VALUE_INFINITY, POINT_VALUE_UNKNOWN } from 'utils/pointValues/constants';
import { _flexContainer } from '_develop/_constants';

interface Props extends User {
  showVote: boolean;
}

const VoteRoundUser: React.FC<Props> = (props) => {
  const { avatarId, name, voteValue, showVote, isObserver, role } = props;
  const hasVoted = voteValue != null;

  const renderValue = () => (hasVoted
    ? <span>{getDisplayValue(voteValue)}</span>
    : <span role="img" aria-labelledby="">❌</span>
  );

  const renderHiddenValue = () => (hasVoted
    ? <span role="img" aria-labelledby="">✅</span>
    : <span role="img" aria-labelledby="">❌</span>
  );

  return (
    <div style={_flexContainer}>
      <Avatar id={avatarId} />
      <span style={{ display: 'inline-flex', flexDirection: 'column' }}>
        {name}
        <span style={{ fontSize: 12, color: '#808080' }}>{role}</span>
      </span>
      {isObserver || (
        <span>
          {showVote ? renderValue() : renderHiddenValue()}
        </span>
      )}
    </div>
  );
};

function getDisplayValue(vote: string): string {
  switch (vote) {
    case POINT_VALUE_UNKNOWN:
      return '🤷';
    case POINT_VALUE_INFINITY:
      return '♾️';
    default:
      return vote;
  }
}

export default VoteRoundUser;
