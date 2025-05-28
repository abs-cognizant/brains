"use client";

import React from "react";
import { Paperclip, Smile } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
}

export default function ChatInput({
  value,
  onChange,
  onSend,
  disabled,
}: Props) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => alert("Attach clicked")}
        disabled={disabled}
        className="p-2 hover:bg-gray-200 rounded"
        aria-label="Attach file"
      >
        <Paperclip size={20} />
      </button>
      <button
        type="button"
        onClick={() => alert("Emoji clicked")}
        disabled={disabled}
        className="p-2 hover:bg-gray-200 rounded"
        aria-label="Emoji picker"
      >
        <Smile size={20} />
      </button>

      <textarea
        rows={1}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey && !disabled) {
            e.preventDefault();
            onSend();
          }
        }}
        disabled={disabled}
        placeholder={disabled ? "Waiting for response..." : "Type your message..."}
        className="flex-1 resize-none border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={onSend}
        disabled={disabled || !value.trim()}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Send
      </button>
    </div>
  );
}
