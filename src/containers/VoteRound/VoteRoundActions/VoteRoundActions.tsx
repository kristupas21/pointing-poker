import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Form, Formik } from 'formik';
import { State } from '../../../types/global';
import {
  clearVotes as clearVotesAction,
  hideVotes as hideVotesAction,
  showVotes as showVotesAction,
} from '../../../state/voteRound/voteRoundActions';
import {
  wsShowVotes,
  wsHideVotes, wsClearVotes
} from '../../../state/ws/wsActions';
import Button from '../../../components/Button';
import Text from '../../../components/Text';
import { FieldType, FormField } from '../../../components/Form';

const mapStateToProps = (state: State) => ({
  votesShown: state.voteRound.votesShown,
});

const mapDispatchToProps = (dispatch) => ({
  clearVotes: () => {
    dispatch(clearVotesAction());
    dispatch(wsClearVotes());
  },
  hideVotes: () => {
    dispatch(hideVotesAction());
    dispatch(wsHideVotes());
  },
  showVotes: () => {
    dispatch(showVotesAction());
    dispatch(wsShowVotes());
  },
});

type ReduxProps = ConnectedProps<typeof connector>;
type Props = ReduxProps;

const VoteRoundActions: React.FC<Props> = (props) => {
  const { clearVotes, hideVotes, showVotes, votesShown } = props;

  const handleShowHideClick = () => {
    if (votesShown) {
      hideVotes();
    } else {
      showVotes();
    }
  };

  const showHideTextId = votesShown
    ? 'voteRound.action.hideVotes'
    : 'voteRound.action.showVotes';

  return (
    <div>
      <Button onClick={handleShowHideClick}>
        <Text id={showHideTextId} />
      </Button>
      <Button onClick={clearVotes}>
        <Text id="voteRound.action.nextRound" />
      </Button>
      <Formik initialValues={{ topic: '' }} onSubmit={undefined}>
        <Form>
          <FormField
            name="topic"
            type={FieldType.Input}
            label={<Text id="voteRound.field.topic.label" />}
          />
        </Form>
      </Formik>
    </div>
  );
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(VoteRoundActions);
