import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { getSessionUserIsObserver } from 'state/session/sessionStateGetters';
import VoteRoundActions from './VoteRoundActions';
import VoteRoundOptions from './VoteRoundOptions';
import VoteRoundResult from './VoteRoundResult';
import VoteRoundUsers from './VoteRoundUsers';
import styles from './VoteRound.module.scss';

const cx = classNames.bind(styles);

const VoteRound: React.FC = () => {
  const isObserver = useSelector(getSessionUserIsObserver);

  return (
    <div className={cx('vote-round')}>
      <div>
        {isObserver || <VoteRoundOptions />}
        <VoteRoundActions />
        <VoteRoundResult />
      </div>
      <VoteRoundUsers />
    </div>
  );
};

export default VoteRound;
