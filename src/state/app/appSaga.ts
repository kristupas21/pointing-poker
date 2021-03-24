import { put, select, takeLeading } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'connected-react-router';
import { getAppSidebarOpen } from './appStateGetters';
import { setAppSidebarOpen } from './appActions';

export function* closeSidebarSaga() {
  if (yield select(getAppSidebarOpen)) {
    yield put(setAppSidebarOpen(false));
  }
}

export default function* appSaga() {
  yield takeLeading(LOCATION_CHANGE, closeSidebarSaga);
}
