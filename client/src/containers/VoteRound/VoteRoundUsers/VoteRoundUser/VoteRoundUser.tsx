import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { getSessionUseRoles } from 'state/session/sessionStateGetters';
import { User } from 'globalTypes';
import Avatar from 'components/Avatar';
import { useText } from 'utils/customHooks';
import { POINT_VALUE_INFINITY, POINT_VALUE_UNKNOWN } from 'utils/pointValues/constants';
import Icon, { IconId } from 'components/Icon';
import styles from './VoteRoundUser.module.scss';

const cx = classNames.bind(styles);

interface Props extends User {
  showVote: boolean;
  isMe?: boolean;
  className?: string;
}

const VoteRoundUser: React.FC<Props> = (props) => {
  const { avatarId, name, voteValue, showVote, isObserver, role, isMe, className } = props;

  const useRoles = useSelector(getSessionUseRoles);
  const text = useText();
  const hasVoted = voteValue != null;

  const waiting = (
    <span className={cx('user__waiting')}>
      {text('voteRound.waiting')}
    </span>
  ); // TODO animate dots

  const renderValue = () => (hasVoted
    ? <span className={cx('user__points')}>{getDisplayValue(voteValue)}</span>
    : waiting
  );

  const renderHiddenValue = () => (hasVoted
    ? <Icon className={cx('user__done')} height={20} width={20} id={IconId.CheckmarkSmall} />
    : waiting
  );

  const wrapperClasses = cx(
    'user',
    { 'user--me': isMe },
    { 'user--voted': hasVoted },
    { 'user--observer': isObserver },
    className
  );

  return (
    <div className={wrapperClasses}>
      <span className={cx('user__info')}>
        <Avatar id={avatarId} className={cx('user__avatar')} />
        <span className={cx('user__text')}>
          <span className={cx('user__name')}>{name}</span>
          <span className={cx('user__role')}>{isObserver ? 'Observer' : (useRoles && role)}</span>
        </span>
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
