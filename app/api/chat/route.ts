import { NextRequest } from "next/server";

// Helper function to get a more detailed error message
function getErrorMessage(error: unknown): string {
  if (error == null) return "unknown error";
  if (typeof error === "string") return error;
  if (error instanceof Error) return error.message;
  return JSON.stringify(error);
}

// Remove <Thinking>...</Thinking> tags and their contents (preserve surrounding whitespace)
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
        stream: true,
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

    const stream = new ReadableStream({
      async start(controller) {
        const reader = openRouterResponse.body?.getReader();
        const decoder = new TextDecoder();
        const encoder = new TextEncoder();
        let buffer = "";
        let isInsideThinkTag = false;
        let thinkTagBuffer = "";

        if (!reader) {
          console.error("No readable stream from OpenRouter response.");
          controller.enqueue(encoder.encode('3:"No readable stream from OpenRouter response."\n'));
          controller.close();
          return;
        }

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split(/\r?\n/);
            buffer = lines.pop() || "";

            for (const line of lines) {
              if (!line.startsWith("data: ")) continue;

              const jsonStr = line.substring(6).trim();
              if (jsonStr === "[DONE]") {
                controller.enqueue(
                  encoder.encode('d:{"finishReason":"stop","usage":{"promptTokens":0,"completionTokens":0}}\n')
                );
                controller.close();
                return;
              }

              try {
                const data = JSON.parse(jsonStr);
                const content = data.choices?.[0]?.delta?.content;
                const finishReason = data.choices?.[0]?.finish_reason;

                if (content !== undefined && content !== null) {
                  let processedContent = content;

                  const thinkStartIndex = processedContent.toLowerCase().indexOf("<thinking>");
                  const thinkEndIndex = processedContent.toLowerCase().indexOf("</thinking>");

                  if (thinkStartIndex !== -1) {
                    isInsideThinkTag = true;
                    thinkTagBuffer = processedContent.substring(thinkStartIndex);
                    processedContent = processedContent.substring(0, thinkStartIndex);
                  }

                  if (isInsideThinkTag) {
                    thinkTagBuffer += processedContent;
                    if (thinkEndIndex !== -1) {
                      isInsideThinkTag = false;
                      const endTagIndex = thinkTagBuffer.toLowerCase().indexOf("</thinking>");
                      if (endTagIndex !== -1) {
                        processedContent = thinkTagBuffer.substring(endTagIndex + "</thinking>".length);
                      } else {
                        processedContent = "";
                      }
                      thinkTagBuffer = "";
                    } else {
                      continue;
                    }
                  }

                  // Final cleanup
                  processedContent = filterThinkTags(processedContent);

                  if (processedContent) {
                    const encodedChunk = `0:${JSON.stringify(processedContent)}\n`;
                    controller.enqueue(encoder.encode(encodedChunk));
                  }
                }

                if (finishReason) {
                  controller.enqueue(
                    encoder.encode(
                      `d:${JSON.stringify({
                        finishReason: finishReason === "stop" ? "stop" : "other",
                        usage: {
                          promptTokens: data.usage?.prompt_tokens || 0,
                          completionTokens: data.usage?.completion_tokens || 0,
                        },
                      })}\n`
                    )
                  );
                  controller.close();
                  return;
                }
              } catch (parseError) {
                console.error("Error parsing JSON:", parseError);
                controller.enqueue(
                  encoder.encode(`3:${JSON.stringify(`Parse error: ${getErrorMessage(parseError)}`)}\n`)
                );
              }
            }
          }

          // End of stream reached without [DONE]
          controller.enqueue(
            encoder.encode('d:{"finishReason":"stop","usage":{"promptTokens":0,"completionTokens":0}}\n')
          );
          controller.close();
        } catch (streamError) {
          console.error("Stream error:", streamError);
          controller.enqueue(encoder.encode(`3:${JSON.stringify(`Stream error: ${getErrorMessage(streamError)}`)}\n`));
          controller.close();
        } finally {
          reader.releaseLock();
        }
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
