import BaseError from '../base-error';
import { ERROR_CODES } from '../error-codes';
import { HttpStatus } from './http-status-code';

export class InternalError extends BaseError {
  readonly code = ERROR_CODES.INTERNAL_ERROR;
  readonly statusCode = HttpStatus.INTERNAL_ERROR;

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
