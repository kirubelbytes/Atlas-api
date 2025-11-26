import { serializedError } from "./error.types.js";

abstract class BaseError extends Error {
  abstract code: string;
  abstract statusCode: number;

  constructor(message: string) {
    super(message)

    Object.setPrototypeOf(this, new.target.prototype)
    Error.captureStackTrace(this)
  }

  abstract serialize() : serializedError;
}

export default BaseError