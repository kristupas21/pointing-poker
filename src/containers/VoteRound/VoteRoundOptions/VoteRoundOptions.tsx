import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import sortBy from 'lodash/sortBy';
import { State } from '../../../types/global';
import Button from '../../../components/Button';

const mapStateToProps = (state: State) => ({
  options: state.session.voteOptions,
});

type ReduxProps = ConnectedProps<typeof connector>;
type Props = ReduxProps;

const VoteRoundOptions: React.FC<Props> = (props) => {
  const { options } = props;

  return (
    <ul>
      {sortBy(options, 'pos').map((o) => (
        <li key={o.value}>
          <Button>
            {o.value}
          </Button>
        </li>
      ))}
    </ul>
  );
};

const connector = connect(mapStateToProps);

export default connector(VoteRoundOptions);
