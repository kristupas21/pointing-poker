import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from './history';
import sessionReducer from './session/sessionReducer';

export default combineReducers({
  session: sessionReducer,
  router: connectRouter(history),
});
