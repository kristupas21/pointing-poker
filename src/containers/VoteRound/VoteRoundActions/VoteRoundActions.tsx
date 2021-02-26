import React, { ChangeEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Form, Formik } from 'formik';
import { State } from '../../../types/global';
import {
  resetVoteRound as resetVoteRoundAction,
  hideVotes as hideVotesAction,
  showVotes as showVotesAction,
  setVoteRoundTopic as setVoteRoundTopicAction,
} from '../../../state/voteRound/voteRoundActions';
import {
  wsShowVotes,
  wsHideVotes,
  wsResetVoteRound,
  wsSetVoteRoundTopic,
} from '../../../state/ws/wsActions';
import Button from '../../../components/Button';
import Text from '../../../components/Text';
import { FieldType, FormField } from '../../../components/Form';

const mapStateToProps = (state: State) => ({
  votesShown: state.voteRound.votesShown,
  currentTopic: state.voteRound.currentTopic,
});

const mapDispatchToProps = (dispatch) => ({
  resetVoteRound: () => {
    dispatch(resetVoteRoundAction());
    dispatch(wsResetVoteRound());
  },
  hideVotes: () => {
    dispatch(hideVotesAction());
    dispatch(wsHideVotes());
  },
  showVotes: () => {
    dispatch(showVotesAction());
    dispatch(wsShowVotes());
  },
  setVoteRoundTopic: (t: string) => {
    dispatch(setVoteRoundTopicAction(t));
    dispatch(wsSetVoteRoundTopic(t));
  }
});

export interface VoteRoundFormData {
  topic: string;
}

type ReduxProps = ConnectedProps<typeof connector>;
type Props = ReduxProps;

const VoteRoundActions: React.FC<Props> = (props) => {
  const { resetVoteRound, hideVotes, showVotes, votesShown, currentTopic, setVoteRoundTopic } = props;

  const initialValues: VoteRoundFormData = {
    topic: currentTopic || '',
  };

  const handleTopicChange = (e: ChangeEvent<HTMLInputElement>) =>
    setVoteRoundTopic(e.target.value);

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
      <Button onClick={resetVoteRound}>
        <Text id="voteRound.action.nextRound" />
      </Button>
      <Formik
        initialValues={initialValues}
        onSubmit={undefined}
      >
        <Form>
          <FormField
            name="topic"
            type={FieldType.Input}
            label={<Text id="voteRound.field.topic.label" />}
            value={currentTopic || ''}
            onChange={handleTopicChange}
          />
        </Form>
      </Formik>
    </div>
  );
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(VoteRoundActions);
