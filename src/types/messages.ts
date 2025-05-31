// /types/messages.ts
export interface AIMessageChunk {
  type?: string;
  content?: string;
  [key: string]: any;
}
