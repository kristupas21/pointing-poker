import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { ActionType } from 'typesafe-actions';
import { v4 as uuidv4 } from 'uuid';
import { setSessionId, setSessionUser, startSession } from '../sessionActions';
import sessionApi from '../sessionApi';
import { START_SESSION } from '../sessionConstants';
import { ROUTE, getMatchParamRoute } from '../../../constants/routes';
import { throwAppError } from '../../error/errorActions';
import { User } from '../../../types/global';
import sessionStorage from '../../../utils/sessionStorage';

function* startSaga(action: ActionType<typeof startSession>) {
  const { formData, setSubmitting } = action.payload;
  const userId = uuidv4();

  const user: User = {
    ...formData,
    id: userId,
  };

  try {
    const { data: { session } } = yield call(sessionApi.start, user);
    yield call(sessionStorage.setItem, { user });
    yield put(setSessionUser(user));
    yield put(setSessionId(session.id));
    yield put(push(getMatchParamRoute(ROUTE.SESSION, { sessionId: session.id })));
  } catch (e) {
    yield put(throwAppError('error.unexpected'));
  } finally {
    yield call(setSubmitting, false);
  }
}

export default function* startSessionSaga() {
  yield takeLatest(START_SESSION, startSaga);
}
