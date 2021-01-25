export enum ROUTE {
  BASE = '/',
  START_SESSION = '/start',
  ERROR = '/error',
  JOIN_SESSION = '/join',
  SESSION = '/session/:sessionId',
  SESSION_NOT_FOUND = '/session-not-found',
}

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
