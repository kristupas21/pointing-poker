import React from 'react';
import { useSelector } from 'react-redux';
import sortBy from 'lodash/sortBy';
import Button, { ButtonVariant } from 'components/Button';
import { setUserVoteValue } from 'state/voteRound/voteRoundActions';
import { wsSetUserVoteValue } from 'state/ws/wsActions';
import { makeCurrentUserVoteSelector } from 'utils/selectors';
import { getSessionPointValues, getSessionUser } from 'state/session/sessionStateGetters';
import { useMappedDispatch } from 'utils/customHooks';
import { PointValue } from 'utils/pointValues/types';
import classNames from 'classnames/bind';
import useKeyboardVoting from '_develop/useKeyboardVoting';
import styles from './VoteRoundOptions.module.scss';

const cx = classNames.bind(styles);

type Actions = {
  setVoteValue: typeof setUserVoteValue
};

const actions = {
  setVoteValue: [setUserVoteValue, wsSetUserVoteValue],
} as unknown as Actions;

const currentUserVoteSelector = makeCurrentUserVoteSelector();

const VoteRoundOptions: React.FC = () => {
  const user = useSelector(getSessionUser);
  const pointValues = useSelector(getSessionPointValues);
  const currentUserVote = useSelector(currentUserVoteSelector);
  const { setVoteValue } = useMappedDispatch(actions);

  const renderButton = ({ value }: PointValue) => {
    const isSelected = value === currentUserVote;
    const handleClick = () => setVoteValue(user, value);

    return (
      <li
        key={value}
        className={cx('item', { 'item--selected': isSelected })}
      >
        <Button variant={ButtonVariant.Primary} className={cx('votes__button')} round onClick={handleClick} selected={isSelected}>
          {value}
        </Button>
      </li>
    );
  };

  const handleKeyboardInput = (value: string): void => {
    const point = pointValues.find((p) => p.value === value);

    if (point && point.value !== currentUserVote) {
      setVoteValue(user, point.value);
    }
  };

  useKeyboardVoting(handleKeyboardInput);

  return (
    <ul className={cx('votes')}>
      {sortBy(pointValues, 'pos').map(renderButton)}
    </ul>
  );
};

export default VoteRoundOptions;
