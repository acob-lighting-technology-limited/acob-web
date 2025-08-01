import { NextRequest } from 'next/server';
import { groq } from '@ai-sdk/groq';
import { streamText } from 'ai';

// Helper function to get a more detailed error message
function getErrorMessage(error: unknown): string {
  if (error == null) return 'unknown error';
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message;
  return JSON.stringify(error);
}

export async function POST(req: NextRequest) {
  console.log('=== API ROUTE CALLED ===');

  try {
    const GROQ_API_KEY = process.env.GROQ_API_KEY;

    console.log('GROQ_API_KEY exists:', !!GROQ_API_KEY);

    if (!GROQ_API_KEY) {
      console.error('GROQ_API_KEY is not set.');
      return new Response(
        JSON.stringify({
          error: 'Server configuration error: Groq API key is missing.',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    console.log('=== PARSING REQUEST BODY ===');
    const body = await req.json();
    const messages = body.messages;

    console.log('Messages received:', messages?.length, 'messages');
    console.log('Full request body:', JSON.stringify(body, null, 2));

    if (!Array.isArray(messages)) {
      console.error('Invalid messages - not an array:', body);
      return new Response(
        JSON.stringify({ error: 'Invalid messages format: must be an array' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    if (messages.length === 0) {
      console.error('Empty messages array');
      return new Response(
        JSON.stringify({ error: 'Messages array cannot be empty' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    console.log('=== VALIDATING MESSAGES ===');
    // Validate messages
    for (let i = 0; i < messages.length; i++) {
      const msg = messages[i];
      console.log(`Message ${i}:`, JSON.stringify(msg, null, 2));

      if (!msg.role || !msg.content) {
        console.error(`Invalid message at index ${i}:`, msg);
        return new Response(
          JSON.stringify({
            error: `Invalid message format at index ${i}: must have 'role' and 'content'`,
          }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
    }

    // Clean messages to remove unsupported properties
    const cleanMessages = messages.map((msg: any) => ({
      role: msg.role,
      content: msg.content,
    }));

    console.log('=== CLEANED MESSAGES ===');
    console.log('Clean messages count:', cleanMessages.length);

    console.log('=== CALLING GROQ VIA AI SDK (STREAMING) ===');
    // Use Vercel AI SDK with Groq (streaming for useChat compatibility)
    const result = await streamText({
      model: groq('llama3-8b-8192'),
      messages: cleanMessages,
      maxTokens: 4096, // Optional: set max tokens
      temperature: 0.7, // Optional: set temperature
    });

    console.log('=== AI SDK STREAM CREATED ===');

    // Create a slower typing effect by adding delays
    const slowTypingStream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        let fullText = '';

        // Get the full text first
        for await (const textPart of result.textStream) {
          fullText += textPart;
        }

        console.log('=== STARTING SLOW TYPING EFFECT ===');
        console.log('Full text length:', fullText.length);

        // Now stream it slowly word by word
        const words = fullText.split(' ');

        for (let i = 0; i < words.length; i++) {
          const word = words[i];
          const wordToSend = i === 0 ? word : ' ' + word;

          // Send just the new word/part (not accumulated text)
          const chunk = `0:${JSON.stringify(wordToSend)}\n`;
          controller.enqueue(encoder.encode(chunk));

          // Add delay between words (adjust this to control speed)
          await new Promise(resolve => setTimeout(resolve, 150)); // 150ms delay between words
        }

        // Send the final completion signal
        const finishChunk = `d:${JSON.stringify({
          finishReason: 'stop',
          usage: {
            promptTokens: 0,
            completionTokens: words.length,
          },
        })}\n`;
        controller.enqueue(encoder.encode(finishChunk));
        controller.close();

        console.log('=== SLOW TYPING EFFECT COMPLETED ===');
      },
    });

    // Return the slowed-down stream
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
  } catch (err: any) {
    console.error('=== CATCH BLOCK ERROR ===');
    console.error('Error type:', typeof err);
    console.error('Error message:', err?.message);
    console.error('Full error:', err);
    console.error('Stack trace:', err?.stack);

    return new Response(
      JSON.stringify({
        error: getErrorMessage(err),
        errorType: typeof err,
        stack: err?.stack,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
