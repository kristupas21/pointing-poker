import { MessageId } from 'lang';

export enum AppRoute {
  Base = '/',
  StartSession = '/start',
  Error = '/error',
  JoinSession = '/join',
  Session = '/session/:sessionId',
  SessionNotFound = '/session-not-found',
}

const ROUTE_NAMES: Record<AppRoute, MessageId> = {
  [AppRoute.Base]: 'routes.base',
  [AppRoute.JoinSession]: 'routes.joinSession',
  [AppRoute.StartSession]: 'routes.startSession',
  [AppRoute.Session]: 'routes.session',
  [AppRoute.SessionNotFound]: 'routes.sessionNotFound',
  [AppRoute.Error]: 'routes.error',
};

export const getRouteName = (route: AppRoute): MessageId => {
  const r = route.includes('/session/')
    ? AppRoute.Session
    : route;

  return ROUTE_NAMES[r];
};

export const getMatchParamRoute = (
  route: AppRoute,
  match: Record<string, any>
): string => {
  let value = route as string;

  Object.keys(match).forEach((k) => {
    value = value.replace(`:${k}`, match[k]);
  });

  return value;
};
