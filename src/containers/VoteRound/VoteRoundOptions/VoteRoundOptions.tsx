import React from 'react';
import { useSelector } from 'react-redux';
import sortBy from 'lodash/sortBy';
import Button from 'components/Button';
import { setUserVoteValue } from 'state/voteRound/voteRoundActions';
import { wsSetUserVoteValue } from 'state/ws/wsActions';
import { makeCurrentUserVoteSelector } from 'utils/selectors';
import { getSessionPointValues, getSessionUser } from 'state/session/sessionStateGetters';
import { useMappedDispatch } from 'utils/customHooks';
import { PointValue } from 'utils/pointValues/types';
import classNames from 'classnames/bind';
import styles from './VoteRoundOptions.module.scss';

const cx = classNames.bind(styles);

const actions = {
  setVoteValue: [setUserVoteValue, wsSetUserVoteValue],
};

type A = { setVoteValue: typeof setUserVoteValue };

const currentUserVoteSelector = makeCurrentUserVoteSelector();

const VoteRoundOptions: React.FC = () => {
  const user = useSelector(getSessionUser);
  const pointValues = useSelector(getSessionPointValues);
  const currentUserVote = useSelector(currentUserVoteSelector);
  const { setVoteValue } = useMappedDispatch<A>(actions as unknown as A);

  const renderButton = ({ value }: PointValue) => {
    const isSelected = value === currentUserVote;
    const handleClick = () => setVoteValue(user, value);

    return (
      <li
        key={value}
        className={cx('item', { 'item--selected': isSelected })}
      >
        <Button onClick={handleClick} disabled={isSelected}>
          {value}
        </Button>
      </li>
    );
  };

  return (
    <ul>
      {sortBy(pointValues, 'pos').map(renderButton)}
    </ul>
  );
};

export default VoteRoundOptions;
