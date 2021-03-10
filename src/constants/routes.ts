import { MessageId } from 'lang';

export enum ROUTE {
  BASE = '/',
  START_SESSION = '/start',
  ERROR = '/error',
  JOIN_SESSION = '/join',
  SESSION = '/session/:sessionId',
  SESSION_NOT_FOUND = '/session-not-found',
}

const ROUTE_NAMES: Record<ROUTE, MessageId> = {
  [ROUTE.BASE]: 'routes.base',
  [ROUTE.JOIN_SESSION]: 'routes.joinSession',
  [ROUTE.START_SESSION]: 'routes.startSession',
  [ROUTE.SESSION]: 'routes.session',
  [ROUTE.SESSION_NOT_FOUND]: 'routes.sessionNotFound',
  [ROUTE.ERROR]: 'routes.error',
};

export const getRouteName = (route: ROUTE): MessageId => {
  const r = route.includes('/session/')
    ? ROUTE.SESSION
    : route;

  return ROUTE_NAMES[r];
};

export const getMatchParamRoute = (
  route: ROUTE,
  match: Record<string, any>
): string => {
  let value = route as string;

  Object.keys(match).forEach((k) => {
    value = value.replace(`:${k}`, match[k]);
  });

  return value;
};
