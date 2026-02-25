export default function AIAssistantPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">AI Assistant</h1>
        <p className="text-slate-500 text-sm mt-1">
          Your intelligent teaching companion.
        </p>
      </div>

      <div className="max-w-2xl">
        <div className="bg-[#0f2a4a] rounded-2xl p-8 text-white mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-lg">
              ✦
            </div>
            <div>
              <p className="font-semibold">GRIO AI Assistant</p>
              <p className="text-blue-300 text-xs">Powered by curriculum-aware AI</p>
            </div>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">
            The AI assistant will help you draft lesson plans, generate practice questions,
            identify student knowledge gaps, and suggest teaching strategies aligned to
            your curriculum. This feature is currently in development.
          </p>
        </div>

        <div className="space-y-3">
          {[
            'Generate a 5-question quiz on Newtonian Mechanics',
            'Suggest a lesson plan for introducing Algebra to S3 students',
            'Summarise the key concepts in Chemical Bonding',
            'Identify common misconceptions in Probability',
          ].map((prompt) => (
            <div
              key={prompt}
              className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-4 cursor-not-allowed opacity-60"
            >
              <span className="text-blue-600 flex-shrink-0">✦</span>
              <p className="text-sm text-slate-700">{prompt}</p>
              <span className="ml-auto text-xs text-slate-400 font-medium bg-slate-100 px-2 py-1 rounded-full">
                Coming soon
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 border border-slate-200 rounded-xl p-4 bg-white">
          <div className="flex items-center gap-3">
            <input
              type="text"
              disabled
              placeholder="Ask the AI assistant anything about your curriculum..."
              className="flex-1 text-sm text-slate-400 bg-transparent outline-none cursor-not-allowed"
            />
            <button
              disabled
              className="px-4 py-2 bg-slate-100 text-slate-400 rounded-lg text-sm font-medium cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-3 text-center">
          AI features are coming in Phase 2.
        </p>
      </div>
    </div>
  );
}
