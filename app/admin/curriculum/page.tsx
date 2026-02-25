'use client';

import { useState, useEffect } from 'react';
import { getSubjects, getTopics, addSubject, addTopic } from '@/lib/api';
import { countries, curricula } from '@/lib/mockData';
import type { Subject, Topic } from '@/lib/types';

export default function AdminCurriculumPage() {
  const [selectedCurriculumId, setSelectedCurriculumId] = useState('ug-secondary-cur');
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [showAddSubject, setShowAddSubject] = useState(false);
  const [showAddTopic, setShowAddTopic] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState('');
  const [newSubjectDesc, setNewSubjectDesc] = useState('');
  const [newTopicName, setNewTopicName] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getSubjects(selectedCurriculumId).then((data) => {
      setSubjects(data);
      setSelectedSubjectId(null);
      setTopics([]);
    });
  }, [selectedCurriculumId]);

  useEffect(() => {
    if (selectedSubjectId) {
      getTopics(selectedSubjectId).then(setTopics);
    }
  }, [selectedSubjectId]);

  async function handleAddSubject() {
    if (!newSubjectName.trim()) return;
    setSaving(true);
    const newSubject = await addSubject({
      name: newSubjectName.trim(),
      curriculumId: selectedCurriculumId,
      description: newSubjectDesc.trim() || `${newSubjectName.trim()} curriculum content.`,
      icon: 'book-open',
      color: '#1e3a5f',
    });
    setSubjects((prev) => [...prev, newSubject]);
    setNewSubjectName('');
    setNewSubjectDesc('');
    setShowAddSubject(false);
    setSaving(false);
  }

  async function handleAddTopic() {
    if (!newTopicName.trim() || !selectedSubjectId) return;
    setSaving(true);
    const newTopic = await addTopic({
      name: newTopicName.trim(),
      subjectId: selectedSubjectId,
      order: topics.length + 1,
      description: `${newTopicName.trim()} content.`,
    });
    setTopics((prev) => [...prev, newTopic]);
    setNewTopicName('');
    setShowAddTopic(false);
    setSaving(false);
  }

  const selectedCurriculum = curricula.find((c) => c.id === selectedCurriculumId);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Curriculum</h1>
        <p className="text-slate-500 text-sm mt-1">
          Manage subjects and topics across curricula.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div>
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
            Curriculum
          </h2>
          <div className="space-y-2">
            {countries.map((country) => {
              const countryCurricula = curricula.filter((c) => c.countryId === country.id);
              return (
                <div key={country.id}>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wide px-3 py-1">
                    {country.name}
                  </p>
                  {countryCurricula.map((cur) => (
                    <button
                      key={cur.id}
                      onClick={() => setSelectedCurriculumId(cur.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                        selectedCurriculumId === cur.id
                          ? 'bg-[#0f2a4a] text-white font-medium'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {cur.name}
                    </button>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
              Subjects ({subjects.length})
            </h2>
            <button
              onClick={() => setShowAddSubject((v) => !v)}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium"
            >
              + Add
            </button>
          </div>

          {showAddSubject && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-3 space-y-3">
              <input
                type="text"
                placeholder="Subject name"
                value={newSubjectName}
                onChange={(e) => setNewSubjectName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Description (optional)"
                value={newSubjectDesc}
                onChange={(e) => setNewSubjectDesc(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAddSubject}
                  disabled={saving}
                  className="flex-1 py-2 bg-[#0f2a4a] text-white text-sm font-semibold rounded-lg hover:bg-[#1a3d6b] disabled:opacity-60"
                >
                  {saving ? 'Saving...' : 'Add Subject'}
                </button>
                <button
                  onClick={() => setShowAddSubject(false)}
                  className="px-3 py-2 border border-slate-200 text-slate-600 text-sm rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="space-y-1">
            {subjects.map((subject) => (
              <button
                key={subject.id}
                onClick={() => setSelectedSubjectId(subject.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  selectedSubjectId === subject.id
                    ? 'bg-blue-50 border border-blue-200 text-blue-800 font-medium'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {subject.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
              Topics {selectedSubjectId ? `(${topics.length})` : ''}
            </h2>
            {selectedSubjectId && (
              <button
                onClick={() => setShowAddTopic((v) => !v)}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                + Add
              </button>
            )}
          </div>

          {!selectedSubjectId && (
            <p className="text-sm text-slate-400">Select a subject to view topics.</p>
          )}

          {selectedSubjectId && showAddTopic && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-3 space-y-3">
              <input
                type="text"
                placeholder="Topic name"
                value={newTopicName}
                onChange={(e) => setNewTopicName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAddTopic}
                  disabled={saving}
                  className="flex-1 py-2 bg-[#0f2a4a] text-white text-sm font-semibold rounded-lg hover:bg-[#1a3d6b] disabled:opacity-60"
                >
                  {saving ? 'Saving...' : 'Add Topic'}
                </button>
                <button
                  onClick={() => setShowAddTopic(false)}
                  className="px-3 py-2 border border-slate-200 text-slate-600 text-sm rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {selectedSubjectId && (
            <div className="space-y-1">
              {topics.map((topic) => (
                <div
                  key={topic.id}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-600 bg-white border border-slate-200"
                >
                  <span className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold text-slate-500 flex-shrink-0">
                    {topic.order}
                  </span>
                  {topic.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
