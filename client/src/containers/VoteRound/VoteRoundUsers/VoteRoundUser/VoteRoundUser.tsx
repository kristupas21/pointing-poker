import React, { CSSProperties } from 'react';
import { User } from 'globalTypes';
import Avatar from 'components/Avatar';
import { useText } from 'utils/customHooks';
import { POINT_VALUE_INFINITY, POINT_VALUE_UNKNOWN } from 'utils/pointValues/constants';

interface Props extends User {
  showVote: boolean;
  isMe?: boolean;
}

const VoteRoundUser: React.FC<Props> = (props) => {
  const { avatarId, name, voteValue, showVote, isObserver, role, isMe } = props;
  const text = useText();
  const hasVoted = voteValue != null;

  const renderValue = () => (hasVoted
    ? <span>{getDisplayValue(voteValue)}</span>
    : <span role="img" aria-labelledby="">❌</span>
  );

  const renderHiddenValue = () => (hasVoted
    ? <span role="img" aria-labelledby="">✅</span>
    : <span style={{ fontSize: 12 }}>{text('voteRound.waiting')}</span>
  );

  const _style: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    ...(isMe && { border: '2px solid' })
  };

  return (
    <div style={_style}>
      <Avatar id={avatarId} />
      <span style={{ display: 'inline-flex', flexDirection: 'column' }}>
        <span style={{ fontWeight: 500 }}>{name}</span>
        <span style={{ fontSize: 10, color: '#808080' }}>{isObserver ? 'Observer' : role}</span>
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
