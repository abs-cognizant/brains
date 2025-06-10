export const runtime = "edge";

export async function POST() {
  // Access the API key from environment variables
  const CHATBOT_API_KEY = process.env.CHATBOT_API_KEY;
  const NEXT_PUBLIC_CHATBOT_ENDPOINT_URL = process.env.NEXT_PUBLIC_CHATBOT_ENDPOINT_URL

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

  const res = await fetch(`${NEXT_PUBLIC_CHATBOT_ENDPOINT_URL}`, {
    method: "POST",
    headers: {
      "X-API-Key": CHATBOT_API_KEY, // Use the environment variable here
      "Content-Type": "application/json", // Important for JSON body
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