'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import type { Subject, Topic, Lesson, UserProgress, User, School, Classroom, LessonSession } from '@/lib/types';
import {
  getSubjects,
  getTopics,
  getLessons,
  getUserProgress,
  markLessonComplete as apiMarkComplete,
  getCompletedLessonIds,
  getSchools,
  getClassroomsBySchool,
  getUsersBySchool,
  getSchoolAnalytics,
  getGlobalAnalytics,
} from '@/lib/api';
import type { SchoolAnalytics, GlobalAnalytics } from '@/lib/types';

const SESSIONS_STORAGE_KEY = 'app_sessions';

function loadSessionsFromStorage(): LessonSession[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(SESSIONS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveSessionsToStorage(sessions: LessonSession[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(sessions));
}

interface AppContextValue {
  subjects: Subject[];
  topics: Topic[];
  lessons: Lesson[];
  userProgress: UserProgress | null;
  completedLessonIds: string[];
  isLoadingSubjects: boolean;
  error: string | null;
  sessions: LessonSession[];
  loadSubjects: (curriculumId: string) => Promise<void>;
  loadTopics: (subjectId: string) => Promise<void>;
  loadLessons: (topicId: string) => Promise<void>;
  markLessonComplete: (userId: string, lessonId: string, curriculumId?: string) => Promise<void>;
  refreshProgress: (userId: string, curriculumId: string) => Promise<void>;
  initForUser: (user: User) => Promise<void>;
  fetchSchools: () => Promise<School[]>;
  fetchClassroomsBySchool: (schoolId: string) => Promise<Classroom[]>;
  fetchUsersBySchool: (schoolId: string) => Promise<User[]>;
  fetchSchoolAnalytics: (schoolId: string) => Promise<SchoolAnalytics>;
  fetchGlobalAnalytics: () => Promise<GlobalAnalytics>;
  addSession: (session: LessonSession) => void;
  clearError: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [isLoadingSubjects, setIsLoadingSubjects] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessions, setSessions] = useState<LessonSession[]>([]);

  useEffect(() => {
    setSessions(loadSessionsFromStorage());
  }, []);

  const clearError = useCallback(() => setError(null), []);

  const loadSubjects = useCallback(async (curriculumId: string) => {
    setIsLoadingSubjects(true);
    try {
      const data = await getSubjects(curriculumId);
      setSubjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load subjects.');
    } finally {
      setIsLoadingSubjects(false);
    }
  }, []);

  const loadTopics = useCallback(async (subjectId: string) => {
    try {
      const data = await getTopics(subjectId);
      setTopics(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load topics.');
    }
  }, []);

  const loadLessons = useCallback(async (topicId: string) => {
    try {
      const data = await getLessons(topicId);
      setLessons(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load lessons.');
    }
  }, []);

  const refreshProgress = useCallback(
    async (userId: string, curriculumId: string) => {
      try {
        const [progress, ids] = await Promise.all([
          getUserProgress(userId, curriculumId),
          getCompletedLessonIds(userId),
        ]);
        setUserProgress(progress);
        setCompletedLessonIds(ids);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load progress.');
      }
    },
    []
  );

  const markLessonComplete = useCallback(
    async (userId: string, lessonId: string, curriculumId?: string) => {
      try {
        await apiMarkComplete(userId, lessonId);
        setCompletedLessonIds((prev) =>
          prev.includes(lessonId) ? prev : [...prev, lessonId]
        );
        if (curriculumId) {
          const progress = await getUserProgress(userId, curriculumId);
          setUserProgress(progress);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to save progress.');
      }
    },
    []
  );

  const initForUser = useCallback(async (user: User) => {
    await Promise.all([
      loadSubjects(user.curriculumId),
      refreshProgress(user.id, user.curriculumId),
    ]);
  }, [loadSubjects, refreshProgress]);

  const fetchSchools = useCallback(() => getSchools(), []);
  const fetchClassroomsBySchool = useCallback(
    (schoolId: string) => getClassroomsBySchool(schoolId),
    []
  );
  const fetchUsersBySchool = useCallback(
    (schoolId: string) => getUsersBySchool(schoolId),
    []
  );
  const fetchSchoolAnalytics = useCallback(
    (schoolId: string) => getSchoolAnalytics(schoolId),
    []
  );
  const fetchGlobalAnalytics = useCallback(() => getGlobalAnalytics(), []);

  const addSession = useCallback((session: LessonSession) => {
    setSessions((prev) => {
      const next = [session, ...prev];
      saveSessionsToStorage(next);
      return next;
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        subjects,
        topics,
        lessons,
        userProgress,
        completedLessonIds,
        isLoadingSubjects,
        error,
        sessions,
        loadSubjects,
        loadTopics,
        loadLessons,
        markLessonComplete,
        refreshProgress,
        initForUser,
        fetchSchools,
        fetchClassroomsBySchool,
        fetchUsersBySchool,
        fetchSchoolAnalytics,
        fetchGlobalAnalytics,
        addSession,
        clearError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
