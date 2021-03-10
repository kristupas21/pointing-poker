import { put, takeLatest, select } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import { LOCATION_CHANGE, push, LocationChangeAction } from 'connected-react-router';
import { getCurrentRoutePath } from 'state/router/routerStateGetters';
import { ROUTE } from 'constants/routes';
import { setErrorState, throwAppError } from './errorActions';
import { THROW_APP_ERROR } from './errorConstants';
import { getCurrentErrorId } from './errorStateGetters';

type ThrowAction = ActionType<typeof throwAppError>;

function* throwErrorSaga(action: ThrowAction) {
  const redirectPath = yield select(getCurrentRoutePath);
  const { payload: errorId } = action;

  yield put(setErrorState({ errorId, redirectPath }));
  yield put(push(ROUTE.ERROR));
}

function* clearErrorSaga(action: LocationChangeAction) {
  if (action.payload.location.pathname === ROUTE.ERROR) {
    return;
  }

  if (yield select(getCurrentErrorId)) {
    yield put(setErrorState(null));
  }
}

export default function* errorSaga() {
  yield takeLatest(THROW_APP_ERROR, throwErrorSaga);
  yield takeLatest(LOCATION_CHANGE, clearErrorSaga);
}
