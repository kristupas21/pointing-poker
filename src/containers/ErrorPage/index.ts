import { connect } from 'react-redux';
import { StateMapper } from '../../types/global';
import ErrorPage from './ErrorPage';

const mapStateToProps: StateMapper = (state) => ({
  errorId: state.error.errorId,
  redirectPath: state.error.redirectPath,
});

export default connect(mapStateToProps)(ErrorPage);
