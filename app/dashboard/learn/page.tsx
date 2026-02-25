'use client';

import { useState, useRef, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { generateFollowUpResponse } from '@/lib/api';

type MessageRole = 'learner' | 'grio';

interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  title?: string;
}

const SUGGESTED_PROMPTS = [
  'Explain this concept in simpler terms',
  'Give me a practice question on this topic',
  'Summarise the key points I should remember',
  'I don’t understand — can you give an example?',
  'What’s the best way to revise this?',
];

const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'grio',
  content:
    "Hi! I'm Grio, your AI learning assistant. You can ask me to explain topics, give you practice questions, or help you understand something from your lessons. What would you like to work on?",
  title: 'Grio',
};

export default function LearnWithGrioPage() {
  const { subjects } = useApp();
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

    const learnerMsg: ChatMessage = {
      id: `learner-${Date.now()}`,
      role: 'learner',
      content: trimmed,
    };
    setMessages((prev) => [...prev, learnerMsg]);
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

  const currentSubject =
    subjects.length > 0 ? subjects[0].name : null;

  return (
    <div className="flex flex-col h-[calc(100vh-0px)] max-h-[calc(100vh-0px)]">
      {/* Page header & identity */}
      <div className="flex-shrink-0 p-6 pb-4 bg-slate-50 border-b border-slate-200">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-slate-900">Learn with Grio</h1>
          <p className="text-slate-500 text-sm mt-1">
            Chat with Grio to get explanations, practice questions, and feedback on your subjects.
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
                <p className="font-semibold text-sm">Grio</p>
                <p className="text-blue-300 text-xs">Your AI learning assistant</p>
              </div>
            </div>
            {currentSubject && (
              <span className="text-xs text-slate-500 bg-slate-200/80 px-2.5 py-1 rounded-full font-medium">
                Studying: {currentSubject}
              </span>
            )}
            <button
              type="button"
              onClick={startNewChat}
              className="text-sm text-slate-500 hover:text-slate-700 font-medium"
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
              className={`flex gap-3 ${msg.role === 'learner' ? 'flex-row-reverse' : ''}`}
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
                  msg.role === 'learner'
                    ? 'bg-[#0f2a4a] text-white ml-auto'
                    : 'bg-white border border-slate-200 text-slate-800'
                }`}
              >
                <p className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">
                  {msg.role === 'learner' ? 'You' : (msg.title ?? 'Grio')}
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
              <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3">
                <p className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">
                  Grio
                </p>
                <p className="text-slate-400 text-sm animate-pulse">Grio is thinking...</p>
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
            <p className="text-xs font-medium text-slate-500 mb-2">Try asking:</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  className="text-sm text-slate-600 bg-white border border-slate-200 rounded-full px-3 py-1.5 hover:bg-slate-50 hover:border-slate-300 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="flex-shrink-0 p-4 bg-white border-t border-slate-200">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Grio anything about your subject..."
            className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0f2a4a]/20 focus:border-[#0f2a4a]"
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
        <p className="text-xs text-slate-400 mt-2 text-center max-w-3xl mx-auto">
          Tip: Ask for an explanation, a practice question, or a summary of a topic.
        </p>
      </div>
    </div>
  );
}
