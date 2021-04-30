import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga-test-plan/matchers';
import { MockResponse, MockState } from 'utils/test/types';
import { throwApiError } from 'utils/test/testUtils';
import errorParser, { ERROR_CODES } from 'utils/errorParser';
import { throwAppError } from 'state/error/errorActions';
import { MessageId } from 'lang';
import { getSessionInfoSaga } from '../sessionSagaGetInfo';
import { getSessionInfo, setSessionParams } from '../../sessionActions';
import sessionApi from '../../sessionApi';
import { SessionInfoResponse } from '../../sessionModel';
import { setFormLoading } from '../../../form/formActions';

describe('getSessionInfoSaga', () => {
  const setFieldValue = jest.fn();
  const setFieldError = jest.fn();
  const helpers = {
    setFieldValue,
    setFieldError,
  };
  const sessionId = 's-id';
  const mockState: MockState = {
    session: {
      currentInfoId: 'ex',
    },
  };
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

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('gets data & sets roles from response', async () => {
    await expectSaga(getSessionInfoSaga, getSessionInfo(sessionId, helpers))
      .withState(mockState)
      .provide([
        [call(sessionApi.getInfo, sessionId), response]
      ])
      .put(setFormLoading(true))
      .call(sessionApi.getInfo, sessionId)
      .put(setSessionParams({ roles: response.data.session.roles }))
      .call(setFieldValue, 'useRoles', response.data.session.useRoles)
      .put(setSessionParams({ currentInfoId: sessionId }))
      .put(setFormLoading(false))
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

    await expectSaga(getSessionInfoSaga, getSessionInfo(sessionId, helpers))
      .withState(mockState)
      .provide([
        [call(sessionApi.getInfo, sessionId), throwApiError(error)]
      ])
      .put(setFormLoading(true))
      .call(sessionApi.getInfo, sessionId)
      .call(errorParser.parse, error)
      .call(setFieldValue, 'useRoles', false)
      .call(setFieldError, 'sessionId', { id: 'error.sessionNotFound' })
      .put(setSessionParams({ currentInfoId: sessionId }))
      .put(setFormLoading(false))
      .run();
  });

  it('handles unexpected error', async () => {
    await expectSaga(getSessionInfoSaga, getSessionInfo(sessionId, helpers))
      .withState(mockState)
      .provide([
        [call(sessionApi.getInfo, sessionId), throwApiError(null)]
      ])
      .put(setFormLoading(true))
      .call(sessionApi.getInfo, sessionId)
      .call(errorParser.parse, null)
      .put(throwAppError(ERROR_CODES.UNEXPECTED as MessageId))
      .put(setSessionParams({ currentInfoId: sessionId }))
      .put(setFormLoading(false))
      .run();
  });

  it('does not execute if currentInfoId is equal to parameter', async () => {
    await expectSaga(getSessionInfoSaga, getSessionInfo('ex', helpers))
      .withState(mockState)
      .not.put(setFormLoading(true))
      .run();
  });
});
