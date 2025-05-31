export const runtime = "edge";

export async function POST() {
  const res = await fetch("https://chatbot-with-memory-619622416a0158469d5e1ae14e6dc7c0.us.langgraph.app/threads", {
    method: "POST",
    headers: {
      "X-API-Key": "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",
    },
    body: JSON.stringify({"metadata": { "graph_id": "fe73cdeb-35de-4d99-b3cc-704fe51ca36c" }})
  });

  if (!res.ok) {
    const text = await res.text();
    return new Response(JSON.stringify({ error: text }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const data = await res.json();
  return new Response(JSON.stringify({ thread_id: data.thread_id }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
