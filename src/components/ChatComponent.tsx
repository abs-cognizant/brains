"use client";

import { useState } from "react";
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

  const [messages, setMessages] = useState([
    {
      id: 1,
      message: "Hello, how has your day been? I hope you are doing well.",
      sender: "user",
    },
    {
      id: 2,
      message:
        "Hi, I am doing well, thank you for asking. How can I help you today?",
      sender: "bot",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

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

  const streamChatResponse = async (userInput: string, botMessageId: number) => {
    setIsStreaming(true);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: userInput }),
    });

    if (!response.body) {
      console.error("No response body from API.");
      setIsStreaming(false);
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let done = false;
    let accumulatedText = "";

    while (!done) {
      const { value, done: readerDone } = await reader.read();
      if (value) {
        const chunk = decoder.decode(value, { stream: true });
        accumulatedText += chunk;

        // Update the bot's message progressively
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === botMessageId
              ? { ...msg, message: accumulatedText }
              : msg
          )
        );
      }
      done = readerDone;
    }

    setIsStreaming(false);
  };

  return (
    <div className="flex h-[calc(100vh-185px)]">
      <div className="flex flex-col h-full m-auto md:max-w-2xl">
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
                          "Action " + label + " clicked for message " + index
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
              if (e.key === "Enter" && !e.shiftKey && !isStreaming) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder={isStreaming ? "Waiting for response..." : "Type your message..."}
            disabled={isStreaming}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default ChatComponent;
