/**
 * Custom API Error class for consistent error handling across the application
 */
export class ApiError extends Error {
  public statusCode: number;
  public code?: string;
  public details?: Record<string, unknown>;

  constructor(
    message: string,
    statusCode: number = 500,
    code?: string,
    details?: Record<string, unknown>,
  ) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    Error.captureStackTrace?.(this, this.constructor);
  }

  /**
   * Create a Bad Request error (400)
   */
  static badRequest(
    message: string,
    details?: Record<string, unknown>,
  ): ApiError {
    return new ApiError(message, 400, 'BAD_REQUEST', details);
  }

  /**
   * Create an Unauthorized error (401)
   */
  static unauthorized(message: string = 'Unauthorized'): ApiError {
    return new ApiError(message, 401, 'UNAUTHORIZED');
  }

  /**
   * Create a Forbidden error (403)
   */
  static forbidden(message: string = 'Forbidden'): ApiError {
    return new ApiError(message, 403, 'FORBIDDEN');
  }

  /**
   * Create a Not Found error (404)
   */
  static notFound(message: string = 'Resource not found'): ApiError {
    return new ApiError(message, 404, 'NOT_FOUND');
  }

  /**
   * Create a Rate Limit error (429)
   */
  static rateLimitExceeded(message: string = 'Too many requests'): ApiError {
    return new ApiError(message, 429, 'RATE_LIMIT_EXCEEDED');
  }

  /**
   * Create an Internal Server Error (500)
   */
  static internal(message: string = 'Internal server error'): ApiError {
    return new ApiError(message, 500, 'INTERNAL_ERROR');
  }

  /**
   * Create a Service Unavailable error (503)
   */
  static serviceUnavailable(
    message: string = 'Service temporarily unavailable',
  ): ApiError {
    return new ApiError(message, 503, 'SERVICE_UNAVAILABLE');
  }

  /**
   * Convert to JSON response object
   */
  toJSON() {
    return {
      error: this.message,
      code: this.code,
      status: this.statusCode,
      ...(this.details && { details: this.details }),
    };
  }
}

/**
 * Handle API errors and convert to Next.js Response
 *
 * @example
 * ```typescript
 * try {
 *   // API logic
 * } catch (error) {
 *   return handleApiError(error);
 * }
 * ```
 */
export function handleApiError(error: unknown): Response {
  // Handle known ApiError instances
  if (error instanceof ApiError) {
    return Response.json(error.toJSON(), { status: error.statusCode });
  }

  // Handle standard Error instances
  if (error instanceof Error) {
    // Log unexpected errors in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Unexpected API error:', error);
    }

    return Response.json(
      {
        error: 'An unexpected error occurred',
        code: 'INTERNAL_ERROR',
        status: 500,
      },
      { status: 500 },
    );
  }

  // Handle unknown error types
  if (process.env.NODE_ENV === 'development') {
    console.error('Unknown error type:', error);
  }

  return Response.json(
    {
      error: 'An unexpected error occurred',
      code: 'UNKNOWN_ERROR',
      status: 500,
    },
    { status: 500 },
  );
}

/**
 * Validate required fields in request data
 *
 * @throws {ApiError} Bad Request if fields are missing
 *
 * @example
 * ```typescript
 * const data = await request.json();
 * validateRequiredFields(data, ['name', 'email', 'message']);
 * ```
 */
export function validateRequiredFields(
  data: Record<string, unknown>,
  fields: string[],
): void {
  const missingFields = fields.filter(field => {
    const value = data[field];
    return (
      value === undefined ||
      value === null ||
      (typeof value === 'string' && !value.trim())
    );
  });

  if (missingFields.length > 0) {
    throw ApiError.badRequest('Missing required fields', {
      fields: missingFields,
    });
  }
}

/**
 * Validate email format
 *
 * @throws {ApiError} Bad Request if email is invalid
 */
export function validateEmail(email: string): void {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw ApiError.badRequest('Invalid email format');
  }
}
