import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga-test-plan/matchers';
import { MockResponse, MockState } from 'utils/test/types';
import { throwApiError } from 'utils/test/testUtils';
import { DEFAULT_USER_ROLES } from 'utils/userRoles/constants';
import { DEFAULT_POINT_VALUES } from 'utils/pointValues/constants';
import { push } from 'connected-react-router';
import { SessionFormData } from 'containers/SessionForms/types';
import storageService from 'utils/storageService/storageService';
import { StorageKey } from 'utils/storageService';
import { throwAppError } from 'state/error/errorActions';
import errorParser, { ERROR_CODES } from 'utils/errorParser';
import { setAppLoading } from 'state/app/appActions';

import { startSessionSaga } from '../sessionSagaStart';
import { startSession } from '../../sessionActions';
import { StartSessionParams, StartSessionResponse } from '../../sessionModel';
import sessionApi from '../../sessionApi';

describe('startSessionSaga', () => {
  const mockState: MockState = {
    session: {
      roles: DEFAULT_USER_ROLES,
      pointValues: DEFAULT_POINT_VALUES,
      user: {
        id: 'u-id',
      },
    },
  };

  const formData: SessionFormData = {
    useRoles: true,
    name: 'Gatsby',
    isObserver: false,
    role: 'Frontend',
  };

  const expectedParams: StartSessionParams = {
    useRoles: true,
    pointValues: DEFAULT_POINT_VALUES,
    roles: DEFAULT_USER_ROLES,
    user: {
      id: 'u-id',
      name: 'Gatsby',
      role: {
        id: 'Frontend', name: 'Frontend',
      },
      isObserver: false,
    },
  };

  it('calls endpoint, navigates to session route & stores values', async () => {
    const response: MockResponse<StartSessionResponse> = {
      data: {
        sessionId: 'gen-id',
      },
    };

    await expectSaga(startSessionSaga, startSession(formData))
      .withState(mockState)
      .provide([
        [call(sessionApi.start, expectedParams), response]
      ])
      .put(setAppLoading(true))
      .call(sessionApi.start, expectedParams)
      .put(push('/session/gen-id'))
      .call(storageService.set, StorageKey.PointValues, expectedParams.pointValues)
      .call(storageService.set, StorageKey.Roles, expectedParams.roles)
      .run();
  });

  it('handles api error', async () => {
    await expectSaga(startSessionSaga, startSession(formData))
      .withState(mockState)
      .provide([
        [
          call(sessionApi.start, expectedParams),
          throwApiError(),
        ]
      ])
      .put(setAppLoading(true))
      .call(sessionApi.start, expectedParams)
      .call(errorParser.parse, undefined)
      .put(throwAppError(ERROR_CODES.UNEXPECTED))
      .put(setAppLoading(false))
      .run();
  });
});
