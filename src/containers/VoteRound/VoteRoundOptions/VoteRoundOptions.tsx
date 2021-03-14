import React, { CSSProperties } from 'react';
import { useSelector } from 'react-redux';
import sortBy from 'lodash/sortBy';
import Button from 'components/Button';
import { setUserVoteValue } from 'state/voteRound/voteRoundActions';
import { wsSetUserVoteValue } from 'state/ws/wsActions';
import { makeCurrentUserVoteSelector } from 'utils/selectors';
import { getSessionPointValues, getSessionUserId } from 'state/session/sessionStateGetters';
import { useMappedDispatch } from 'utils/customHooks';

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

  const getTempStyle = (value: string): CSSProperties => ({
    ...(value === currentUserVote) && { border: '2px solid' }
  });

  return (
    <ul>
      {sortBy(pointValues, 'pos').map(({ value }) => (
        <li key={value} style={getTempStyle(value)}>
          <Button onClick={() => setVoteValue(userId, value)}>
            {value}
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default VoteRoundOptions;
