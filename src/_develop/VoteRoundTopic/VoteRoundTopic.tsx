import React, { ChangeEvent } from 'react';
import { Form, Formik } from 'formik';
import { useSelector } from 'react-redux';
import { FieldSize, FieldType, FormField } from 'components/Form';
import { getVoteRoundTopic } from 'state/voteRound/voteRoundStateGetters';
import { setVoteRoundTopic as setVoteRoundTopicAction } from 'state/voteRound/voteRoundActions';
import { wsSetVoteRoundTopic } from 'state/ws/wsActions';
import { useMappedDispatch, useText } from 'utils/customHooks';

type Actions = {
  setVoteRoundTopic: typeof setVoteRoundTopicAction,
}

const actions = {
  setVoteRoundTopic: [setVoteRoundTopicAction, wsSetVoteRoundTopic],
} as unknown as Actions;

interface VoteRoundFormData {
  topic: string;
}

const VoteRoundTopic: React.FC = () => {
  const currentTopic = useSelector(getVoteRoundTopic);
  const { setVoteRoundTopic } = useMappedDispatch(actions);
  const text = useText();

  const initialValues: VoteRoundFormData = {
    topic: currentTopic || '',
  };

  const handleTopicChange = (e: ChangeEvent<HTMLInputElement>) =>
    setVoteRoundTopic(e.target.value);

  return (
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
          fieldSize={FieldSize.Large}
        />
      </Form>
    </Formik>
  );
};

export default VoteRoundTopic;
