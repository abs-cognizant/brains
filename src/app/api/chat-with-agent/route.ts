// app/api/chat-with-agent/route.ts
export const runtime = "edge";

export async function POST(req: Request) {
  const { prompt, thread_id } = await req.json();

  const response = await fetch(`https://chatbot-with-memory-619622416a0158469d5e1ae14e6dc7c0.us.langgraph.app/threads/${thread_id}/runs/stream`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": "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",
    },
    body: JSON.stringify({
      assistant_id: "chatbot",
      input: {
        messages: prompt,
      },
      stream_mode: ["messages-tuple"],
    }),
  });

  if (!response.ok || !response.body) {
    const errorText = await response.text();
    return new Response(JSON.stringify({ error: errorText }), { status: 500 });
  }

  return new Response(response.body, {
    headers: {
      "Content-Type": "application/json",
      "Transfer-Encoding": "chunked", // Helps with streaming in dev
    },
  });
}
