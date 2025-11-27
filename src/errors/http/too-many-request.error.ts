import BaseError from '../base-error';
import { ERROR_CODES } from '../error-codes';
import { HttpStatus } from './http-status-code';

export class TooManyRequestError extends BaseError {
  readonly code = ERROR_CODES.TOO_MANY_REQUESTS;
  readonly statusCode = HttpStatus.TOO_MANY_REQUESTS;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }

  serialize() {
    return {
      message: this.message,
      code: this.code,
      statusCode: this.statusCode,
    };
  }
}
