export const runtime = 'edge';

export async function POST(req: Request): Promise<Response> {
  const { messages } = await req.json();

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages,
      stream: true,
    }),
  });

  if (!response.ok || !response.body) {
    const error = await response.json();
    return new Response(JSON.stringify({ error: error?.error?.message || 'OpenAI error' }), {
      status: 400,
    });
  }

  return new Response(response.body, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
