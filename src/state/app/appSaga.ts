import { put, select, takeLeading } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'connected-react-router';
import { getSidebarOpenValue } from './appStateGetters';
import { setAppSidebarOpen } from './appActions';

function* closeSidebar() {
  if (yield select(getSidebarOpenValue)) {
    yield put(setAppSidebarOpen(false));
  }
}

export default function* appSaga() {
  yield takeLeading(LOCATION_CHANGE, closeSidebar);
}
