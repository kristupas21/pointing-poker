import React, { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { Form, Formik } from 'formik';
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
import { getVoteRoundState } from '../../../state/voteRound/voteRoundStateGetters';
import { useMappedDispatch } from '../../../utils/customHooks';

const mapDispatchToProps = {
  resetVoteRound: [resetVoteRoundAction, wsResetVoteRound],
  hideVotes: [hideVotesAction, wsHideVotes],
  showVotes: [showVotesAction, wsShowVotes],
  setVoteRoundTopic: [setVoteRoundTopicAction, wsSetVoteRoundTopic],
};

type M = {
  resetVoteRound: typeof resetVoteRoundAction,
  hideVotes: typeof hideVotesAction,
  showVotes: typeof showVotesAction,
  setVoteRoundTopic: typeof setVoteRoundTopicAction,
}

export interface VoteRoundFormData {
  topic: string;
}

const VoteRoundActions: React.FC = () => {
  const { resetVoteRound, hideVotes, showVotes, setVoteRoundTopic } =
      useMappedDispatch<M>(mapDispatchToProps as unknown as M);

  const { votesShown, currentTopic } = useSelector(getVoteRoundState);

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

export default VoteRoundActions;
