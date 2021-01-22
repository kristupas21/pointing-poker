import { connect } from 'react-redux';
import { createSession } from '../../state/session/sessionActions';
import CreateSessionPage from './CreateSessionPage';

const mapDispatchToProps = {
  createSession,
};

export default connect(null, mapDispatchToProps)(CreateSessionPage);
