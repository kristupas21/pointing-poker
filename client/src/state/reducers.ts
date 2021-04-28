import { combineReducers } from 'redux';
import sessionReducer from 'state/session/sessionReducer';
import appReducer from 'state/app/appReducer';
import errorReducer from 'state/error/errorReducer';
import voteRoundReducer from 'state/voteRound/voteRoundReducer';
import notificationsReducer from 'state/notifications/notificationsReducer';
import routerReducer from 'state/router/routerReducer';
import formReducer from 'state/form/formReducer';

export default combineReducers({
  app: appReducer,
  error: errorReducer,
  form: formReducer,
  notifications: notificationsReducer,
  session: sessionReducer,
  router: routerReducer,
  voteRound: voteRoundReducer,
});
