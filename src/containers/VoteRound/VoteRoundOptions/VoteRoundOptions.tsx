import React from 'react';
import { useSelector } from 'react-redux';
import sortBy from 'lodash/sortBy';
import Button from 'components/Button';
import { setUserVoteValue } from 'state/voteRound/voteRoundActions';
import { wsSetUserVoteValue } from 'state/ws/wsActions';
import { makeCurrentUserVoteSelector } from 'utils/selectors';
import { getSessionPointValues, getSessionUserId } from 'state/session/sessionStateGetters';
import { useMappedDispatch } from 'utils/customHooks';
import classNames from 'classnames/bind';
import styles from './VoteRoundOptions.module.scss';

const cx = classNames.bind(styles);

const actions = {
  setVoteValue: [setUserVoteValue, wsSetUserVoteValue],
};

type A = { setVoteValue: typeof setUserVoteValue };

const currentUserVoteSelector = makeCurrentUserVoteSelector();

const VoteRoundOptions: React.FC = () => {
  const userId = useSelector(getSessionUserId);
  const pointValues = useSelector(getSessionPointValues);
  const currentUserVote = useSelector(currentUserVoteSelector);
  const { setVoteValue } = useMappedDispatch<A>(actions as unknown as A);

  return (
    <ul>
      {sortBy(pointValues, 'pos').map(({ value }) => (
        <li
          key={value}
          className={cx('item', { 'item--selected': value === currentUserVote })}
        >
          <Button onClick={() => setVoteValue(userId, value)}>
            {value}
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default VoteRoundOptions;
