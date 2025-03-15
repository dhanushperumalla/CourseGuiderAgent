import React from 'react';
import { PlusCircle, MessageSquare, Trash2 } from 'lucide-react';
import { ChatSession } from '../types';
import { supabase } from '../lib/supabase';

interface SidebarProps {
  sessions: ChatSession[];
  currentSessionId: string;
  onNewChat: () => void;
  onSelectSession: (sessionId: string) => void;
  onDeleteSession: (sessionId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  sessions,
  currentSessionId,
  onNewChat,
  onSelectSession,
  onDeleteSession,
}) => {
  const handleDeleteSession = async (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this chat?')) {
      await supabase.from('messages').delete().eq('session_id', sessionId);
      onDeleteSession(sessionId);
    }
  };

  return (
    <div className="w-64 bg-gray-800 h-screen flex flex-col">
      <div className="p-4">
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 px-4 transition-colors"
        >
          <PlusCircle className="w-5 h-5" />
          New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {sessions.map((session) => (
          <div
            key={session.id}
            onClick={() => onSelectSession(session.id)}
            className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-700 transition-colors ${
              currentSessionId === session.id ? 'bg-gray-700' : ''
            }`}
          >
            <MessageSquare className="w-5 h-5 text-gray-400" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-200 truncate">
                {session.last_message || 'New Chat'}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(session.created_at).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={(e) => handleDeleteSession(session.id, e)}
              className="p-1 hover:bg-gray-600 rounded-full transition-colors"
            >
              <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-400" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}