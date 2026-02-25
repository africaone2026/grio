'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useApp } from '@/context/AppContext';
import { getLessonPlansSupabase, saveLessonPlanSupabase } from '@/lib/supabaseApi';

const DEFAULT_WEEKS = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'];

const DEFAULT_PLANS: Record<string, Record<string, string>> = {
  Mathematics: {
    'Week 1': 'Algebra — Introduction to Algebraic Expressions',
    'Week 2': 'Algebra — Solving Linear Equations',
    'Week 3': 'Geometry — Angles and Their Properties',
    'Week 4': 'Geometry — Properties of Triangles',
  },
  Physics: {
    'Week 1': "Mechanics — Forces and Newton's Laws",
    'Week 2': 'Mechanics — Motion and Kinematics',
    'Week 3': 'Mechanics — Energy, Work, and Power',
    'Week 4': 'Electricity — Introduction to Circuits',
  },
  Chemistry: {
    'Week 1': 'Periodic Table — Elements and Trends',
    'Week 2': 'Bonding — Ionic and Covalent Bonds',
    'Week 3': 'Reactions — Types and Rates',
    'Week 4': 'Organic — Hydrocarbons',
  },
};

function buildKey(subject: string, week: string) {
  return `${subject}__${week}`;
}

export default function LessonPlannerPage() {
  const { user } = useAuth();
  const { subjects } = useApp();

  const subjectNames = subjects.length > 0
    ? subjects.map((s) => s.name)
    : Object.keys(DEFAULT_PLANS);

  const [selectedSubject, setSelectedSubject] = useState(subjectNames[0] ?? 'Mathematics');
  const [plans, setPlans] = useState<Record<string, string>>({});
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loadError, setLoadError] = useState('');

  const loadPlans = useCallback(async () => {
    if (!user) return;
    try {
      const entries = await getLessonPlansSupabase(user.id);
      const flat: Record<string, string> = {};
      for (const entry of entries) {
        flat[buildKey(entry.subjectName, entry.weekLabel)] = entry.content;
      }
      setPlans(flat);
    } catch {
      setLoadError('Could not load saved plans. Showing defaults.');
    }
  }, [user]);

  useEffect(() => {
    loadPlans();
  }, [loadPlans]);

  useEffect(() => {
    if (subjectNames.length > 0 && !subjectNames.includes(selectedSubject)) {
      setSelectedSubject(subjectNames[0]);
    }
  }, [subjectNames, selectedSubject]);

  const startEdit = (week: string) => {
    const key = buildKey(selectedSubject, week);
    const current = plans[key] ?? DEFAULT_PLANS[selectedSubject]?.[week] ?? '';
    setEditingKey(key);
    setEditValue(current);
  };

  const cancelEdit = () => {
    setEditingKey(null);
    setEditValue('');
  };

  const saveEdit = async (week: string) => {
    if (!user) return;
    setSaving(true);
    const key = buildKey(selectedSubject, week);
    try {
      await saveLessonPlanSupabase(user.id, selectedSubject, week, editValue);
      setPlans((prev) => ({ ...prev, [key]: editValue }));
      setEditingKey(null);
      setEditValue('');
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      setLoadError('Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Lesson Planner</h1>
          <p className="text-slate-500 text-sm mt-1">
            Plan and schedule your lessons by week and subject. Changes are saved automatically.
          </p>
        </div>
        {saved && (
          <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Saved
          </div>
        )}
      </div>

      {loadError && (
        <div className="mb-6 bg-amber-50 border border-amber-200 text-amber-700 text-sm rounded-lg px-4 py-3" role="alert">
          {loadError}
        </div>
      )}

      <div className="flex flex-wrap gap-3 mb-8">
        {subjectNames.map((subject) => (
          <button
            key={subject}
            onClick={() => { setSelectedSubject(subject); setEditingKey(null); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedSubject === subject
                ? 'bg-[#0f2a4a] text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {subject}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {DEFAULT_WEEKS.map((week) => {
          const key = buildKey(selectedSubject, week);
          const isEditing = editingKey === key;
          const content = plans[key] ?? DEFAULT_PLANS[selectedSubject]?.[week] ?? '';

          return (
            <div key={week} className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-start gap-6">
                <div className="w-20 flex-shrink-0 pt-0.5">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    {week}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  {isEditing ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        placeholder="e.g. Algebra — Solving Quadratic Equations"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        aria-label={`Lesson plan for ${week}`}
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') saveEdit(week);
                          if (e.key === 'Escape') cancelEdit();
                        }}
                      />
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => saveEdit(week)}
                          disabled={saving}
                          className="px-4 py-1.5 bg-[#0f2a4a] text-white text-xs font-medium rounded-lg hover:bg-[#1a3d6b] disabled:opacity-60 transition-colors"
                        >
                          {saving ? 'Saving...' : 'Save'}
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="px-4 py-1.5 bg-white border border-slate-200 text-slate-600 text-xs font-medium rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <span className="text-xs text-slate-400 ml-1">Enter to save, Esc to cancel</span>
                      </div>
                    </div>
                  ) : (
                    <p className={`text-sm ${content ? 'font-medium text-slate-800' : 'text-slate-400 italic'}`}>
                      {content || 'Not planned — click Edit to add'}
                    </p>
                  )}
                </div>

                {!isEditing && (
                  <button
                    onClick={() => startEdit(week)}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium px-3 py-1.5 rounded-lg border border-blue-100 hover:bg-blue-50 transition-colors flex-shrink-0"
                    aria-label={`Edit lesson plan for ${week}`}
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
