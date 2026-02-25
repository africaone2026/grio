import type { LessonPlanEntry, LessonSession } from './types';

const STORAGE_KEY = 'lesson_plans';

function loadPlansFromStorage(): LessonPlanEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function savePlansToStorage(plans: LessonPlanEntry[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
}

export async function getLessonPlansSupabase(teacherId: string): Promise<LessonPlanEntry[]> {
  return loadPlansFromStorage().filter((p) => p.teacherId === teacherId);
}

export async function saveLessonPlanSupabase(
  teacherId: string,
  subjectName: string,
  weekLabel: string,
  content: string
): Promise<void> {
  const all = loadPlansFromStorage();
  const idx = all.findIndex(
    (p) => p.teacherId === teacherId && p.subjectName === subjectName && p.weekLabel === weekLabel
  );
  const entry: LessonPlanEntry = { teacherId, subjectName, weekLabel, content };
  if (idx >= 0) {
    all[idx] = entry;
  } else {
    all.push(entry);
  }
  savePlansToStorage(all);
}

export async function markLessonCompleteSupabase(userId: string, lessonId: string): Promise<void> {
  if (typeof window === 'undefined') return;
  const key = `progress_${userId}`;
  const ids: string[] = JSON.parse(localStorage.getItem(key) ?? '[]');
  if (!ids.includes(lessonId)) {
    ids.push(lessonId);
    localStorage.setItem(key, JSON.stringify(ids));
  }
}

export async function getCompletedLessonIdsSupabase(userId: string): Promise<string[]> {
  if (typeof window === 'undefined') return [];
  const key = `progress_${userId}`;
  return JSON.parse(localStorage.getItem(key) ?? '[]');
}

export async function saveSessionSupabase(session: LessonSession): Promise<void> {
  if (typeof window === 'undefined') return;
  const SESSIONS_KEY = 'lesson_sessions';
  const sessions: LessonSession[] = JSON.parse(localStorage.getItem(SESSIONS_KEY) ?? '[]');
  const idx = sessions.findIndex((s) => s.id === session.id);
  if (idx >= 0) {
    sessions[idx] = session;
  } else {
    sessions.unshift(session);
  }
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
}

export async function getSessionsSupabase(teacherId: string): Promise<LessonSession[]> {
  if (typeof window === 'undefined') return [];
  const SESSIONS_KEY = 'lesson_sessions';
  const sessions: LessonSession[] = JSON.parse(localStorage.getItem(SESSIONS_KEY) ?? '[]');
  return sessions.filter((s) => s.teacherId === teacherId);
}
