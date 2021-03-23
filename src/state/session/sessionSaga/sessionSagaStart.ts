import { call, put, select, takeLatest } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import { push } from 'connected-react-router';
import storageService, { StorageKey } from 'utils/storageService';
import { AppRoute, getMatchParamRoute } from 'constants/routes';
import { ERROR_CODES } from 'constants/errorCodes';
import { throwAppError } from 'state/error/errorActions';
import { findRoleById } from 'utils/userRoles/utils';
import { setAppLoading } from 'state/app/appActions';
import { startSession } from '../sessionActions';
import sessionApi from '../sessionApi';
import { START_SESSION } from '../sessionConstants';
import { acquireCurrentUser } from './sessionSagaUtils';
import { getSessionPointValues, getSessionRoles } from '../sessionStateGetters';
import { normalizePointValues, removeEmptyRoles } from '../sessionUtils';

function* startSaga(action: ActionType<typeof startSession>) {
  const { useRoles, role, ...rest } = action.payload;
  const stateRoles = yield select(getSessionRoles);

  const params = {
    useRoles,
    pointValues: normalizePointValues(yield select(getSessionPointValues)),
    roles: removeEmptyRoles(stateRoles),
    user: yield* acquireCurrentUser({
      ...rest,
      role: findRoleById(stateRoles, role)
    }),
  };

  yield put(setAppLoading(true));

  try {
    const { data: { sessionId } } = yield call(sessionApi.start, params);
    const route = getMatchParamRoute(AppRoute.Session, { sessionId });

    yield put(push(route));
    yield call(storageService.set, StorageKey.PointValues, params.pointValues);
    yield call(storageService.set, StorageKey.Roles, params.roles);
  } catch (e) {
    yield put(throwAppError(ERROR_CODES.UNEXPECTED));
    yield put(setAppLoading(false));
  }
}

export default function* sessionSagaStart() {
  yield takeLatest(START_SESSION, startSaga);
}
