'use client'

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = { role: "user", content: input }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput("")

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    })

    const data = await res.json()
    setMessages([...newMessages, { role: "assistant", content: data.reply }])
  }

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <div className="space-y-2">
        {messages.map((msg, i) => (
          <div key={i} className={`p-3 rounded-xl ${msg.role === "user" ? "bg-blue-100 text-right" : "bg-gray-100 text-left"}`}>
            {msg.content}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask the brain something..."
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  )
}