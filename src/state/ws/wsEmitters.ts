import { select } from 'redux-saga/effects';
import { getSessionUser, getSessionUserId } from 'state/session/sessionStateGetters';
import { User } from '../../types/global';

/**
 * Function args are payload.
 * Return value is message.body
 */

export function* userEmitter(sessionId: string) {
  const user = yield select(getSessionUser);

  return { user, sessionId };
}

export function* modifyUserEmitter(params: Partial<User>) {
  const userId = yield select(getSessionUserId);

  return { userId, params };
}
