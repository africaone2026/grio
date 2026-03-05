'use client';

import { useState, useRef, useEffect } from 'react';
import { generateFollowUpResponse } from '@/lib/api';

type MessageRole = 'user' | 'grio';

interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  title?: string;
}

const SUGGESTED_PROMPTS = [
  'Generate a 5-question quiz on Newtonian Mechanics',
  'Suggest a lesson plan for introducing Algebra to S3 students',
  'Summarise the key concepts in Chemical Bonding',
  'Identify common misconceptions in Probability',
];

const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'grio',
  content:
    "Hi! I'm Grio, your AI teaching assistant. I can help you draft lesson plans, generate practice questions, identify student knowledge gaps, and suggest teaching strategies aligned to your curriculum. What would you like help with?",
  title: 'Grio',
};

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmed,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await generateFollowUpResponse(trimmed);
      const grioMsg: ChatMessage = {
        id: `grio-${Date.now()}`,
        role: 'grio',
        content: response.content,
        title: response.title ?? 'Grio',
      };
      setMessages((prev) => [...prev, grioMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `grio-err-${Date.now()}`,
          role: 'grio',
          content: "Sorry, I couldn't process that. Please try again.",
          title: 'Grio',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const startNewChat = () => {
    setMessages([WELCOME_MESSAGE]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-0px)] max-h-[calc(100vh-0px)]">
      {/* Page header & identity */}
      <div className="flex-shrink-0 p-6 pb-4 bg-gray-50 border-b border-gray-200">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">AI Assistant</h1>
          <p className="text-gray-500 text-sm mt-1">
            Your intelligent teaching companion. Chat with Grio to get lesson ideas, quizzes, and curriculum support.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-3 bg-[#0f2a4a] text-white rounded-xl px-4 py-2.5">
              <div
                className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-lg font-semibold"
                aria-hidden
              >
                ✦
              </div>
              <div>
                <p className="font-semibold text-sm">GRIO AI Assistant</p>
                <p className="text-blue-300 text-xs">Powered by curriculum-aware AI</p>
              </div>
            </div>
            <button
              type="button"
              onClick={startNewChat}
              className="text-sm text-gray-500 hover:text-gray-700 font-medium"
            >
              New chat
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 py-4 space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {msg.role === 'grio' && (
                <div
                  className="w-8 h-8 rounded-lg bg-[#0f2a4a] flex items-center justify-center text-white text-sm flex-shrink-0"
                  aria-hidden
                >
                  ✦
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  msg.role === 'user'
                    ? 'bg-[#0f2a4a] text-white ml-auto'
                    : 'bg-white border border-gray-200 text-gray-800'
                }`}
              >
                <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                  {msg.role === 'user' ? 'You' : (msg.title ?? 'Grio')}
                </p>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <div
                className="w-8 h-8 rounded-lg bg-[#0f2a4a] flex items-center justify-center text-white text-sm flex-shrink-0"
                aria-hidden
              >
                ✦
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                  Grio
                </p>
                <p className="text-gray-400 text-sm animate-pulse">Grio is thinking...</p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Suggested prompts (show when only welcome message) */}
      {messages.length === 1 && (
        <div className="flex-shrink-0 px-6 pb-2">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-medium text-gray-500 mb-2">Try asking:</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  className="text-sm text-gray-600 bg-white border border-gray-200 rounded-full px-3 py-1.5 hover:bg-gray-50 hover:border-gray-300 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="flex-shrink-0 p-4 bg-white border-t border-gray-200">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask the AI assistant anything about your curriculum..."
            className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0f2a4a]/20 focus:border-[#0f2a4a]"
            disabled={isLoading}
            aria-label="Message to Grio"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-5 py-3 bg-[#0f2a4a] text-white rounded-xl font-medium text-sm hover:bg-[#1a3d6b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </form>
        <p className="text-xs text-gray-400 mt-2 text-center max-w-3xl mx-auto">
          Tip: Ask for quiz ideas, lesson plans, or concept summaries.
        </p>
      </div>
    </div>
  );
}
