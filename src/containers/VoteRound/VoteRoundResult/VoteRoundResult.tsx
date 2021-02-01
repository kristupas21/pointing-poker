import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { State } from '../../../types/global';
import { makeResultSelector } from '../../../utils/selectors';

type Props = ConnectedProps<typeof connector>;

const VoteRoundResult: React.FC<Props> = (props) => {
  const { result, votesShown } = props;

  return (
    <div style={{ border: '1px solid', minHeight: 30 }}>
      <span>
        {votesShown && (result || 0)}
      </span>
    </div>
  );
};

const mapStateToProps = () => {
  const resultSelector = makeResultSelector();

  return (state: State) => ({
    result: resultSelector(state),
    votesShown: state.voteRound.votesShown,
  });
};

const connector = connect(mapStateToProps);

export default connector(VoteRoundResult);
