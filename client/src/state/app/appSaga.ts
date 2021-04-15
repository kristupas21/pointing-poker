import renderNotification, { NotificationContent } from 'utils/notificationContent';
import { put, takeLeading } from 'redux-saga/effects';
import { pushNotification } from '../notifications/notificationsActions';
import { UNLOCK_APP_HIDDEN_FEATS } from './appConstants';

function* hiddenFeatsNotificationSaga() {
  yield put(pushNotification(renderNotification(NotificationContent.HiddenFeats)));
}

export default function* appSaga() {
  yield takeLeading(UNLOCK_APP_HIDDEN_FEATS, hiddenFeatsNotificationSaga);
}
