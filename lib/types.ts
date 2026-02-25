export type UserRole = 'independent' | 'teacher' | 'school_admin' | 'super_admin';
export type SubscriptionStatus = 'active' | 'inactive' | 'trial';

export interface Country {
  id: string;
  name: string;
  code: string;
}

export interface EducationLevel {
  id: string;
  name: string;
  countryId: string;
}

export interface Curriculum {
  id: string;
  name: string;
  countryId: string;
  levelId: string;
}

export interface School {
  id: string;
  name: string;
  countryId: string;
  curriculumId: string;
  subscriptionStatus: SubscriptionStatus;
  joinedAt: string;
}

export interface Classroom {
  id: string;
  schoolId: string;
  name: string;
  level: string;
}

export interface Subject {
  id: string;
  name: string;
  curriculumId: string;
  description: string;
  icon: string;
  color: string;
}

export interface Topic {
  id: string;
  name: string;
  subjectId: string;
  order: number;
  description: string;
}

export interface Lesson {
  id: string;
  title: string;
  topicId: string;
  order: number;
  content: string[];
  example: {
    title: string;
    body: string;
  };
  practiceQuestion: {
    question: string;
    hint: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  schoolId: string | null;
  classroomId: string | null;
  countryId: string;
  curriculumId: string;
  subscriptionStatus: SubscriptionStatus;
  joinedAt: string;
}

export interface ProgressRecord {
  userId: string;
  lessonId: string;
  completedAt: string;
}

export interface SubjectProgress {
  subjectId: string;
  subjectName: string;
  totalLessons: number;
  completedLessons: number;
  percentage: number;
}

export interface UserProgress {
  userId: string;
  totalLessons: number;
  completedLessons: number;
  overallPercentage: number;
  subjectProgress: SubjectProgress[];
  recentActivity: RecentActivity[];
}

export interface RecentActivity {
  lessonId: string;
  lessonTitle: string;
  subjectName: string;
  topicName: string;
  completedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  countryId: string;
  curriculumId: string;
  role?: UserRole;
}

export interface ClassroomStats {
  classroomId: string;
  classroomName: string;
  studentCount: number;
  averageCompletion: number;
}

export interface SchoolAnalytics {
  schoolId: string;
  schoolName: string;
  totalStudents: number;
  totalTeachers: number;
  activeClassrooms: number;
  averageCompletion: number;
  subjectBreakdown: SubjectProgress[];
  classroomBreakdown: ClassroomStats[];
}

export interface CountryStats {
  countryId: string;
  countryName: string;
  schoolCount: number;
  userCount: number;
  averageCompletion: number;
}

export interface GlobalAnalytics {
  totalUsers: number;
  totalSchools: number;
  activeSubscriptions: number;
  totalSubjects: number;
  totalLessons: number;
  averageCompletion: number;
  countryBreakdown: CountryStats[];
}

export interface AdminAnalytics {
  totalUsers: number;
  activeSubscriptions: number;
  totalSubjects: number;
  totalLessons: number;
  averageCompletion: number;
}

export type SessionMode = 'teach' | 'quiz' | 'revision';

export type AiEngineState =
  | 'idle'
  | 'explaining'
  | 'example'
  | 'asking_question'
  | 'feedback'
  | 'completed';

export type AiResponseType = 'intro' | 'explanation' | 'example' | 'question' | 'feedback' | 'revision' | 'followup' | 'completed' | 'score';

export interface AiResponse {
  type: AiResponseType;
  title: string;
  content: string;
  options?: string[];
  correctIndex?: number;
}

export interface ConceptSummary {
  definition: string;
  formulaRules: string[];
  example: string;
  commonMistakes: string[];
}

export interface LessonPlanEntry {
  teacherId: string;
  subjectName: string;
  weekLabel: string;
  content: string;
}

export interface LessonSession {
  id: string;
  classroomId: string;
  classroomName: string;
  subjectId: string;
  subjectName: string;
  topicId: string;
  topicName: string;
  mode: SessionMode;
  startedAt: string;
  completedAt?: string;
  score?: number;
  totalQuestions?: number;
  schoolId: string;
  schoolName: string;
  teacherId: string;
}
