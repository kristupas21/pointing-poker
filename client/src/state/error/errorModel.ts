import { MessageId } from 'lang';

export interface ErrorState {
  errorId: MessageId;
  errorPayload: any;
  redirectPath?: string;
}
