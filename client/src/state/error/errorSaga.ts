import { put, takeLatest, select } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import { push } from 'connected-react-router';
import { getCurrentRoutePath } from 'state/router/routerStateGetters';
import { AppRoute } from 'utils/routes';
import { setErrorState, throwAppError } from './errorActions';
import { THROW_APP_ERROR } from './errorConstants';

export function* throwErrorSaga(action: ActionType<typeof throwAppError>) {
  const redirectPath = yield select(getCurrentRoutePath);
  const { errorId, errorPayload } = action.payload;

  yield put(setErrorState({ errorId, redirectPath, errorPayload }));
  yield put(push(AppRoute.Error));
}

export default function* errorSaga() {
  yield takeLatest(THROW_APP_ERROR, throwErrorSaga);
}
