'use client';

import { useState, useEffect } from 'react';
import { getConceptSummary } from '@/lib/api';
import type { ConceptSummary } from '@/lib/types';

interface ConceptSummaryPanelProps {
  subject: string;
  topic: string;
}

export default function ConceptSummaryPanel({ subject, topic }: ConceptSummaryPanelProps) {
  const [summary, setSummary] = useState<ConceptSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getConceptSummary(subject, topic)
      .then((data) => {
        if (!cancelled) setSummary(data);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [subject, topic]);

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <div className="h-5 w-3/4 bg-slate-700/50 rounded animate-pulse" />
        <div className="h-20 bg-slate-700/50 rounded animate-pulse" />
        <div className="h-24 bg-slate-700/50 rounded animate-pulse" />
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="p-6 text-slate-400 text-sm">
        No concept summary available for this topic.
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col gap-6 overflow-y-auto h-full">
      <h2 className="text-lg font-bold text-white border-b border-white/10 pb-2">
        {subject} – {topic}
      </h2>

      <section>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-teal-400 mb-2">
          Definition
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed">{summary.definition}</p>
      </section>

      <section>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-teal-400 mb-2">
          Formula rules
        </h3>
        <ol className="list-decimal list-inside space-y-1.5 text-slate-300 text-sm">
          {summary.formulaRules.map((rule, i) => (
            <li key={i}>{rule}</li>
          ))}
        </ol>
      </section>

      <section>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-teal-400 mb-2">
          Example
        </h3>
        <pre className="text-slate-300 text-sm whitespace-pre-wrap font-sans bg-slate-800/60 border border-slate-600/40 rounded-lg p-3">
          {summary.example}
        </pre>
      </section>

      <section>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-teal-400 mb-2">
          Common mistakes
        </h3>
        <ul className="list-disc list-inside space-y-1.5 text-slate-300 text-sm">
          {summary.commonMistakes.map((mistake, i) => (
            <li key={i}>{mistake}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
