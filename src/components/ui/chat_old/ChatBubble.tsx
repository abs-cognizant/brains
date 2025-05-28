"use client";

import React from "react";

interface Props {
  sender: "user" | "bot";
  children: React.ReactNode;
}

export default function ChatBubble({ sender, children }: Props) {
  const isUser = sender === "user";

  return (
    <div
      className={`flex mb-3 ${isUser ? "justify-end" : "justify-start"}`}
      aria-live="polite"
    >
      <div
        className={`max-w-xs px-4 py-2 rounded-lg ${
          isUser ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-900"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
