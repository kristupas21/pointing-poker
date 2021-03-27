import { put, takeLatest, select } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import { LOCATION_CHANGE, push, LocationChangeAction } from 'connected-react-router';
import { getCurrentRoutePath } from 'state/router/routerStateGetters';
import { AppRoute } from 'utils/routes';
import { setErrorState, throwAppError } from './errorActions';
import { THROW_APP_ERROR } from './errorConstants';
import { getCurrentErrorId } from './errorStateGetters';

export function* throwErrorSaga(action: ActionType<typeof throwAppError>) {
  const redirectPath = yield select(getCurrentRoutePath);
  const { payload: errorId } = action;

  yield put(setErrorState({ errorId, redirectPath }));
  yield put(push(AppRoute.Error));
}

export function* clearErrorSaga(action: LocationChangeAction) {
  if (action.payload.location.pathname === AppRoute.Error) {
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
