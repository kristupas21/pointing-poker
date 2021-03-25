import { ValueOf } from 'types/global';
import { ERROR_CODES } from 'constants/errorCodes';

export interface ApiError<T = any> {
  response?: {
    data?: {
      code: string;
      payload?: T;
    }
  }
}

export interface AppError<T = any> {
  code: ValueOf<typeof ERROR_CODES>;
  payload?: T;
}
