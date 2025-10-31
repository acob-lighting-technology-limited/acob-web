import { NextRequest, NextResponse } from 'next/server';
import { groq } from '@ai-sdk/groq';
import { streamText } from 'ai';
import { rateLimit } from '@/lib/utils/rate-limit';
import {
  createErrorResponse,
  ApiErrorCode,
  handleApiError,
} from '@/lib/utils/api-error-handler';
import { RATE_LIMITS } from '@/lib/constants/ui';

export async function POST(req: NextRequest) {
  // Apply rate limiting
  const isRateLimited = rateLimit(req, {
    interval: RATE_LIMITS.CHAT_API.interval,
    uniqueTokenPerInterval: RATE_LIMITS.CHAT_API.maxRequests,
  });

  if (isRateLimited) {
    return NextResponse.json(
      {
        error: {
          message: 'Too many requests. Please try again later.',
          code: 'RATE_LIMIT_EXCEEDED',
        },
      },
      {
        status: 429,
        headers: { 'Retry-After': '60' },
      },
    );
  }

  try {
    const GROQ_API_KEY = process.env.GROQ_API_KEY;

    if (!GROQ_API_KEY) {
      return createErrorResponse(
        ApiErrorCode.INTERNAL_SERVER_ERROR,
        'AI service configuration is missing',
        500,
      );
    }

    const body = await req.json();
    const messages = body.messages;

    if (!Array.isArray(messages)) {
      return createErrorResponse(
        ApiErrorCode.BAD_REQUEST,
        'Invalid messages format: must be an array',
        400,
      );
    }

    if (messages.length === 0) {
      return createErrorResponse(
        ApiErrorCode.BAD_REQUEST,
        'Messages array cannot be empty',
        400,
      );
    }

    // Validate messages
    for (let i = 0; i < messages.length; i++) {
      const msg = messages[i];

      if (!msg.role || !msg.content) {
        return createErrorResponse(
          ApiErrorCode.VALIDATION_ERROR,
          `Invalid message at index ${i}: must have 'role' and 'content'`,
          400,
        );
      }
    }

    // Clean messages to remove unsupported properties
    const cleanMessages = messages.map(
      (msg: { role: string; content: string }) => ({
        role: msg.role as 'user' | 'assistant' | 'system',
        content: msg.content,
      }),
    );
    // Use Vercel AI SDK with Groq (streaming for useChat compatibility)
    const result = await streamText({
      model: groq('llama-3.1-8b-instant'),
      messages: cleanMessages,
      maxTokens: 1000,
      temperature: 0.7,
    });

    return result.toDataStreamResponse();
  } catch (err: unknown) {
    return handleApiError(err);
  }
}
