export const runtime = "edge"

export async function POST(req: Request) {
  const { messages } = await req.json()

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages,
      stream: true,
    }),
  })

  console.log("API key:", process.env.OPENAI_API_KEY)

  if (!res.ok) {
    const error = await res.json()
    return new Response(JSON.stringify({ error: error.error.message }), { status: 400 })
  }

  return new Response(res.body, {
    headers: {
      "Content-Type": "text/event-stream",
    },
  })
}
