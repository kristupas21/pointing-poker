import { select } from 'redux-saga/effects';
import { selectSessionUser } from '../session/sessionSelectors';

export function* userEmitter(sessionId: string) {
  const user = yield select(selectSessionUser);

  return { user, sessionId };
}
