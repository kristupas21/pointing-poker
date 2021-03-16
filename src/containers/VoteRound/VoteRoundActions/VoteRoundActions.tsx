import React, { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { Form, Formik } from 'formik';
import {
  resetVoteRound as resetVoteRoundAction,
  hideVotes as hideVotesAction,
  showVotes as showVotesAction,
  setVoteRoundTopic as setVoteRoundTopicAction,
} from 'state/voteRound/voteRoundActions';
import {
  wsShowVotes,
  wsHideVotes,
  wsResetVoteRound,
  wsSetVoteRoundTopic,
} from 'state/ws/wsActions';
import Button from 'components/Button';
import { FieldType, FormField, FieldSize } from 'components/Form';
import { getVoteRoundState } from 'state/voteRound/voteRoundStateGetters';
import { useMappedDispatch, useText } from 'utils/customHooks';

const actions = {
  resetVoteRound: [resetVoteRoundAction, wsResetVoteRound],
  hideVotes: [hideVotesAction, wsHideVotes],
  showVotes: [showVotesAction, wsShowVotes],
  setVoteRoundTopic: [setVoteRoundTopicAction, wsSetVoteRoundTopic],
};

type A = {
  resetVoteRound: typeof resetVoteRoundAction,
  hideVotes: typeof hideVotesAction,
  showVotes: typeof showVotesAction,
  setVoteRoundTopic: typeof setVoteRoundTopicAction,
}

export interface VoteRoundFormData {
  topic: string;
}

const VoteRoundActions: React.FC = () => {
  const text = useText();
  const { votesShown, currentTopic } = useSelector(getVoteRoundState);

  const { resetVoteRound, hideVotes, showVotes, setVoteRoundTopic } =
      useMappedDispatch<A>(actions as unknown as A);

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
        {text(showHideTextId)}
      </Button>
      <Button onClick={resetVoteRound}>
        {text('voteRound.action.nextRound')}
      </Button>
      <Formik
        initialValues={initialValues}
        onSubmit={undefined}
      >
        <Form>
          <FormField
            name="topic"
            type={FieldType.Input}
            label={text('voteRound.field.topic.label')}
            value={currentTopic || ''}
            onChange={handleTopicChange}
            size={FieldSize.Large}
          />
        </Form>
      </Formik>
    </div>
  );
};

export default VoteRoundActions;
