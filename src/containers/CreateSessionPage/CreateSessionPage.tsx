import React from 'react';
import Button from '../../components/Button';
import Text from '../../components/Text';
import { CreateSession } from '../../state/session/sessionTypes';

interface Props {
  createSession: CreateSession;
}

const CreateSessionPage: React.FC<Props> = (props) => {
  const { createSession } = props;

  return (
    <Button onClick={createSession}>
      <Text id="session.create" />
    </Button>
  );
};

export default CreateSessionPage;
