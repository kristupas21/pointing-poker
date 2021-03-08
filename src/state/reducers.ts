import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from './history';
import sessionReducer from './session/sessionReducer';
import appReducer from './app/appReducer';
import errorReducer from './error/errorReducer';
import modalReducer from './modal/modalReducer';
import voteRoundReducer from './voteRound/voteRoundReducer';
import notificationsReducer from './notifications/notificationsReducer';

export default combineReducers({
  app: appReducer,
  error: errorReducer,
  modal: modalReducer,
  notifications: notificationsReducer,
  session: sessionReducer,
  router: connectRouter(history),
  voteRound: voteRoundReducer,
});
