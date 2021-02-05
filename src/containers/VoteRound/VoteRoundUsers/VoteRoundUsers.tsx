import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import sortBy from 'lodash/sortBy';
import { State } from '../../../types/global';
import VoteRoundUser from './VoteRoundUser';

const mapStateToProps = (state: State) => ({
  users: state.voteRound.users,
  votesShown: state.voteRound.votesShown,
});

type ReduxProps = ConnectedProps<typeof connector>;
type Props = ReduxProps;

const VoteRoundUsers: React.FC<Props> = (props) => {
  const { users, votesShown } = props;

  return (
    <ul>
      {sortBy(users, 'name').map((u) => (
        <li key={u.id}>
          <VoteRoundUser showVote={votesShown} {...u} />
        </li>
      ))}
    </ul>
  );
};

const connector = connect(mapStateToProps);

export default connector(VoteRoundUsers);
