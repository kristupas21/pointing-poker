import { ERROR_CODES } from 'constants/errorCodes';
import { ApiError, AppError } from './types';

interface ErrorParser {
  parse(e: ApiError): AppError;
}

const errorParser: ErrorParser = {
  parse(e) {
    const code = e?.response?.data?.code || ERROR_CODES.UNEXPECTED;
    const payload = e?.response?.data?.payload || null;

    return {
      code,
      payload,
    };
  }
};

export default errorParser;
