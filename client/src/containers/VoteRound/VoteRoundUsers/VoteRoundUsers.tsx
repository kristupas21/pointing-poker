import React from 'react';
import { useSelector } from 'react-redux';
import sortBy from 'lodash/sortBy';
import classNames from 'classnames/bind';
import { User } from 'globalTypes';
import { getVoteRoundUsers, getVotesShownValue } from 'state/voteRound/voteRoundStateGetters';
import { getSessionUserId } from 'state/session/sessionStateGetters';
import VoteRoundUser from './VoteRoundUser';
import styles from './VoteRoundUsers.module.scss';

const cx = classNames.bind(styles);

const VoteRoundUsers: React.FC = () => {
  const users = useSelector(getVoteRoundUsers);
  const votesShown = useSelector(getVotesShownValue);
  const userId = useSelector(getSessionUserId);

  const participants = users.filter((user) => !user.isObserver);
  const observers = users.filter((user) => user.isObserver);

  const renderUserList = (list: User[]) => (
    <ul className={cx('users__list')}>
      {sortBy(list, 'name').map((u) => (
        <li className={cx('users__item')} key={u.id}>
          <VoteRoundUser showVote={votesShown} {...u} isMe={userId === u.id} />
        </li>
      ))}
    </ul>
  );

  return (
    <div className={cx('users')}>
      {renderUserList(participants)}
      {renderUserList(observers)}
    </div>
  );
};

export default VoteRoundUsers;
