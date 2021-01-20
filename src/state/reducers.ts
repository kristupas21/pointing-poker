import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from './history';
import sessionReducer from './session/sessionReducer';
import appReducer from './app/appReducer';

export default combineReducers({
  app: appReducer,
  session: sessionReducer,
  router: connectRouter(history),
});
