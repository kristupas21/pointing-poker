import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga-test-plan/matchers';
import { MockResponse, MockState } from 'utils/test/types';
import { throwApiError } from 'utils/test/testUtils';
import { push } from 'connected-react-router';
import { SessionFormData } from 'containers/SessionForms/types';
import storageService from 'utils/storageService/storageService';
import { StorageKey } from 'utils/storageService';
import { throwAppError } from 'state/error/errorActions';
import errorParser, { ERROR_CODES } from 'utils/errorParser';
import { setAppLoading } from 'state/app/appActions';
import { MessageId } from 'lang';
import { startSessionSaga } from '../sessionSagaStart';
import { startSession } from '../../sessionActions';
import { StartSessionParams, StartSessionResponse } from '../../sessionModel';
import sessionApi from '../../sessionApi';

describe('startSessionSaga', () => {
  const mockState: MockState = {
    session: {
      roles: [
        'Frontend',
      ],
      pointValues: [],
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
    usePermissions: false,
  };

  const expectedParams: StartSessionParams = {
    useRoles: true,
    pointValues: [],
    roles: [
      'Frontend'
    ],
    user: {
      id: 'u-id',
      name: 'Gatsby',
      role: 'Frontend',
      isObserver: false,
    },
    usePermissions: false,
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
      .put(throwAppError(ERROR_CODES.UNEXPECTED as MessageId))
      .put(setAppLoading(false))
      .run();
  });
});
