export const HttpStatus = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    VALIDATION_ERROR: 422,
    INTERNAL_ERROR: 500
} as const;

export type HttpStatusCode = typeof HttpStatus[keyof typeof HttpStatus];
