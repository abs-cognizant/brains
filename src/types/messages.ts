// /types/messages.ts
export interface AIMessageChunk {
  type?: string;
  content?: string;
  role?: string;
  //[key: string]: any;
}
