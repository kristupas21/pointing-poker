import React, { CSSProperties } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import sortBy from 'lodash/sortBy';
import { State } from '../../../types/global';
import Button from '../../../components/Button';
import { setUserVoteValue } from '../../../state/voteRound/voteRoundActions';
import { wsSetUserVoteValue } from '../../../state/ws/wsActions';
import { makeCurrentUserVoteSelector } from '../../../utils/selectors';
import { POINT_VALUE_LIBRARIES } from '../../../utils/pointValues/constants';

const mapStateToProps = () => {
  const currentUserVoteSelector = makeCurrentUserVoteSelector();

  return (state: State) => ({
    pointValueLib: state.session.pointValueLib,
    userId: state.session.user?.id,
    currentUserVote: currentUserVoteSelector(state),
  });
};

const mapDispatchToProps = (dispatch) => ({
  setVoteValue: (userId: string, value: string) => {
    dispatch(setUserVoteValue(userId, value));
    dispatch(wsSetUserVoteValue(userId, value));
  }
});

type ReduxProps = ConnectedProps<typeof connector>;
type Props = ReduxProps;

const VoteRoundOptions: React.FC<Props> = (props) => {
  const { pointValueLib, setVoteValue, userId, currentUserVote } = props;
  const options = POINT_VALUE_LIBRARIES[pointValueLib];

  const getTempStyle = (value: string): CSSProperties => ({
    ...(value === currentUserVote) && { border: '2px solid' }
  });

  return (
    <ul>
      {sortBy(options, 'pos').map(({ value }) => (
        <li key={value} style={getTempStyle(value)}>
          <Button onClick={() => setVoteValue(userId, value)}>
            {value}
          </Button>
        </li>
      ))}
    </ul>
  );
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(VoteRoundOptions);
