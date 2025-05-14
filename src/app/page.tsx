import ChatWindow from "@/components/ChatWindow"

export default function Home() {
  return (
    <main className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">🧠 brains — AI ChatBot</h1>
      <ChatWindow />
    </main>
  )
}
