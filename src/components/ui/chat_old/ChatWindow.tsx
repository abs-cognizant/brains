"use client";

import { useState } from "react";
import { Message } from "@/types/message";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    });

    const reader = res.body?.getReader();
    const decoder = new TextDecoder("utf-8");
    let assistantMessage = "";
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    while (reader) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      assistantMessage += chunk;

      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last.role === "assistant") {
          last.content = assistantMessage;
        }
        return updated;
      });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-4">
      <div className="space-y-2 border p-4 rounded-xl min-h-[300px] bg-white">
        {messages.map((msg, idx) => (
          <div key={idx} className="text-sm break-words">
            <strong className="capitalize">{msg.role}:</strong> {msg.content}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <Textarea
          className="w-full min-h-[80px]"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button className="self-end" onClick={sendMessage}>
          Send
        </Button>
      </div>
    </div>
  );
}
