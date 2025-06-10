// app/api/chat-with-agent/route.ts
export const runtime = "edge";

export async function POST(req: Request) {
    
  const CHATBOT_API_KEY = process.env.CHATBOT_API_KEY;
  const NEXT_PUBLIC_CHATBOT_ENDPOINT_URL = process.env.NEXT_PUBLIC_CHATBOT_ENDPOINT_URL;

  // Add a check for undefined in development or build phase (optional but good for debugging)
  if (!CHATBOT_API_KEY) {
    console.error("CHATBOT_API_KEY is not defined.");
    return new Response(JSON.stringify({ error: "Server configuration error: API key missing" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Add a check for undefined in development or build phase (optional but good for debugging)
  if (!NEXT_PUBLIC_CHATBOT_ENDPOINT_URL) {
    console.error("NEXT_PUBLIC_CHATBOT_ENDPOINT_URL is not defined.");
    return new Response(JSON.stringify({ error: "Server configuration error: NEXT_PUBLIC_CHATBOT_ENDPOINT_URL key missing" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { prompt, thread_id } = await req.json();

  const response = await fetch(`${NEXT_PUBLIC_CHATBOT_ENDPOINT_URL}/${thread_id}/runs/stream`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": CHATBOT_API_KEY,
    },
    body: JSON.stringify({
      assistant_id: "8a4ac7a4-50eb-5206-98cc-4a72345cb1f7",
      graph_name: "chatbot",
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
