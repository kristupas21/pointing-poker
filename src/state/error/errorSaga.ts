import { put, takeLatest, select } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import { LOCATION_CHANGE, push, LocationChangeAction } from 'connected-react-router';
import { setErrorState, throwAppError } from './errorActions';
import { getCurrentRoutePath } from '../../utils/routerUtils';
import { getCurrentErrorId, THROW_APP_ERROR } from './errorConstants';
import { ROUTE } from '../../constants/routes';

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
