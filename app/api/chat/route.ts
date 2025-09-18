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
  try {
    const GROQ_API_KEY = process.env.GROQ_API_KEY;

    if (!GROQ_API_KEY) {
      return NextResponse.json(
        {
          error: { message: 'Groq API key is missing', code: 'CONFIG_MISSING' },
        },
        { status: 500 },
      );
    }

    const body = await req.json();
    const messages = body.messages;

    if (!Array.isArray(messages)) {
      return NextResponse.json(
        {
          error: {
            message: 'Invalid messages format: must be an array',
            code: 'BAD_REQUEST',
          },
        },
        { status: 400 },
      );
    }

    if (messages.length === 0) {
      return NextResponse.json(
        {
          error: {
            message: 'Messages array cannot be empty',
            code: 'BAD_REQUEST',
          },
        },
        { status: 400 },
      );
    }

    // Validate messages
    for (let i = 0; i < messages.length; i++) {
      const msg = messages[i];

      if (!msg.role || !msg.content) {
        return NextResponse.json(
          {
            error: {
              message: `Invalid message at index ${i}: must have 'role' and 'content'`,
              code: 'BAD_REQUEST',
            },
          },
          { status: 400 },
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
    return NextResponse.json(
      {
        error: { message: getErrorMessage(err), code: 'INTERNAL_SERVER_ERROR' },
      },
      { status: 500 },
    );
  }
}
