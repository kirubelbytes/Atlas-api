import BaseError from '../base-error.js';
import { ERROR_CODES } from '../error-codes';
import { HttpStatus } from './http-status-code';

export class ServiceUnavailableError extends BaseError {
  readonly code = ERROR_CODES.SERVICE_UNAVAILABLE;
  readonly statusCode = HttpStatus.SERVICE_UNAVAILABLE;

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
