import { select, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { User } from '../../../types/global';
import storageService from '../../../utils/storageService';
import { setSessionUser } from '../sessionActions';
import { createEmptyUser } from '../sessionUtils';
import { getMatchParamRoute, ROUTE } from '../../../constants/routes';
import { selectSessionUserId } from '../sessionSelectors';

export function* acquireCurrentUserId(): Generator<unknown, string> {
  const stateValue = yield select(selectSessionUserId);

  if (stateValue) {
    return stateValue as string;
  }

  const emptyUser = createEmptyUser();

  yield call(storageService.setItem, { user: emptyUser });
  yield put(setSessionUser(emptyUser));

  return emptyUser.id;
}

export function* beginUserSession(user: User, sessionId: string): Generator<unknown, void> {
  yield call(storageService.setItem, { user });
  yield put(setSessionUser(user));
  yield put(push(getMatchParamRoute(ROUTE.SESSION, { sessionId })));
}
