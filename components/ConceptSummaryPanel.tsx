'use client';

import { useState, useEffect } from 'react';
import { getConceptSummary } from '@/lib/api';
import type { ConceptSummary } from '@/lib/types';

type Theme = 'light' | 'dark';

interface ConceptSummaryPanelProps {
  subject: string;
  topic: string;
  theme?: Theme;
}

export default function ConceptSummaryPanel({ subject, topic, theme = 'dark' }: ConceptSummaryPanelProps) {
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

  const isLight = theme === 'light';

  if (loading) {
    return (
      <div className="p-5 sm:p-6 space-y-4">
        <div className={`h-5 w-3/4 rounded animate-pulse ${isLight ? 'bg-slate-200' : 'bg-slate-700/50'}`} />
        <div className={`h-16 rounded animate-pulse ${isLight ? 'bg-slate-200' : 'bg-slate-700/50'}`} />
        <div className={`h-20 rounded animate-pulse ${isLight ? 'bg-slate-200' : 'bg-slate-700/50'}`} />
      </div>
    );
  }

  if (!summary) {
    return (
      <div className={`p-5 sm:p-6 text-sm ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
        No concept summary available for this topic.
      </div>
    );
  }

  const sectionHeading = `text-xs font-semibold uppercase tracking-widest mb-2 ${isLight ? 'text-teal-600' : 'text-teal-400'}`;
  const bodyText = `text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`;
  const exampleBlock = `text-sm whitespace-pre-wrap font-sans rounded-xl p-3 border ${
    isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-800/60 border-slate-600/40 text-slate-300'
  }`;

  return (
    <div className="p-5 sm:p-6 flex flex-col gap-6 overflow-y-auto h-full">
      <h2
        className={`text-base sm:text-lg font-bold pb-2 border-b ${
          isLight ? 'text-slate-900 border-slate-200' : 'text-white border-white/10'
        }`}
      >
        {subject} – {topic}
      </h2>

      <section>
        <h3 className={sectionHeading}>Definition</h3>
        <p className={bodyText}>{summary.definition}</p>
      </section>

      <section>
        <h3 className={sectionHeading}>Formula rules</h3>
        <ol className={`list-decimal list-inside space-y-1.5 ${bodyText}`}>
          {summary.formulaRules.map((rule, i) => (
            <li key={i}>{rule}</li>
          ))}
        </ol>
      </section>

      <section>
        <h3 className={sectionHeading}>Example</h3>
        <pre className={exampleBlock}>{summary.example}</pre>
      </section>

      <section>
        <h3 className={sectionHeading}>Common mistakes</h3>
        <ul className={`list-disc list-inside space-y-1.5 ${bodyText}`}>
          {summary.commonMistakes.map((mistake, i) => (
            <li key={i}>{mistake}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
