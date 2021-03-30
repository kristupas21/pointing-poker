import { MessageId } from 'lang';
import { AppRoute } from './types';

const ROUTE_NAMES: Record<AppRoute, MessageId> = {
  [AppRoute.Base]: 'routes.base',
  [AppRoute.JoinSession]: 'routes.joinSession',
  [AppRoute.StartSession]: 'routes.startSession',
  [AppRoute.Session]: 'routes.session',
  [AppRoute.SessionNotFound]: 'routes.sessionNotFound',
  [AppRoute.Error]: 'routes.error',
};

export function getRouteMessageId(route: AppRoute): MessageId {
  const r = route.includes('/session/')
    ? AppRoute.Session
    : route;

  return ROUTE_NAMES[r];
}

export function getRouteName(route: string): AppRoute {
  if (!route) {
    return AppRoute.Base;
  }

  return route.includes('/session/')
    ? AppRoute.Session
    : route as AppRoute;
}

export function getMatchParamRoute(
  route: AppRoute,
  match: Record<string, any>
): string {
  let value = route as string;

  Object.keys(match).forEach((k) => {
    value = value.replace(`:${k}`, match[k]);
  });

  return value;
}
