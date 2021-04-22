import SessionService from '@services/sessionService';
import db from '@utils/dbConnection';
import { JoinSessionBody, SessionInfoParams, StartSessionBody } from '@models/sessionModel';
import { MOCK_POINT_VALUES, MOCK_SESSION, MOCK_USER } from '../mocks';
import UserService from '@services/userService';
import Spy = jasmine.Spy;
import ValidationService from '@services/validationService';
import VALIDATION_SCHEMA from '@services/validationService/validationSchemas';
import ErrorService from '@services/errorService';
import { UserSchemaProps } from '@schemas/userSchema';

describe('sessionService', () => {
  const sessionService = new SessionService();
  const sessionId = 'random';
  const thrownError = 'thrown error';

  let generateSessionId: Spy;
  let validateBySchema: Spy;
  let generateError: Spy;
  let error;

  beforeAll(async () => {
    await db.connect();

    generateSessionId =
        spyOn<any>(SessionService.prototype, 'generateSessionId')
          .and.callFake(() => sessionId);

    validateBySchema =
        spyOn<any>(ValidationService.prototype, 'validateBySchema');

    generateError =
        spyOn<any>(ErrorService.prototype, 'generate')
          .and.callFake(() => thrownError);
  });

  afterAll(async () => {
    await db.disconnect();
  });

  beforeEach(() => {
    generateSessionId.calls.reset();
    validateBySchema.calls.reset();
    generateError.calls.reset();

    error = undefined;
  });

  it('executes getSessionById method', async () => {
    spyOn<any>(SessionService.prototype, 'getSessionById')
      .and.callFake(() => MOCK_SESSION);

    const res = await sessionService.getSessionById('ss');

    expect(res).toEqual(MOCK_SESSION);
  });

  it('executes modifySessionParams method', async () => {
    const res = await sessionService.modifySessionParams('s', {});

    expect(res).toEqual(null);
  });

  it('execute startSession method', async () => {
    const registerNewSession = spyOn<any>(SessionService.prototype, 'registerNewSession')
      .and.callFake(() => sessionId);

    const registerUser =
        spyOn<any>(UserService.prototype, 'registerUser');

    const body: StartSessionBody = {
      user: MOCK_USER,
      useRoles: false,
      pointValues: MOCK_POINT_VALUES,
      usePermissions: false,
    };

    const res = await sessionService.startSession(body);

    expect(validateBySchema)
      .toHaveBeenCalledWith(body, VALIDATION_SCHEMA.START_SESSION_BODY);

    expect(registerNewSession)
      .toHaveBeenCalledWith({
        useRoles: body.useRoles,
        pointValues: body.pointValues,
        usePermissions: body.usePermissions,
        roles: body.roles,
        createdBy: body.user.id,
      });

    expect(registerUser)
      .toHaveBeenCalledWith(sessionId, body.user, true);

    expect(res).toEqual(sessionId);
  });

  it('executes getSessionInfo method', async () => {
    const getSessionById = spyOn<any>(SessionService.prototype, 'getSessionById')
      .and.callFake(() => MOCK_SESSION);

    const params: SessionInfoParams = {
      sessionId: 'ss'
    };

    const res = await sessionService.getSessionInfo(params);

    expect(validateBySchema)
      .toHaveBeenCalledWith(params, VALIDATION_SCHEMA.SESSION_INFO_PARAMS);

    expect(getSessionById)
      .toHaveBeenCalledWith(params.sessionId);

    expect(res).toEqual(MOCK_SESSION);
  });

  it('executes getSessionInfo method & throws if not found', async () => {
    spyOn<any>(SessionService.prototype, 'getSessionById')
      .and.callFake(() => null);

    const params = {
      sessionId: 'xs',
    };

    try {
      await sessionService.getSessionInfo(params);
    } catch (e) {
      error = e;
    }

    expect(error).toEqual(thrownError);
  });

  it('executes loadSession method & throws if not found', async () => {
    spyOn<any>(SessionService.prototype, 'getSessionById')
      .and.callFake(() => null);

    try {
      await sessionService.loadSession('sx', 'ui');
    } catch (e) {
      error = e;
    }

    expect(error).toEqual(thrownError);

    expect(validateBySchema)
      .toHaveBeenCalledWith(
        { sessionId: 'sx', userId: 'ui' },
        VALIDATION_SCHEMA.LOAD_SESSION_PARAMS
      );
  });

  it('executes loadSession & throws if user not registered', async () => {
    spyOn<any>(SessionService.prototype, 'getSessionById')
      .and.callFake(() => MOCK_SESSION);

    spyOn<any>(UserService.prototype, 'getAllSessionUsers')
      .and.callFake(() => []);

    try {
      await sessionService.loadSession('sx', 'ui');
    } catch (e) {
      error = e;
    }

    expect(error).toEqual(thrownError);
  });

  it('executes loadSession & returns value', async () => {
    const sessionUsers: UserSchemaProps[] = [
      { id: 'ui', name: 'n', avatarId: null, }
    ];

    spyOn<any>(SessionService.prototype, 'getSessionById')
      .and.callFake(() => MOCK_SESSION);

    spyOn<any>(UserService.prototype, 'getAllSessionUsers')
      .and.callFake(() => sessionUsers);

    const res = await sessionService.loadSession('sx', 'ui');

    expect(res).toEqual({
      ...MOCK_SESSION,
      users: sessionUsers,
    });
  });

  it('executes joinSession & throws if session not found', async () => {
    const body: JoinSessionBody = {
      sessionId,
      user: MOCK_USER
    };

    spyOn<any>(SessionService.prototype, 'getSessionById')
      .and.callFake(() => null);

    try {
      await sessionService.joinSession(body);
    } catch (e) {
      error = e;
    }

    expect(error).toEqual(thrownError);
    expect(validateBySchema).toHaveBeenCalledWith(body, VALIDATION_SCHEMA.JOIN_SESSION_BODY);
  });

  it('executes joinSession & throws if user name exists', async () => {
    const body: JoinSessionBody = {
      sessionId,
      user: MOCK_USER
    };

    spyOn<any>(SessionService.prototype, 'getSessionById')
      .and.callFake(() => MOCK_SESSION);

    spyOn<any>(UserService.prototype, 'userNameExists')
      .and.callFake(() => true);

    try {
      await sessionService.joinSession(body);
    } catch (e) {
      error = e;
    }

    expect(error).toEqual(thrownError);
  });

  it('executes joinSession & throws user limit exceeded', async () => {
    const body: JoinSessionBody = {
      sessionId,
      user: MOCK_USER
    };

    spyOn<any>(SessionService.prototype, 'getSessionById')
      .and.callFake(() => MOCK_SESSION);

    spyOn<any>(UserService.prototype, 'getSessionUsersCount')
      .and.callFake(() => 100);

    try {
      await sessionService.joinSession(body);
    } catch (e) {
      error = e;
    }

    expect(error).toEqual(thrownError);
  });

  it('executes joinSession & returns registered user', async () => {
    const body: JoinSessionBody = {
      sessionId,
      user: MOCK_USER
    };

    const registerUser = spyOn<any>(UserService.prototype, 'registerUser')
      .and.callFake(() => MOCK_USER);

    spyOn<any>(SessionService.prototype, 'getSessionById')
      .and.callFake(() => MOCK_SESSION);

    const res = await sessionService.joinSession(body);

    expect(registerUser).toHaveBeenCalledWith(body.sessionId, body.user, true);
    expect(res).toEqual(MOCK_USER);
  });

  it('executes resetSessionParamsIfEmpty method', async () => {
    spyOn<any>(UserService.prototype, 'anyUserRegisteredToSession')
      .and.callFake(() => false);

    const modifySessionParams =
          spyOn<any>(SessionService.prototype, 'modifySessionParams');

    const res = await sessionService.resetSessionParamsIfEmpty('xx');

    expect(modifySessionParams).toHaveBeenCalledWith(
      'xx',
      { currentTopic: '', showVotes: false, }
    );

    expect(res).toEqual(undefined);
  });
});
