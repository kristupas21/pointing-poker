import React from 'react';
import { useSelector } from 'react-redux';
import { makeResultByRoleSelector, makeResultSelector } from 'utils/selectors';
import { getVotesShownValue } from 'state/voteRound/voteRoundStateGetters';
import { getSessionPointValues, getSessionUseRoles } from 'state/session/sessionStateGetters';
import { calcClosestPoint } from 'utils/mathOps';

const resultSelector = makeResultSelector();
const resultByRoleSelector = makeResultByRoleSelector();

const VoteRoundResult: React.FC = () => {
  const result = useSelector(resultSelector);
  const resultByRole = useSelector(resultByRoleSelector);
  const votesShown = useSelector(getVotesShownValue);
  const useRoles = useSelector(getSessionUseRoles);
  const points = useSelector(getSessionPointValues);
  const closestPoint = calcClosestPoint(result, points);

  const renderResultByRole = ([key, value]) => (
    <div key={key}>
      {`${key}: ${votesShown ? (value || 0) : '-'}`}
    </div>
  );

  return (
    <div>
      <div>
        RESULT:
        {' '}
        {votesShown ? (result || 0) : '-'}
      </div>
      <div>
        CLOSEST:
        {' '}
        {votesShown ? closestPoint : '-'}
      </div>
      {useRoles && !!resultByRole.length && (
        <div>
          {resultByRole.map(renderResultByRole)}
        </div>
      )}
    </div>
  );
};

export default VoteRoundResult;
