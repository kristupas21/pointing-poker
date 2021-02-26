import { MessageId } from '../lang';

export const ERROR_CODES: Record<string, MessageId> = {
  INTERNAL_SERVER: 'error.internalServer',
  MISSING_PARAM: 'error.missingParam',
  MUST_CHOOSE_ROLE: 'error.mustChooseRole',
  NOT_FOUND: 'error.notFound',
  SESSION_NOT_FOUND: 'error.sessionNotFound',
  UNEXPECTED: 'error.unexpected',
  USER_NOT_FOUND: 'error.userNotFound',
};
