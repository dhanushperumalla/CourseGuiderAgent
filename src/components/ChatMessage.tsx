import React, { useState } from 'react';
import { MessageCircle, Bot, Brain } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const [showThinking, setShowThinking] = useState(false);
  const isUser = message.role === 'user';

  // Extract thinking process if it exists
  const hasThinking = message.content.includes('<think>');
  let displayContent = message.content;
  let thinkingProcess = '';

  if (hasThinking) {
    const thinkMatch = message.content.match(/<think>(.*?)<\/think>/s);
    if (thinkMatch) {
      thinkingProcess = thinkMatch[1].trim();
      displayContent = message.content.replace(/<think>.*?<\/think>/s, '').trim();
    }
  }

  return (
    <div className={`flex items-start gap-4 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`p-2 rounded-full ${isUser ? 'bg-blue-500' : 'bg-gray-500'}`}>
        {isUser ? <MessageCircle className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
      </div>
      <div className="flex-1">
        <div
          className={`rounded-lg p-4 ${
            isUser ? 'bg-blue-500 text-white' : 'bg-gray-100'
          }`}
        >
          <div className="prose max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {displayContent}
            </ReactMarkdown>
          </div>
        </div>
        
        {hasThinking && !isUser && (
          <div className="mt-2">
            <button
              onClick={() => setShowThinking(!showThinking)}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
            >
              <Brain className="w-4 h-4" />
              {showThinking ? 'Hide' : 'Show'} thinking process
            </button>
            
            {showThinking && (
              <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="prose max-w-none text-sm text-gray-600">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {thinkingProcess}
                  </ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};