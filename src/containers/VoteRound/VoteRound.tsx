import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import VoteRoundActions from './VoteRoundActions';
import VoteRoundOptions from './VoteRoundOptions';
import VoteRoundResult from './VoteRoundResult';
import VoteRoundUsers from './VoteRoundUsers';
import { State } from '../../types/global';

const mapStateToProps = (state: State) => ({
  user: state.session.user,
});

type ReduxProps = ConnectedProps<typeof connector>;
type Props = ReduxProps;

const VoteRound: React.FC<Props> = ({ user }) => (
  <div>
    <VoteRoundActions />
    {user.isObserver || <VoteRoundOptions />}
    <VoteRoundResult />
    <VoteRoundUsers />
  </div>
);

const connector = connect(mapStateToProps);

export default connector(VoteRound);
