import { select, call, put } from 'redux-saga/effects';
import { User } from '../../../types/global';
import storageService from '../../../utils/storageService';
import { setSessionUser } from '../sessionActions';
import { createUser } from '../sessionUtils';
import { getSessionUserId } from '../sessionStateGetters';

export function* acquireCurrentUser(userProps?: Partial<User>): Generator<unknown, User> {
  const stateId = yield select(getSessionUserId);
  const props = { ...userProps, id: stateId || undefined } as User;
  const newUser = createUser(props);

  yield call(storageService.set, 'user', newUser, true);
  yield put(setSessionUser(newUser));

  return newUser;
}
