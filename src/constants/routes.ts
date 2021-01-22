import { ValueOf } from '../types/global';

const ROUTES = {
  BASE: '/',
  CREATE_SESSION: '/create',
  ERROR: '/error',
  JOIN_SESSION: '/join',
  SESSION: '/session/:sessionId',
  SESSION_NOT_FOUND: '/session-not-found',
} as const;

export const getMatchParamRoute = (
  route: ValueOf<typeof ROUTES>,
  match: Record<string, any>
) => {
  let value = route as string;

  Object.keys(match).forEach((k) => {
    value = value.replace(`:${k}`, match[k]);
  });

  return value;
};

export default ROUTES;
