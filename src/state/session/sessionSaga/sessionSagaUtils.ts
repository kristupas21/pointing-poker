import { select, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { User } from '../../../types/global';
import storageService from '../../../utils/storageService';
import { setSessionUser } from '../sessionActions';
import { createUser } from '../sessionUtils';
import { getMatchParamRoute, ROUTE } from '../../../constants/routes';
import { getSessionUserId } from '../sessionStateGetters';

export function* acquireCurrentUserId(userProps?: Partial<User>): Generator<unknown, string> {
  const stateValue = yield select(getSessionUserId);

  if (stateValue) {
    return stateValue as string;
  }

  const newUser = createUser(userProps);

  yield call(storageService.set, 'user', newUser);
  yield put(setSessionUser(newUser));

  return newUser.id;
}

export function* beginUserSession(user: User, sessionId: string): Generator<unknown, void> {
  yield call(storageService.set, 'user', user);
  yield put(setSessionUser(user));
  yield put(push(getMatchParamRoute(ROUTE.SESSION, { sessionId })));
}
