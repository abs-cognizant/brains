//import ChatWindow from "@/components/ui/chat/ChatWindow"
import ChatComponent from "@/components/ChatComponent";


export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      {/* <ChatWindow /> */}
      <h1 className="text-2xl font-bold mb-6">AI Chat</h1>
      <ChatComponent />
    </main>
  )
}