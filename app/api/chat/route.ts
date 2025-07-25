import { NextRequest } from "next/server";

// Helper function to get a more detailed error message
function getErrorMessage(error: unknown): string {
  if (error == null) return "unknown error";
  if (typeof error === "string") return error;
  if (error instanceof Error) return error.message;
  return JSON.stringify(error);
}

// Remove <Thinking>...</Thinking> tags and their contents
function filterThinkTags(text: string): string {
  return text.replace(/<Thinking>[\s\S]*?<\/Thinking>/gi, "");
}

export async function POST(req: NextRequest) {
  try {
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    const OPENROUTER_SITE_URL = process.env.VERCEL_URL || "http://localhost:3000";
    const OPENROUTER_SITE_NAME = "ACOB Lighting";

    if (!OPENROUTER_API_KEY) {
      console.error("OPENROUTER_API_KEY is not set.");
      return new Response(JSON.stringify({ error: "Server configuration error: OpenRouter API key is missing." }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const messages = body.messages;

    if (!Array.isArray(messages)) {
      console.error("Invalid messages:", body);
      return new Response(JSON.stringify({ error: "Invalid messages format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Make non-streaming request to OpenRouter
    const openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": OPENROUTER_SITE_URL,
        "X-Title": OPENROUTER_SITE_NAME,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1-0528:free",
        messages,
        stream: false, // Changed to false for non-streaming
      }),
    });

    if (!openRouterResponse.ok) {
      const errorData = await openRouterResponse.json().catch(() => ({ message: "Unknown error" }));
      console.error("OpenRouter API error:", errorData);
      return new Response(JSON.stringify({ error: errorData.message || "Failed to get response from OpenRouter" }), {
        status: openRouterResponse.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = await openRouterResponse.json();
    const content = data.choices?.[0]?.message?.content || "";
    
    // Filter out thinking tags
    const filteredContent = filterThinkTags(content);

    // Return the complete message in the format expected by Vercel AI SDK
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        // Send the complete message at once
        if (filteredContent) {
          const messageChunk = `0:${JSON.stringify(filteredContent)}\n`;
          controller.enqueue(encoder.encode(messageChunk));
        }

        // Send finish signal
        const finishChunk = `d:${JSON.stringify({
          finishReason: "stop",
          usage: {
            promptTokens: data.usage?.prompt_tokens || 0,
            completionTokens: data.usage?.completion_tokens || 0,
          },
        })}\n`;
        controller.enqueue(encoder.encode(finishChunk));
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "x-vercel-ai-data-stream": "v1",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (err: any) {
    console.error("ACOBot API route error:", err);
    return new Response(JSON.stringify({ error: getErrorMessage(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}