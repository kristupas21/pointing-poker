import { ValueOf } from 'globalTypes';
import { ERROR_CODES } from './constants';

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
