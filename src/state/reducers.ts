import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from './history';
import sessionReducer from './session/sessionReducer';
import appReducer from './app/appReducer';
import errorReducer from './error/errorReducer';

export default combineReducers({
  app: appReducer,
  error: errorReducer,
  session: sessionReducer,
  router: connectRouter(history),
});
