export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface DatabaseMessage {
  type: 'ai' | 'human';
  content: string;
  additional_kwargs: Record<string, unknown>;
  response_metadata: Record<string, unknown>;
}

export interface ChatMessage {
  query: string;
}

export interface ChatSession {
  id: string;
  created_at: Date;
  last_message?: string;
}