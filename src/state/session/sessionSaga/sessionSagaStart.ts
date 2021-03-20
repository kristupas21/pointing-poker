import { call, put, select, takeLatest } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import { push } from 'connected-react-router';
import storageService, { StorageKey } from 'utils/storageService';
import { AppRoute, getMatchParamRoute } from 'constants/routes';
import { ERROR_CODES } from 'constants/errorCodes';
import { throwAppError } from 'state/error/errorActions';
import { startSession } from '../sessionActions';
import sessionApi from '../sessionApi';
import { START_SESSION } from '../sessionConstants';
import { acquireCurrentUser } from './sessionSagaUtils';
import { getSessionPointValues, getSessionRoles } from '../sessionStateGetters';
import { normalizePointValues, removeEmptyRoles } from '../sessionUtils';

function* startSaga(action: ActionType<typeof startSession>) {
  const { payload: formData } = action;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { useRoles, sessionId: s, ...userData } = formData;
  const user = yield* acquireCurrentUser(userData);
  const statePointValues = yield select(getSessionPointValues);
  const stateRoles = yield select(getSessionRoles);
  const pointValues = normalizePointValues(statePointValues);
  const roles = removeEmptyRoles(stateRoles);
  const params = { user, useRoles, pointValues, roles };

  try {
    const { data: { sessionId } } = yield call(sessionApi.start, params);
    const route = getMatchParamRoute(AppRoute.Session, { sessionId });

    yield put(push(route));
    yield call(storageService.set, StorageKey.PointValues, pointValues);
    yield call(storageService.set, StorageKey.Roles, roles);
  } catch (e) {
    yield put(throwAppError(ERROR_CODES.UNEXPECTED));
  }
}

export default function* sessionSagaStart() {
  yield takeLatest(START_SESSION, startSaga);
}
