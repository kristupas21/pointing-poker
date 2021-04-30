import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga-test-plan/matchers';
import { MockResponse, MockState } from 'utils/test/types';
import { throwApiError } from 'utils/test/testUtils';
import { push } from 'connected-react-router';
import { setAppLoading } from 'state/app/appActions';
import errorParser, { ERROR_CODES } from 'utils/errorParser';
import { throwAppError } from 'state/error/errorActions';
import storageService from 'utils/storageService/storageService';
import { StorageKey } from 'utils/storageService';
import { MessageId } from 'lang';
import { joinSession, modifySessionUser } from '../../sessionActions';
import { joinSessionSaga } from '../sessionSagaJoin';
import { JoinSessionParams, JoinSessionResponse } from '../../sessionModel';
import sessionApi from '../../sessionApi';
import { setFormLoading } from '../../../form/formActions';

describe('joinSessionSaga', () => {
  const setSubmitting = jest.fn();
  const setFieldError = jest.fn();
  const setFieldValue = jest.fn();
  const helpers = {
    setFieldError,
    setFieldValue,
    setSubmitting,
  };
  const mockState: MockState = {
    session: {
      roles: [
        'r',
        'f',
      ],
      user: {
        id: 'u-id',
      }
    }
  };

  const getActionParams = (): Parameters<typeof joinSession> => ([
    { name: 'J.Lo', role: 'r', isObserver: false, sessionId: 's-id' },
    helpers,
  ]);

  const expectedParams: JoinSessionParams = {
    sessionId: 's-id',
    user: {
      name: 'J.Lo',
      role: 'r',
      isObserver: false,
      id: 'u-id',
    }
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('acquires params, calls endpoint & navigates to session route', async () => {
    const response: MockResponse<JoinSessionResponse> = {
      data: {
        sessionId: 's-id',
        user: {
          hasPermission: true,
          id: 'i',
          name: 'n',
        },
      },
    };

    await expectSaga(joinSessionSaga, joinSession(...getActionParams()))
      .withState(mockState)
      .provide([
        [call(sessionApi.join, expectedParams), response]
      ])
      .put(setAppLoading(true))
      .put(setFormLoading(true))
      .call(sessionApi.join, expectedParams)
      .put(modifySessionUser({ hasPermission: true }))
      .put(push('/session/s-id'))
      .call(setSubmitting, false)
      .put(setFormLoading(false))
      .run();
  });

  it('handles not found session error', async () => {
    const error = {
      response: {
        data: {
          code: ERROR_CODES.SESSION_NOT_FOUND
        }
      }
    };

    await expectSaga(joinSessionSaga, joinSession(...getActionParams()))
      .withState(mockState)
      .provide([
        [call(sessionApi.join, expectedParams), throwApiError(error)]
      ])
      .put(setAppLoading(true))
      .put(setFormLoading(true))
      .call(sessionApi.join, expectedParams)
      .call(errorParser.parse, error)
      .put(setAppLoading(false))
      .call(setFieldError, 'sessionId', { id: 'error.sessionNotFound' })
      .call(setSubmitting, false)
      .put(setFormLoading(false))
      .run();
  });

  it('handles user name exists error', async () => {
    const error = {
      response: {
        data: {
          code: ERROR_CODES.USER_NAME_EXISTS
        }
      }
    };

    await expectSaga(joinSessionSaga, joinSession(...getActionParams()))
      .withState(mockState)
      .provide([
        [call(sessionApi.join, expectedParams), throwApiError(error)]
      ])
      .put(setAppLoading(true))
      .put(setFormLoading(true))
      .call(sessionApi.join, expectedParams)
      .call(errorParser.parse, error)
      .put(setAppLoading(false))
      .call(setFieldError, 'name', { id: 'error.userNameExists' })
      .call(setSubmitting, false)
      .put(setFormLoading(false))
      .run();
  });

  it('handles unexpected error', async () => {
    const error = new Error();

    await expectSaga(joinSessionSaga, joinSession(...getActionParams()))
      .withState(mockState)
      .provide([
        [call(sessionApi.join, expectedParams), throwApiError(error)]
      ])
      .put(setAppLoading(true))
      .put(setFormLoading(true))
      .call(sessionApi.join, expectedParams)
      .call(errorParser.parse, error)
      .put(setAppLoading(false))
      .put(throwAppError(ERROR_CODES.UNEXPECTED as MessageId))
      .call(setSubmitting, false)
      .put(setFormLoading(false))
      .run();
  });
});
