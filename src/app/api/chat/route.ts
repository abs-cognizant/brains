export const runtime = "edge"; // Optional: use 'nodejs' if 'edge' gives issues

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const res = await fetch("http://localhost:11434/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mistral", // or whatever model you've downloaded (e.g. llama3)
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      stream: true,
    }),
  });

  if (!res.ok || !res.body) {
    const errorText = await res.text();
    return new Response(JSON.stringify({ error: errorText }), { status: 500 });
  }

  return new Response(res.body, {
    headers: {
      "Content-Type": "text/event-stream",
    },
  });
}
