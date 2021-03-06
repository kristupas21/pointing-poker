import { MessageId } from 'lang';
import { ERROR_CODES } from './constants';
import { ApiError, AppError } from './types';

interface ErrorParser {
  parse(e: ApiError): AppError;
}

const errorParser: ErrorParser = {
  parse(e) {
    const code = (e?.response?.data?.code || ERROR_CODES.UNEXPECTED) as MessageId;
    const payload = e?.response?.data?.payload;

    return {
      code,
      payload,
    };
  }
};

export default errorParser;
