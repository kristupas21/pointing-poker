import { call, put, takeLatest } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import { push } from 'connected-react-router';
import { startSession } from '../sessionActions';
import sessionApi from '../sessionApi';
import { START_SESSION } from '../sessionConstants';
import { throwAppError } from '../../error/errorActions';
import { acquireCurrentUser } from './sessionSagaUtils';
import storageService from '../../../utils/storageService';
import { getMatchParamRoute, ROUTE } from '../../../constants/routes';
import { ERROR_CODES } from '../../../constants/errorCodes';

function* startSaga(action: ActionType<typeof startSession>) {
  const { payload: formData } = action;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { useRoles, sessionId: s, ...userData } = formData;
  const user = yield* acquireCurrentUser(userData);
  const params = { user, useRoles };

  try {
    const { data: { sessionId } } = yield call(sessionApi.start, params);
    yield put(push(getMatchParamRoute(ROUTE.SESSION, { sessionId })));

    if (useRoles) {
      yield call(storageService.set, sessionId, { useRoles: true }, true);
    }
  } catch (e) {
    yield put(throwAppError(ERROR_CODES.UNEXPECTED));
  }
}

export default function* sessionSagaStart() {
  yield takeLatest(START_SESSION, startSaga);
}
