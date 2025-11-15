import { NextResponse } from 'next/server';

export enum ApiErrorCode {
  BAD_REQUEST = 'BAD_REQUEST',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  EXTERNAL_API_ERROR = 'EXTERNAL_API_ERROR',
}

export interface ApiError {
  code: ApiErrorCode;
  message: string;
  details?: unknown;
  statusCode: number;
}

/**
 * Create a standardized API error response
 */
export function createErrorResponse(
  code: ApiErrorCode,
  message: string,
  statusCode: number,
  details?: unknown
): NextResponse {
  const error: Record<string, unknown> = {
    code,
    message,
    statusCode,
  };

  if (details) {
    error.details = details;
  }

  // Log error on server side
  if (statusCode >= 500) {
    console.error(`[API Error ${statusCode}]`, {
      code,
      message,
      details,
      timestamp: new Date().toISOString(),
    });
  }

  return NextResponse.json(
    { error },
    {
      status: statusCode,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}

/**
 * Handle common API errors with user-friendly messages
 */
export function handleApiError(error: unknown): NextResponse {
  // Handle known error types
  if (error instanceof Error) {
    // Network/fetch errors
    if (error.message.includes('fetch')) {
      return createErrorResponse(
        ApiErrorCode.SERVICE_UNAVAILABLE,
        'External service is temporarily unavailable. Please try again later.',
        503,
        process.env.NODE_ENV === 'development' ? error.message : undefined
      );
    }

    // Validation errors
    if (
      error.message.includes('validation') ||
      error.message.includes('required')
    ) {
      return createErrorResponse(
        ApiErrorCode.VALIDATION_ERROR,
        error.message,
        400
      );
    }

    // Log the error and return generic message
    console.error('Unhandled API error:', error);
    return createErrorResponse(
      ApiErrorCode.INTERNAL_SERVER_ERROR,
      'An unexpected error occurred. Please try again later.',
      500,
      process.env.NODE_ENV === 'development' ? error.message : undefined
    );
  }

  // Unknown error type
  console.error('Unknown API error:', error);
  return createErrorResponse(
    ApiErrorCode.INTERNAL_SERVER_ERROR,
    'An unexpected error occurred. Please try again later.',
    500
  );
}

/**
 * Validate required fields in request body
 */
export function validateRequiredFields(
  data: Record<string, unknown>,
  requiredFields: string[]
): { isValid: boolean; missingFields: string[] } {
  const missingFields = requiredFields.filter(
    field =>
      data[field] === undefined ||
      data[field] === null ||
      (typeof data[field] === 'string' && !data[field].trim())
  );

  return {
    isValid: missingFields.length === 0,
    missingFields,
  };
}

/**
 * Safe error message extractor
 */
export function getErrorMessage(error: unknown): string {
  if (error === null) {
    return 'Unknown error';
  }
  if (typeof error === 'string') {
    return error;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return JSON.stringify(error);
}
