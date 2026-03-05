'use client';

import { useState, useEffect } from 'react';
import ConceptSummaryPanel from './ConceptSummaryPanel';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import AnimatedAvatar from './AnimatedAvatar';

interface ChatHistoryItem {
  id: string;
  title: string;
  timestamp: number;
  preview: string;
}

interface LearnSidebarProps {
  currentTopic?: string;
  currentSubject?: string;
  onChatSelect?: (chatId: string) => void;
  currentChatId?: string;
}

export default function LearnSidebar({ 
  currentTopic, 
  currentSubject,
  onChatSelect,
  currentChatId 
}: LearnSidebarProps) {
  const { subjects } = useApp();
  const { user } = useAuth();
  const [isConceptSummaryOpen, setIsConceptSummaryOpen] = useState(true);
  const [isChatHistoryOpen, setIsChatHistoryOpen] = useState(true);
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Load chat history from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('grio_chat_history');
        if (stored) {
          const history = JSON.parse(stored);
          setChatHistory(history);
        }
      } catch (error) {
        console.error('Failed to load chat history:', error);
      }
    }
  }, []);

  // Listen for new chats to update history
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleStorageChange = () => {
        try {
          const stored = localStorage.getItem('grio_chat_history');
          if (stored) {
            const history = JSON.parse(stored);
            setChatHistory(history);
          }
        } catch (error) {
          console.error('Failed to load chat history:', error);
        }
      };

      // Listen for custom event from the learn page
      const handleChatUpdate = () => {
        handleStorageChange();
      };

      window.addEventListener('storage', handleStorageChange);
      window.addEventListener('grio_chat_updated', handleChatUpdate);
      // Also check periodically for same-tab updates
      const interval = setInterval(handleStorageChange, 500);

      return () => {
        window.removeEventListener('storage', handleStorageChange);
        window.removeEventListener('grio_chat_updated', handleChatUpdate);
        clearInterval(interval);
      };
    }
  }, []);

  const handleDeleteChat = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const updated = chatHistory.filter((chat) => chat.id !== chatId);
      setChatHistory(updated);
      localStorage.setItem('grio_chat_history', JSON.stringify(updated));
      
      // Also remove the chat messages
      localStorage.removeItem(`grio_chat_${chatId}`);
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

  const defaultSubject = subjects.length > 0 ? subjects[0].name : 'Mathematics';
  const displaySubject = currentSubject || defaultSubject;
  const displayTopic = currentTopic || 'Algebra';

  return (
    <aside className="w-80 bg-[#0b1f36] border-r border-white/10 flex flex-col h-full overflow-hidden">
      {/* Avatar at the top */}
      <div className="flex justify-center items-center pt-4 pb-3 flex-shrink-0 border-b border-white/10">
        <div className="relative flex items-center justify-center overflow-hidden" style={{ width: 160, height: 160 }}>
          <div style={{ transform: 'scale(0.89)', transformOrigin: 'center' }}>
            <AnimatedAvatar state="idle" isSpeaking={false} glowColor="teal" />
          </div>
        </div>
      </div>

      {/* Top Actions - ChatGPT style */}
      <div className="px-2 py-2 flex-shrink-0 border-b border-white/10">
        <div className="flex items-center gap-1">
          <button
            onClick={handleNewChat}
            className="flex-1 flex items-center gap-2 px-3 py-2.5 text-white hover:bg-white/5 rounded-lg text-sm font-medium transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            <span>New chat</span>
          </button>
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="flex items-center gap-2 px-3 py-2.5 text-white hover:bg-white/5 rounded-lg text-sm font-medium transition-colors"
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
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
              autoFocus
            />
          </div>
        )}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* Concept Summary Accordion - First */}
        <div className="border-b border-white/10">
          <button
            onClick={() => setIsConceptSummaryOpen(!isConceptSummaryOpen)}
            className="w-full flex items-center justify-between px-4 py-3 text-white hover:bg-white/5 transition-colors"
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
            <div className="bg-[#0b1f36] max-h-[60vh] overflow-y-auto">
              <ConceptSummaryPanel
                subject={displaySubject}
                topic={displayTopic}
                theme="dark"
              />
            </div>
          )}
        </div>

        {/* Chat History Accordion - Second */}
        <div className="border-b border-white/10">
          <button
            onClick={() => setIsChatHistoryOpen(!isChatHistoryOpen)}
            className="w-full flex items-center justify-between px-4 py-3 text-white hover:bg-white/5 transition-colors"
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
                <p className="text-xs text-gray-400 px-2 py-4 text-center">
                  {searchQuery ? 'No chats found' : 'No chat history yet'}
                </p>
              ) : (
                <div className="space-y-1">
                  {filteredChatHistory.map((chat) => (
                    <div
                      key={chat.id}
                      className={`group relative flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                        currentChatId === chat.id
                          ? 'bg-blue-600/30 text-white'
                          : 'text-gray-300 hover:bg-white/5'
                      }`}
                      onClick={() => onChatSelect?.(chat.id)}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{chat.title}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Show menu or delete
                          handleDeleteChat(chat.id, e);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded transition-opacity"
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

