'use client';

import { useState, useEffect } from 'react';
import ConceptSummaryPanel from './ConceptSummaryPanel';
import { useAuth } from '@/context/AuthContext';
import AnimatedAvatar from './AnimatedAvatar';

interface ChatHistoryItem {
  id: string;
  title: string;
  timestamp: number;
  preview: string;
  classroomId: string;
  subject: string;
  topic: string;
}

interface ClassroomSidebarProps {
  currentTopic?: string;
  currentSubject?: string;
  currentClassroomId?: string;
  theme?: 'light' | 'dark';
  onChatSelect?: (chatId: string) => void;
  currentChatId?: string;
  mode?: 'teach' | 'quiz' | 'revision' | 'chat';
}

export default function ClassroomSidebar({ 
  currentTopic, 
  currentSubject,
  currentClassroomId,
  theme = 'dark',
  onChatSelect,
  currentChatId,
  mode = 'chat'
}: ClassroomSidebarProps) {
  useAuth(); // auth context for potential future use
  const [isConceptSummaryOpen, setIsConceptSummaryOpen] = useState(mode !== 'chat');
  const [isChatHistoryOpen, setIsChatHistoryOpen] = useState(true);
  
  // Update Concept Summary visibility when mode changes
  useEffect(() => {
    if (mode === 'chat') {
      queueMicrotask(() => setIsConceptSummaryOpen(false));
    } else {
      queueMicrotask(() => setIsConceptSummaryOpen(true));
    }
  }, [mode]);
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Load chat history from localStorage filtered by classroom
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('grio_classroom_chat_history');
        if (stored) {
          const allHistory = JSON.parse(stored);
          const filtered = currentClassroomId
            ? allHistory.filter((chat: ChatHistoryItem) => chat.classroomId === currentClassroomId)
            : allHistory;
          queueMicrotask(() => setChatHistory(filtered));
        }
      } catch (error) {
        console.error('Failed to load chat history:', error);
      }
    }
  }, [currentClassroomId]);

  // Listen for new chats to update history
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleStorageChange = () => {
        try {
          const stored = localStorage.getItem('grio_classroom_chat_history');
          if (stored) {
            const allHistory = JSON.parse(stored);
            const filtered = currentClassroomId
              ? allHistory.filter((chat: ChatHistoryItem) => chat.classroomId === currentClassroomId)
              : allHistory;
            setChatHistory(filtered);
          }
        } catch (error) {
          console.error('Failed to load chat history:', error);
        }
      };

      // Listen for custom event from the classroom page
      const handleChatUpdate = () => {
        handleStorageChange();
      };

      window.addEventListener('storage', handleStorageChange);
      window.addEventListener('grio_classroom_chat_updated', handleChatUpdate);
      // Also check periodically for same-tab updates
      const interval = setInterval(handleStorageChange, 500);

      return () => {
        window.removeEventListener('storage', handleStorageChange);
        window.removeEventListener('grio_classroom_chat_updated', handleChatUpdate);
        clearInterval(interval);
      };
    }
  }, [currentClassroomId]);

  const handleDeleteChat = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const stored = localStorage.getItem('grio_classroom_chat_history');
      if (stored) {
        const allHistory = JSON.parse(stored);
        const updated = allHistory.filter((chat: ChatHistoryItem) => chat.id !== chatId);
        localStorage.setItem('grio_classroom_chat_history', JSON.stringify(updated));
        
        // Update local state
        const filtered = currentClassroomId
          ? updated.filter((chat: ChatHistoryItem) => chat.classroomId === currentClassroomId)
          : updated;
        setChatHistory(filtered);
        
        // Also remove the chat messages
        localStorage.removeItem(`grio_classroom_chat_${chatId}`);
      }
    } catch (error) {
      console.error('Failed to delete chat:', error);
    }
  };

  const handleNewChat = () => {
    if (onChatSelect) {
      onChatSelect('new');
    }
  };

  const filteredChatHistory = chatHistory.filter((chat) =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isLight = theme === 'light';
  const bgColor = isLight ? 'bg-white' : 'bg-gray-900/40';
  const borderColor = isLight ? 'border-gray-200' : 'border-white/10';
  const textColor = isLight ? 'text-gray-900' : 'text-white';
  const textMuted = isLight ? 'text-gray-500' : 'text-gray-400';
  const hoverBg = isLight ? 'hover:bg-gray-50' : 'hover:bg-white/5';
  const inputBg = isLight ? 'bg-gray-50 border-gray-300' : 'bg-white/5 border-white/10';
  const inputText = isLight ? 'text-gray-900' : 'text-white';
  const inputPlaceholder = isLight ? 'placeholder-gray-400' : 'placeholder-gray-500';

  const defaultSubject = currentSubject || 'Mathematics';
  const displayTopic = currentTopic || 'Algebra';

  return (
    <aside className={`w-80 ${bgColor} border-r ${borderColor} flex flex-col h-full overflow-hidden`}>
      {/* Avatar at the top */}
      <div className={`flex justify-center items-center pt-4 pb-3 flex-shrink-0 border-b ${borderColor}`}>
        <div className="relative flex items-center justify-center overflow-hidden" style={{ width: 160, height: 160 }}>
          <div style={{ transform: 'scale(0.89)', transformOrigin: 'center' }}>
            <AnimatedAvatar state="idle" isSpeaking={false} glowColor="teal" />
          </div>
        </div>
      </div>

      {/* Top Actions - ChatGPT style */}
      <div className={`px-2 py-2 flex-shrink-0 border-b ${borderColor}`}>
        <div className="flex items-center gap-1">
          <button
            onClick={handleNewChat}
            className={`flex-1 flex items-center gap-2 px-3 py-2.5 ${textColor} ${hoverBg} rounded-lg text-sm font-medium transition-colors`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            <span>New chat</span>
          </button>
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className={`flex items-center gap-2 px-3 py-2.5 ${textColor} ${hoverBg} rounded-lg text-sm font-medium transition-colors`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <span>Search</span>
          </button>
        </div>
        {isSearchOpen && (
          <div className="mt-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chats..."
              className={`w-full px-3 py-2 ${inputBg} border ${borderColor} rounded-lg ${inputText} text-sm ${inputPlaceholder} focus:outline-none focus:ring-2 ${isLight ? 'focus:ring-gray-300' : 'focus:ring-white/20'}`}
              autoFocus
            />
          </div>
        )}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* Concept Summary Accordion - First (hidden in chat mode) */}
        {mode !== 'chat' && (
          <div className={`border-b ${borderColor}`}>
            <button
              onClick={() => setIsConceptSummaryOpen(!isConceptSummaryOpen)}
              className={`w-full flex items-center justify-between px-4 py-3 ${textColor} ${hoverBg} transition-colors`}
              aria-expanded={isConceptSummaryOpen}
            >
              <span className="text-sm font-semibold">Concept Summary</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform ${isConceptSummaryOpen ? 'rotate-180' : ''}`}
              >
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
            
            {isConceptSummaryOpen && (
              <div className={`${bgColor} max-h-[60vh] overflow-y-auto`}>
                <ConceptSummaryPanel
                  subject={defaultSubject}
                  topic={displayTopic}
                  theme={theme}
                />
              </div>
            )}
          </div>
        )}

        {/* Chat History Accordion - Second */}
        <div className={`border-b ${borderColor}`}>
          <button
            onClick={() => setIsChatHistoryOpen(!isChatHistoryOpen)}
            className={`w-full flex items-center justify-between px-4 py-3 ${textColor} ${hoverBg} transition-colors`}
            aria-expanded={isChatHistoryOpen}
          >
            <span className="text-sm font-semibold">Chat History</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform ${isChatHistoryOpen ? 'rotate-180' : ''}`}
            >
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
          
          {isChatHistoryOpen && (
            <div className="px-2 pb-3">
              {filteredChatHistory.length === 0 ? (
                <p className={`text-xs ${textMuted} px-2 py-4 text-center`}>
                  {searchQuery ? 'No chats found' : 'No chat history yet'}
                </p>
              ) : (
                <div className="space-y-1">
                  {filteredChatHistory.map((chat) => (
                    <div
                      key={chat.id}
                      className={`group relative flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                        currentChatId === chat.id
                          ? isLight
                            ? 'bg-red-50 text-red-900 border border-red-200'
                            : 'bg-red-600/30 text-red-200'
                          : `${textColor} ${hoverBg}`
                      }`}
                      onClick={() => onChatSelect?.(chat.id)}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{chat.title}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteChat(chat.id, e);
                        }}
                        className={`opacity-0 group-hover:opacity-100 p-1 ${isLight ? 'hover:bg-gray-200' : 'hover:bg-white/10'} rounded transition-opacity`}
                        aria-label="Chat options"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="1"/>
                          <circle cx="12" cy="5" r="1"/>
                          <circle cx="12" cy="19" r="1"/>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

