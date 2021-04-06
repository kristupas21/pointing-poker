import { MessageId } from 'lang';

export interface ApiError<T = any> {
  response?: {
    data?: {
      code: string;
      payload?: T;
    }
  }
}

export interface AppError<T = any> {
  code: MessageId;
  payload?: T;
}
