import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Button from '../../components/Button';
import Text from '../../components/Text';
import { startSession as startSessionAction } from '../../state/session/sessionActions';

type ReduxProps = ConnectedProps<typeof connector>;

type Props = ReduxProps;

const StartSessionPage: React.FC<Props> = (props) => {
  const { startSession } = props;

  return (
    <Button onClick={startSession}>
      <Text id="session.start" />
    </Button>
  );
};

const mapDispatchToProps = {
  startSession: startSessionAction,
};

const connector = connect(null, mapDispatchToProps);

export default connector(StartSessionPage);
