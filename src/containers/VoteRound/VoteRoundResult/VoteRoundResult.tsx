import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { State } from '../../../types/global';
import { makeResultByRoleSelector, makeResultSelector } from '../../../utils/selectors';

const mapStateToProps = () => {
  const resultSelector = makeResultSelector();
  const resultByRoleSelector = makeResultByRoleSelector();

  return (state: State) => ({
    result: resultSelector(state),
    resultByRole: resultByRoleSelector(state),
    votesShown: state.voteRound.votesShown,
    useRoles: state.session.useRoles,
  });
};

type Props = ConnectedProps<typeof connector>;

const VoteRoundResult: React.FC<Props> = (props) => {
  const { result, votesShown, resultByRole, useRoles } = props;

  const renderResultByRole = ([key, value]) => (
    <div key={key}>
      {`${key}: ${votesShown ? (value || 0) : '-'}`}
    </div>
  );

  return (
    <div>
      <div>
        {votesShown ? (result || 0) : '-'}
      </div>
      {useRoles && (
        <div>
          {resultByRole.map(renderResultByRole)}
        </div>
      )}
    </div>
  );
};

const connector = connect(mapStateToProps);

export default connector(VoteRoundResult);
