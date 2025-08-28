import { NextRequest, NextResponse } from 'next/server';
import { groq } from '@ai-sdk/groq';
import { streamText } from 'ai';

// Helper function to get a more detailed error message
function getErrorMessage(error: unknown): string {
  if (error === null) {
    return 'unknown error';
  }
  if (typeof error === 'string') {
    return error;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return JSON.stringify(error);
}

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log('=== API ROUTE CALLED ===');
  }

  try {
    const GROQ_API_KEY = process.env.GROQ_API_KEY;

    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.log('GROQ_API_KEY exists:', !!GROQ_API_KEY);
    }

    if (!GROQ_API_KEY) {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.error('GROQ_API_KEY is not set.');
      }
      return NextResponse.json(
        { error: { message: 'Groq API key is missing', code: 'CONFIG_MISSING' } },
        { status: 500 }
      );
    }

    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.log('=== PARSING REQUEST BODY ===');
    }
    const body = await req.json();
    const messages = body.messages;

    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.log('Messages received:', messages?.length, 'messages');
    }

    if (!Array.isArray(messages)) {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.error('Invalid messages - not an array:', body);
      }
      return NextResponse.json(
        { error: { message: 'Invalid messages format: must be an array', code: 'BAD_REQUEST' } },
        { status: 400 }
      );
    }

    if (messages.length === 0) {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.error('Empty messages array');
      }
      return NextResponse.json(
        { error: { message: 'Messages array cannot be empty', code: 'BAD_REQUEST' } },
        { status: 400 }
      );
    }

    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.log('=== VALIDATING MESSAGES ===');
    }
    // Validate messages
    for (let i = 0; i < messages.length; i++) {
      const msg = messages[i];
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.log(`Message ${i}:`, JSON.stringify(msg, null, 2));
      }

      if (!msg.role || !msg.content) {
        if (process.env.NODE_ENV !== 'production') {
          // eslint-disable-next-line no-console
          console.error(`Invalid message at index ${i}:`, msg);
        }
        return NextResponse.json(
          { error: { message: `Invalid message at index ${i}: must have 'role' and 'content'`, code: 'BAD_REQUEST' } },
          { status: 400 }
        );
      }
    }

    // Clean messages to remove unsupported properties
    const cleanMessages = messages.map(
      (msg: { role: string; content: string }) => ({
        role: msg.role as 'user' | 'assistant' | 'system',
        content: msg.content,
      })
    );

    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.log('=== CALLING GROQ VIA AI SDK (STREAMING) ===');
    }
    // Use Vercel AI SDK with Groq (streaming for useChat compatibility)
    const result = await streamText({
      model: groq('llama3-8b-8192'),
      messages: cleanMessages,
      maxTokens: 4096,
      temperature: 0.7,
    });

    // Create a slower typing effect by adding delays
    const slowTypingStream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        let fullText = '';

        for await (const textPart of result.textStream) {
          fullText += textPart;
        }

        const words = fullText.split(' ');
        for (let i = 0; i < words.length; i++) {
          const word = words[i];
          const wordToSend = i === 0 ? word : ` ${word}`;
          const chunk = `0:${JSON.stringify(wordToSend)}\n`;
          controller.enqueue(encoder.encode(chunk));
          await new Promise(resolve => setTimeout(resolve, 150));
        }

        const finishChunk = `d:${JSON.stringify({
          finishReason: 'stop',
          usage: { promptTokens: 0, completionTokens: words.length },
        })}\n`;
        controller.enqueue(encoder.encode(finishChunk));
        controller.close();
      },
    });

    return new Response(slowTypingStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'x-vercel-ai-data-stream': 'v1',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (err: unknown) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error('Chat route error:', err);
    }
    return NextResponse.json(
      { error: { message: getErrorMessage(err), code: 'INTERNAL_SERVER_ERROR' } },
      { status: 500 }
    );
  }
}
