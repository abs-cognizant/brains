"use client";

import React, { forwardRef } from "react";
import ChatBubble from "./ChatBubble";

interface Message {
  id: number;
  message: string;
  sender: "user" | "bot";
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  messages: Message[];
}

const ChatMessageList = forwardRef<HTMLDivElement, Props>(
  ({ messages, className, ...rest }, ref) => {
    return (
      <div ref={ref} className={className} {...rest}>
        {messages.map((msg) => (
          <ChatBubble key={msg.id} sender={msg.sender}>
            {msg.message}
          </ChatBubble>
        ))}
      </div>
    );
  }
);
ChatMessageList.displayName = "ChatMessageList";

export default ChatMessageList;
