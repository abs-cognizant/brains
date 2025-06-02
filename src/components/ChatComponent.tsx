"use client";

import { getThreadId, setThreadId } from "@/utils/thread";
import { useState, useEffect, useRef } from "react";
import { AIMessageChunk } from "@/types/messages";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
  ChatBubbleAction,
  ChatBubbleActionWrapper,
  ChatMessageList,
  ChatInput,
} from "@/components/ui/chat";
import { PaperclipIcon, SmileIcon } from "lucide-react";

function ChatComponent() {
  const threadIdRef = useRef<string | null>(null);
  const [threadInitialized, setThreadInitialized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      message: "Hello",
      sender: "user",
    },
    {
      id: 2,
      message:
        "Hello! Welcome! How can I assist you today?",
      sender: "bot",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    const initThread = async () => {
      let existingThreadId = getThreadId();

      if (!existingThreadId || existingThreadId === "undefined") {
        try {
          const res = await fetch("/api/create-new-thread", { method: "POST" });
          const data = await res.json();
          existingThreadId = data.thread_id;
          setThreadId(existingThreadId as string);
          console.log("Thread created and stored:", existingThreadId);
        } catch (error) {
          console.error("Failed to create thread:", error);
          return;
        }
      } else {
        console.log("Thread already exists:", existingThreadId);
      }

      threadIdRef.current = existingThreadId;
      setThreadInitialized(true);
    };

    initThread();
  }, []);

  const actionIcons = [
    {
      icon: PaperclipIcon,
      label: "Attach",
      onClick: () => alert("Attach clicked"),
    },
    {
      icon: SmileIcon,
      label: "Emoji",
      onClick: () => alert("Emoji clicked"),
    },
  ];

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const userMessage = {
      id: messages.length + 1,
      message: inputValue,
      sender: "user",
    };

    const botMessage = {
      id: messages.length + 2,
      message: "",
      sender: "bot",
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInputValue("");

    streamChatResponse(userMessage.message, botMessage.id);
  };

  const streamChatResponse = async (
    userInput: string,
    botMessageId: number
  ) => {
    setIsStreaming(true);
    const threadId = threadIdRef.current;

    if (!threadId) {
      console.error("Thread ID not available.");
      setIsStreaming(false);
      return;
    }

    const response = await fetch("/api/chat-with-agent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: userInput, thread_id: threadId }),
    });

    if (!response.body) {
      console.error("No response body from API.");
      setIsStreaming(false);
      return;
    }
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let done = false;
    let fullMessage = "";

    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk
        .split("\n")
        .filter((line) => line.trim().startsWith("data:"));
      for (const line of lines) {
        const messageData = line.replace(/^data:\s*/, "");
        if (messageData === "[DONE]") {
          done = true;
          break;
        }

        try {
          const parsedRaw = JSON.parse(messageData);
          const parsedArray = Array.isArray(parsedRaw) ? parsedRaw : [parsedRaw];

          const contentChunk = parsedArray.find(
            (chunk: AIMessageChunk) => chunk.type === "AIMessageChunk"
          );

          const token = contentChunk?.content || "";

          // Accumulate the full message
          fullMessage += token;
          console.log("fullMessage", fullMessage);

          // Update the UI with the new message content
          setMessages((prevMessages) =>
            prevMessages.map((msg) =>
              msg.id === botMessageId ? { ...msg, message: fullMessage } : msg
            )
          );
        } catch (err) {
          console.error("Streaming parse error:", err);
        }
      }
    }

    setIsStreaming(false);
  };

  return (
    <div className="flex h-[calc(100vh-185px)]">
      <div className="flex flex-col h-[calc(100vh-20rem)] mx-auto md:w-2xl">
        <ChatMessageList className="flex-1 overflow-auto">
          {messages.map((message, index) => {
            const variant = message.sender === "user" ? "sent" : "received";
            return (
              <ChatBubble key={message.id} variant={variant}>
                <ChatBubbleAvatar fallback={variant === "sent" ? "US" : "AI"} />
                <ChatBubbleMessage>{message.message}</ChatBubbleMessage>
                <ChatBubbleActionWrapper>
                  {actionIcons.map(({ icon: Icon, label }) => (
                    <ChatBubbleAction
                      className="size-7"
                      key={label}
                      icon={<Icon className="size-4" />}
                      onClick={() =>
                        console.log(
                          `Action ${label} clicked for message ${index}`
                        )
                      }
                    />
                  ))}
                </ChatBubbleActionWrapper>
              </ChatBubble>
            );
          })}
        </ChatMessageList>
        <div className="p-4 border-t">
          <ChatInput
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                !e.shiftKey &&
                !isStreaming &&
                threadInitialized
              ) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder={
              isStreaming ? "Waiting for response..." : "Type your message..."
            }
            disabled={isStreaming}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default ChatComponent;
