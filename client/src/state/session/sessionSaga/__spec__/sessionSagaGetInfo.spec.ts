import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga-test-plan/matchers';
import { MockResponse } from 'utils/test/types';
import { throwApiError } from 'utils/test/testUtils';
import errorParser, { ERROR_CODES } from 'utils/errorParser';
import storageService from 'utils/storageService/storageService';
import { StorageKey } from 'utils/storageService';
import { throwAppError } from 'state/error/errorActions';
import { MessageId } from 'lang';
import { getSessionInfoSaga } from '../sessionSagaGetInfo';
import { getSessionInfo, setSessionParams } from '../../sessionActions';
import sessionApi from '../../sessionApi';
import { SessionInfoResponse } from '../../sessionModel';

describe('getSessionInfoSaga', () => {
  const callback = jest.fn();
  const sessionId = 's-id';
  const response: MockResponse<SessionInfoResponse> = {
    data: {
      session: {
        useRoles: true,
        roles: [],
        pointValues: [],
        users: [],
        showVotes: false,
        createdBy: '',
        usePermissions: false,
      }
    }
  };

  it('gets data & sets roles from response', async () => {
    await expectSaga(getSessionInfoSaga, getSessionInfo(sessionId, callback))
      .provide([
        [call(sessionApi.getInfo, sessionId), response]
      ])
      .call(sessionApi.getInfo, sessionId)
      .put(setSessionParams({ roles: response.data.session.roles, useRoles: true }))
      .call(callback)
      .run();
  });

  it('handles session not found error', async () => {
    const error = {
      response: {
        data: {
          code: ERROR_CODES.SESSION_NOT_FOUND
        }
      }
    };

    await expectSaga(getSessionInfoSaga, getSessionInfo(sessionId, callback))
      .provide([
        [call(sessionApi.getInfo, sessionId), throwApiError(error)]
      ])
      .call(sessionApi.getInfo, sessionId)
      .call(errorParser.parse, error)
      .call(
        storageService.set,
        StorageKey.FormErrors,
        { sessionId: { id: 'error.sessionNotFound' } },
        true,
      )
      .put(setSessionParams({ useRoles: false }))
      .run();
  });

  it('handles unexpected error', async () => {
    await expectSaga(getSessionInfoSaga, getSessionInfo(sessionId, callback))
      .provide([
        [call(sessionApi.getInfo, sessionId), throwApiError(null)]
      ])
      .call(sessionApi.getInfo, sessionId)
      .call(errorParser.parse, null)
      .put(throwAppError(ERROR_CODES.UNEXPECTED as MessageId))
      .run();
  });
});
