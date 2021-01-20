import { connect } from 'react-redux';
import App from './App';
import { StateMapper } from '../../types/global';

const mapStateToProps: StateMapper = (state) => ({
  isLoading: state.app.isLoading,
});

export default connect(mapStateToProps)(App);
