import { call, put, select, takeLatest } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import { push } from 'connected-react-router';
import storageService, { StorageKey } from 'utils/storageService';
import { AppRoute, getMatchParamRoute } from 'utils/routes';
import { throwAppError } from 'state/error/errorActions';
import { setAppLoading } from 'state/app/appActions';
import errorParser from 'utils/errorParser';
import { setFormLoading } from 'state/form/formActions';
import { makeNormalizedSessionRolesSelector } from 'utils/selectors';
import { startSession } from '../sessionActions';
import sessionApi from '../sessionApi';
import { START_SESSION } from '../sessionConstants';
import { acquireCurrentUser } from './sessionSagaUtils';
import { getSessionPointValues } from '../sessionStateGetters';
import { normalizePointValues } from '../sessionUtils';
import { StartSessionResponse } from '../sessionModel';

const normalizedSessionRolesSelector = makeNormalizedSessionRolesSelector();

export function* startSessionSaga(action: ActionType<typeof startSession>) {
  const { useRoles, usePermissions, ...userProps } = action.payload;
  const roles = yield select(normalizedSessionRolesSelector);

  const params = {
    useRoles,
    usePermissions,
    pointValues: normalizePointValues(yield select(getSessionPointValues)),
    roles,
    user: yield* acquireCurrentUser(userProps),
  };

  yield put(setAppLoading(true));
  yield put(setFormLoading(true));

  try {
    const { data: { sessionId } }: StartSessionResponse = yield call(sessionApi.start, params);
    const route = getMatchParamRoute(AppRoute.Session, { sessionId });

    yield put(push(route));
    yield call(storageService.set, StorageKey.PointValues, params.pointValues);
    yield call(storageService.set, StorageKey.Roles, params.roles);
  } catch (e) {
    const { code, payload } = yield call(errorParser.parse, e);

    yield put(throwAppError(code, payload));
    yield put(setAppLoading(false));
  } finally {
    yield put(setFormLoading(false));
  }
}

export default function* sessionSagaStart() {
  yield takeLatest(START_SESSION, startSessionSaga);
}
