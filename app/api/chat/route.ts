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
import {
  detectIntent,
  shouldFetchSanityData,
} from '@/lib/utils/chat-intent-detection';
import {
  formatProjectsContext,
  formatUpdatesContext,
  formatProductsContext,
  formatJobsContext,
  createContextMessage,
} from '@/lib/utils/chat-context-formatter';
import {
  getProjects,
  getUpdatePosts,
  getProducts,
  getJobPostings,
} from '@/sanity/lib/client';

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

    // === DYNAMIC CONTEXT INJECTION ===
    // Detect intent from the last user message
    const lastUserMessage = cleanMessages.filter(m => m.role === 'user').pop();

    if (lastUserMessage) {
      const intent = detectIntent(lastUserMessage.content);

      // Fetch and inject Sanity data if needed
      if (shouldFetchSanityData(intent)) {
        let contextData = '';

        try {
          switch (intent.type) {
            case 'projects': {
              const allProjects = await getProjects();

              // Filter projects based on detected filters
              let filteredProjects = allProjects;

              if (intent.filters?.state) {
                filteredProjects = filteredProjects.filter(
                  (p: any) =>
                    p.state?.toLowerCase() ===
                    intent.filters!.state!.toLowerCase(),
                );
              }

              if (intent.filters?.category) {
                filteredProjects = filteredProjects.filter((p: any) =>
                  p.category
                    ?.toLowerCase()
                    .includes(intent.filters!.category!.toLowerCase()),
                );
              }

              // Filter by search term (for specific project names)
              if (intent.filters?.search) {
                const searchTerms = intent.filters.search
                  .toLowerCase()
                  .split(',')
                  .map(s => s.trim());
                filteredProjects = filteredProjects.filter((p: any) =>
                  searchTerms.some(
                    term =>
                      p.title?.toLowerCase().includes(term) ||
                      p.location?.toLowerCase().includes(term),
                  ),
                );
              }

              contextData = formatProjectsContext(filteredProjects);
              break;
            }

            case 'updates': {
              const updates = await getUpdatePosts();
              contextData = formatUpdatesContext(updates);
              break;
            }

            case 'products': {
              const products = await getProducts();

              // Filter products if category detected
              let filteredProducts = products;
              if (intent.filters?.category) {
                filteredProducts = filteredProducts.filter((p: any) =>
                  p.category
                    ?.toLowerCase()
                    .includes(intent.filters!.category!.toLowerCase()),
                );
              }

              contextData = formatProductsContext(filteredProducts);
              break;
            }

            case 'jobs': {
              const jobs = await getJobPostings();
              contextData = formatJobsContext(jobs);
              break;
            }
          }

          // Inject context into messages if data was found
          if (contextData) {
            cleanMessages.push(createContextMessage(contextData));
          }
        } catch (sanityError) {
          // Log error but continue with chat (graceful degradation)
          if (process.env.NODE_ENV === 'development') {
            console.error('Error fetching Sanity data for chat:', sanityError);
          }
          // Don't fail the entire request if Sanity fetch fails
        }
      }
    }
    // === END DYNAMIC CONTEXT INJECTION ===

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
