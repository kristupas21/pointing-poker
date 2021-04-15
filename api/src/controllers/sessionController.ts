import { AppRequest } from '@global/types';
import {
  JoinSessionBody,
  LoadSessionParams,
  LoadSessionQuery,
  SessionInfoParams,
  StartSessionBody
} from '@models/sessionModel';
import { Response } from 'express';
import StatusCodes from 'http-status-codes';
import SessionService from '@services/sessionService';
import ErrorService from '@services/errorService';

const sessionService = new SessionService();
const errorService = new ErrorService();

export const joinSessionController = async (
  req: AppRequest<JoinSessionBody>,
  res: Response
): Promise<Response> => {
  try {
    const user = await sessionService.joinSession(req.body);
    return res.status(StatusCodes.OK).json({ user, sessionId: req.body.sessionId });
  } catch (e) {
    return sendError(e, res);
  }
};

export const loadSessionController = async (
  req: AppRequest<null, LoadSessionQuery, LoadSessionParams>,
  res: Response
): Promise<Response> => {
  const { sessionId } = req.params;
  const { userId } = req.query;

  try {
    const session = await sessionService.loadSession(sessionId, userId);
    return res.status(StatusCodes.OK).json({ session });
  } catch (e) {
    return sendError(e, res);
  }
};

export const startSessionController = async (
  req: AppRequest<StartSessionBody>,
  res: Response
): Promise<Response> => {
  try {
    const sessionId = await sessionService.startSession(req.body);
    return res.status(StatusCodes.CREATED).json({ sessionId });
  } catch (e) {
    return sendError(e, res);
  }
};

export const sessionInfoController = async (
  req: AppRequest<null, null, SessionInfoParams>,
  res: Response
): Promise<Response> => {
  try {
    const session = await sessionService.getSessionInfo(req.params);
    return res.status(StatusCodes.OK).json({ session });
  } catch (e) {
    return sendError(e, res);
  }
};

function sendError(e, res: Response): Response {
  const { status, error } = errorService.parse(e);
  return res.status(status).json(error);
}
