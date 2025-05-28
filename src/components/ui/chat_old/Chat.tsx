"use client";

import React, { useState, useEffect, useRef } from "react";
import ChatMessageList from "./ChatMessageList";
import ChatInput from "./ChatInput";

interface Message {
  id: number;
  message: string;
  sender: "user" | "bot";
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      message: "Hello! How can I help you today?",
      sender: "bot",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const botMessageIdRef = useRef<number | null>(null);

  // Scroll down to bottom when new messages arrive
  const messageListRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messageListRef.current?.scrollTo({
      top: messageListRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      message: inputValue,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Add placeholder bot message
    const botMessageId = Date.now() + 1;
    botMessageIdRef.current = botMessageId;
    const botMessage: Message = {
      id: botMessageId,
      message: "",
      sender: "bot",
    };
    setMessages((prev) => [...prev, botMessage]);
    setIsStreaming(true);

    // Start streaming response
    await streamBotResponse(inputValue, botMessageId);

    setIsStreaming(false);
  };

  async function streamBotResponse(userInput: string, botMessageId: number) {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userInput }),
      });

      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let botText = "";

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          botText += decoder.decode(value, { stream: true });
          // Update bot message progressively
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === botMessageId ? { ...msg, message: botText } : msg
            )
          );
        }
      }
    } catch (err) {
      console.error("Streaming error:", err);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMessageId
            ? { ...msg, message: "Oops, something went wrong." }
            : msg
        )
      );
    }
  }

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto border rounded-lg shadow-md">
      <ChatMessageList
        messages={messages}
        ref={messageListRef}
        className="flex-1 overflow-y-auto p-4 bg-white"
      />
      <div className="border-t p-4 bg-gray-50">
        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSend={sendMessage}
          disabled={isStreaming}
        />
      </div>
    </div>
  );
}
