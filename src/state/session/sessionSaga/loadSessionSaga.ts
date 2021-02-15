import { call, put, takeLatest } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import { replace } from 'connected-react-router';
import { loadSession, setSessionId } from '../sessionActions';
import sessionApi from '../sessionApi';
import { LOAD_SESSION } from '../sessionConstants';
import { throwAppError } from '../../error/errorActions';
import { initVoteRound } from '../../voteRound/voteRoundActions';
import { ROUTE } from '../../../constants/routes';

function* loadSaga(action: ActionType<typeof loadSession>) {
  try {
    const { data } = yield call(sessionApi.load, action.payload);
    yield put(setSessionId(action.payload));
    yield put(initVoteRound(data.session.users));
  } catch (e) {
    if (e.response.status === 400) {
      yield put(replace(ROUTE.SESSION_NOT_FOUND, { sessionId: action.payload }));
    } else {
      yield put(throwAppError('error.unexpected'));
    }
  }
}

export default function* joinSessionSaga() {
  yield takeLatest(LOAD_SESSION, loadSaga);
}
