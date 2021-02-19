import { call, put, takeLatest } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import { replace } from 'connected-react-router';
import { loadSession, setSessionId } from '../sessionActions';
import sessionApi from '../sessionApi';
import { LOAD_SESSION } from '../sessionConstants';
import { throwAppError } from '../../error/errorActions';
import { initVoteRound } from '../../voteRound/voteRoundActions';
import { ROUTE } from '../../../constants/routes';
import { ERROR_CODES } from '../../../constants/errorCodes';

function* loadSaga(action: ActionType<typeof loadSession>) {
  try {
    const { data } = yield call(sessionApi.load, action.payload);
    yield put(setSessionId(action.payload));
    yield put(initVoteRound(data.session.users, data.session.showVotes));
  } catch (e) {
    const error = e?.response?.data?.error;

    if (error === ERROR_CODES.NOT_FOUND) {
      yield put(replace(ROUTE.SESSION_NOT_FOUND, { sessionId: action.payload }));
    } else {
      yield put(throwAppError(error || 'error.unexpected'));
    }
  }
}

export default function* sessionSagaLoad() {
  yield takeLatest(LOAD_SESSION, loadSaga);
}
