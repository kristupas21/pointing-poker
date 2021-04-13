import { select, call, put } from 'redux-saga/effects';
import mergeWith from 'lodash/mergeWith';
import storageService, { StorageKey } from 'utils/storageService';
import { User } from 'globalTypes';
import { setSessionUser } from '../sessionActions';
import { createUser } from '../sessionUtils';
import { getSessionUser } from '../sessionStateGetters';

function mergeTruthy(x: any, y: any) {
  return y != null && y !== '' ? y : x;
}

export function* acquireCurrentUser(userProps?: Partial<User>): Generator<unknown, User> {
  const user = yield select(getSessionUser);
  const props = mergeWith(user, userProps, mergeTruthy);
  const newUser = createUser(props);

  yield call(storageService.set, StorageKey.User, newUser, true);
  yield put(setSessionUser(newUser));

  return newUser;
}
