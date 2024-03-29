import {
  IdGenerator,
  JoinSessionBody,
  SessionInfoParams,
  StartSessionBody
} from '@models/sessionModel';
import shortid from 'shortid';
import Session, { SessionSchemaProps } from '@schemas/sessionSchema';
import { UserSchemaProps } from '@schemas/userSchema';
import { ID_GEN_ALLOWED_CHARS } from '@global/constants';
import { ERROR_CODES, SESSION_USERS_LIMIT } from '@shared-with-ui/constants';
import StatusCodes from 'http-status-codes';
import UserService from '@services/userService';
import ValidationService from '@services/validationService';
import VALIDATION_SCHEMA from '@services/validationService/validationSchemas';
import ErrorService from '@services/errorService';

const userService = new UserService();
const validationService = new ValidationService();
const errorService = new ErrorService();

class SessionService {
  private idGenerator: IdGenerator = shortid;

  public constructor() {
    this.idGenerator.characters(ID_GEN_ALLOWED_CHARS);
  }

  private generateSessionId(): string {
    return this.idGenerator.generate();
  }

  private async registerNewSession(params: Partial<SessionSchemaProps>): Promise<string> {
    const sessionId = this.generateSessionId();
    const session = new Session({
      id: sessionId,
      ...params,
    });

    await session.save();

    return sessionId;
  }

  public async getSessionById(id: string): Promise<SessionSchemaProps> {
    return Session.findOne({ id }).lean();
  }

  public async modifySessionParams(
    id: string, params: Partial<SessionSchemaProps>
  ): Promise<SessionSchemaProps> {
    return Session.findOneAndUpdate({ id }, params).lean();
  }

  public async joinSession(body: JoinSessionBody): Promise<UserSchemaProps> {
    validationService.validateBySchema(body, VALIDATION_SCHEMA.JOIN_SESSION_BODY);

    const { sessionId, user } = body;
    const session = await this.getSessionById(sessionId);

    if (!session) {
      throw errorService.generate(StatusCodes.NOT_FOUND, ERROR_CODES.SESSION_NOT_FOUND);
    }

    if (await userService.getSessionUsersCount(sessionId) >= SESSION_USERS_LIMIT) {
      throw errorService.generate(
        StatusCodes.FORBIDDEN,
        ERROR_CODES.USER_LIMIT_EXCEEDED,
        SESSION_USERS_LIMIT,
      );
    }

    if (await userService.userNameExists(sessionId, user.name)) {
      throw errorService.generate(StatusCodes.CONFLICT, ERROR_CODES.USER_NAME_EXISTS);
    }

    const hasPermission = session.createdBy === user.id || !session.usePermissions;

    return userService.registerUser(sessionId, user, hasPermission);
  }

  public async loadSession(sessionId: string, userId: string): Promise<any> {
    validationService.validateBySchema(
      { sessionId, userId },
      VALIDATION_SCHEMA.LOAD_SESSION_PARAMS
    );

    const session = await this.getSessionById(sessionId);

    if (!session) {
      throw errorService.generate(
        StatusCodes.NOT_FOUND,
        ERROR_CODES.SESSION_NOT_FOUND,
        sessionId,
      );
    }

    const users = await userService.getAllSessionUsers(sessionId);
    const userExists = users.some((user) => user.id === userId);

    if (!userExists) {
      throw errorService.generate(StatusCodes.FORBIDDEN, ERROR_CODES.USER_NOT_FOUND);
    }

    return { ...session, users };
  }

  public async startSession(body: StartSessionBody): Promise<string> {
    validationService.validateBySchema(body, VALIDATION_SCHEMA.START_SESSION_BODY);

    const { user, useRoles, pointValues, roles, usePermissions } = body;
    const sessionParams = {
      useRoles,
      pointValues,
      roles,
      createdBy: user.id,
      usePermissions,
    };
    const sessionId = await this.registerNewSession(sessionParams);

    await userService.registerUser(sessionId, user, true);

    return sessionId;
  }

  public async getSessionInfo(params: SessionInfoParams): Promise<SessionSchemaProps> {
    validationService.validateBySchema(params, VALIDATION_SCHEMA.SESSION_INFO_PARAMS);

    const session = await this.getSessionById(params.sessionId);

    if (!session) {
      throw errorService.generate(StatusCodes.NOT_FOUND, ERROR_CODES.SESSION_NOT_FOUND);
    }

    return session;
  }

  public async resetSessionParamsIfEmpty(sessionId: string): Promise<void> {
    const sessionAlive = await userService.anyUserRegisteredToSession(sessionId);

    if (sessionAlive) {
      return;
    }

    await this.modifySessionParams(sessionId, { currentTopic: '', showVotes: false });
  }
}

export default SessionService;
