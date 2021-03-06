import React from 'react';
import { useSelector } from 'react-redux';
import { makeResultByRoleSelector, makeResultSelector } from 'utils/selectors';
import { getVotesShownValue } from 'state/voteRound/voteRoundStateGetters';
import { getSessionUseRoles } from 'state/session/sessionStateGetters';
import { useText } from 'utils/customHooks';

const _resultStyle = {
  display: 'inline-flex',
  borderRadius: '50%',
  border: '1px solid',
  width: 35,
  height: 35,
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 5,
};

const resultSelector = makeResultSelector();

const resultByRoleSelector = makeResultByRoleSelector();

const VoteRoundResult: React.FC = () => {
  const result = useSelector(resultSelector);
  const resultByRole = useSelector(resultByRoleSelector);
  const votesShown = useSelector(getVotesShownValue);
  const useRoles = useSelector(getSessionUseRoles);
  const text = useText();

  const conditionalDisplay = (v: any) => (votesShown
    ? <span style={_resultStyle}>{v}</span>
    : '-');

  const renderResultByRole = ([key, value]) => (
    <div key={key}>
      {key}
      {conditionalDisplay(value || 0)}
    </div>
  );

  return (
    <div>
      <div>
        {text('voteRound.average')}
        {conditionalDisplay(result || 0)}
      </div>
      {useRoles && resultByRole?.map(renderResultByRole)}
    </div>
  );
};

export default VoteRoundResult;
