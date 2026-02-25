import type {
  User,
  Country,
  Curriculum,
  Subject,
  Topic,
  Lesson,
  ProgressRecord,
  LoginCredentials,
  SignupData,
  AdminAnalytics,
  UserProgress,
  SubjectProgress,
  RecentActivity,
  School,
  Classroom,
  SchoolAnalytics,
  ClassroomStats,
  GlobalAnalytics,
  CountryStats,
  AiResponse,
  ConceptSummary,
} from './types';
import {
  countries,
  curricula,
  subjects,
  topics,
  lessons,
  users as initialUsers,
  progressRecords as initialProgressRecords,
  schools as initialSchools,
  classrooms as initialClassrooms,
} from './mockData';

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

let usersStore: User[] = [...initialUsers];
let progressStore: ProgressRecord[] = [...initialProgressRecords];
let subjectsStore: Subject[] = [...subjects];
let topicsStore: Topic[] = [...topics];
let lessonsStore: Lesson[] = [...lessons];
let schoolsStore: School[] = [...initialSchools];
let classroomsStore: Classroom[] = [...initialClassrooms];

export function resetStore() {
  usersStore = [...initialUsers];
  progressStore = [...initialProgressRecords];
  subjectsStore = [...subjects];
  topicsStore = [...topics];
  lessonsStore = [...lessons];
  schoolsStore = [...initialSchools];
  classroomsStore = [...initialClassrooms];
}

export async function getCurrentUser(userId: string): Promise<User | null> {
  await delay(100);
  return usersStore.find((u) => u.id === userId) ?? null;
}

export async function login(credentials: LoginCredentials): Promise<User> {
  await delay(400);
  const user = usersStore.find((u) => u.email === credentials.email);
  if (!user) throw new Error('Invalid email or password.');
  return user;
}

export async function signup(data: SignupData): Promise<User> {
  await delay(500);
  if (usersStore.find((u) => u.email === data.email)) {
    throw new Error('An account with this email already exists.');
  }
  const newUser: User = {
    id: `user-${Date.now()}`,
    name: data.name,
    email: data.email,
    role: data.role ?? 'independent',
    schoolId: null,
    classroomId: null,
    countryId: data.countryId,
    curriculumId: data.curriculumId,
    subscriptionStatus: 'trial',
    joinedAt: new Date().toISOString(),
  };
  usersStore.push(newUser);
  return newUser;
}

export async function getCountries(): Promise<Country[]> {
  await delay(200);
  return countries;
}

export async function getCurricula(countryId: string): Promise<Curriculum[]> {
  await delay(200);
  return curricula.filter((c) => c.countryId === countryId);
}

export async function getSubjects(curriculumId: string): Promise<Subject[]> {
  await delay(200);
  return subjectsStore.filter((s) => s.curriculumId === curriculumId);
}

export async function getTopics(subjectId: string): Promise<Topic[]> {
  await delay(200);
  return topicsStore
    .filter((t) => t.subjectId === subjectId)
    .sort((a, b) => a.order - b.order);
}

export async function getLessons(topicId: string): Promise<Lesson[]> {
  await delay(200);
  return lessonsStore
    .filter((l) => l.topicId === topicId)
    .sort((a, b) => a.order - b.order);
}

export async function getLesson(lessonId: string): Promise<Lesson | null> {
  await delay(150);
  return lessonsStore.find((l) => l.id === lessonId) ?? null;
}

export async function markLessonComplete(
  userId: string,
  lessonId: string
): Promise<void> {
  await delay(300);
  const exists = progressStore.find(
    (p) => p.userId === userId && p.lessonId === lessonId
  );
  if (!exists) {
    progressStore.push({
      userId,
      lessonId,
      completedAt: new Date().toISOString(),
    });
  }
}

export async function getUserProgress(
  userId: string,
  curriculumId: string
): Promise<UserProgress> {
  await delay(300);

  const userCompletedLessonIds = progressStore
    .filter((p) => p.userId === userId)
    .map((p) => p.lessonId);

  const curriculumSubjects = subjectsStore.filter(
    (s) => s.curriculumId === curriculumId
  );

  const subjectProgressList: SubjectProgress[] = curriculumSubjects.map(
    (subject) => {
      const subjectTopics = topicsStore.filter(
        (t) => t.subjectId === subject.id
      );
      const subjectTopicIds = subjectTopics.map((t) => t.id);
      const subjectLessons = lessonsStore.filter((l) =>
        subjectTopicIds.includes(l.topicId)
      );
      const subjectLessonIds = subjectLessons.map((l) => l.id);
      const completed = subjectLessonIds.filter((id) =>
        userCompletedLessonIds.includes(id)
      ).length;
      const total = subjectLessons.length;
      return {
        subjectId: subject.id,
        subjectName: subject.name,
        totalLessons: total,
        completedLessons: completed,
        percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
      };
    }
  );

  const totalLessons = subjectProgressList.reduce(
    (sum, s) => sum + s.totalLessons,
    0
  );
  const completedLessons = subjectProgressList.reduce(
    (sum, s) => sum + s.completedLessons,
    0
  );

  const recentActivity: RecentActivity[] = progressStore
    .filter((p) => p.userId === userId)
    .sort(
      (a, b) =>
        new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
    )
    .slice(0, 10)
    .map((p) => {
      const lesson = lessonsStore.find((l) => l.id === p.lessonId);
      const topic = lesson ? topicsStore.find((t) => t.id === lesson.topicId) : null;
      const subject = topic ? subjectsStore.find((s) => s.id === topic.subjectId) : null;
      return {
        lessonId: p.lessonId,
        lessonTitle: lesson?.title ?? 'Unknown Lesson',
        subjectName: subject?.name ?? 'Unknown Subject',
        topicName: topic?.name ?? 'Unknown Topic',
        completedAt: p.completedAt,
      };
    });

  return {
    userId,
    totalLessons,
    completedLessons,
    overallPercentage:
      totalLessons > 0
        ? Math.round((completedLessons / totalLessons) * 100)
        : 0,
    subjectProgress: subjectProgressList,
    recentActivity,
  };
}

export async function isLessonCompleted(
  userId: string,
  lessonId: string
): Promise<boolean> {
  await delay(100);
  return progressStore.some(
    (p) => p.userId === userId && p.lessonId === lessonId
  );
}

export async function getCompletedLessonIds(userId: string): Promise<string[]> {
  await delay(100);
  return progressStore
    .filter((p) => p.userId === userId)
    .map((p) => p.lessonId);
}

export async function getAllUsers(): Promise<User[]> {
  await delay(300);
  return [...usersStore];
}

export async function toggleSubscription(userId: string): Promise<User> {
  await delay(300);
  const user = usersStore.find((u) => u.id === userId);
  if (!user) throw new Error('User not found.');
  user.subscriptionStatus =
    user.subscriptionStatus === 'active' ? 'inactive' : 'active';
  return { ...user };
}

export async function changeUserRole(
  userId: string,
  role: User['role']
): Promise<User> {
  await delay(300);
  const user = usersStore.find((u) => u.id === userId);
  if (!user) throw new Error('User not found.');
  user.role = role;
  return { ...user };
}

export async function addSubject(subject: Omit<Subject, 'id'>): Promise<Subject> {
  await delay(400);
  const newSubject: Subject = {
    ...subject,
    id: `subj-${Date.now()}`,
  };
  subjectsStore.push(newSubject);
  return newSubject;
}

export async function addTopic(topic: Omit<Topic, 'id'>): Promise<Topic> {
  await delay(400);
  const newTopic: Topic = {
    ...topic,
    id: `topic-${Date.now()}`,
  };
  topicsStore.push(newTopic);
  return newTopic;
}

export async function addLesson(lesson: Omit<Lesson, 'id'>): Promise<Lesson> {
  await delay(400);
  const newLesson: Lesson = {
    ...lesson,
    id: `lesson-${Date.now()}`,
  };
  lessonsStore.push(newLesson);
  return newLesson;
}

export async function getAdminAnalytics(): Promise<AdminAnalytics> {
  await delay(400);

  const totalUsers = usersStore.length;
  const activeSubscriptions = usersStore.filter(
    (u) => u.subscriptionStatus === 'active'
  ).length;
  const totalSubjects = subjectsStore.length;
  const totalLessons = lessonsStore.length;

  const learners = usersStore.filter((u) => u.role === 'independent');
  let totalCompletion = 0;
  for (const learner of learners) {
    const curriculum = curricula.find((c) => c.id === learner.curriculumId);
    if (!curriculum) continue;
    const curriculumSubjectIds = subjectsStore
      .filter((s) => s.curriculumId === curriculum.id)
      .map((s) => s.id);
    const topicIds = topicsStore
      .filter((t) => curriculumSubjectIds.includes(t.subjectId))
      .map((t) => t.id);
    const total = lessonsStore.filter((l) =>
      topicIds.includes(l.topicId)
    ).length;
    const completed = progressStore.filter(
      (p) =>
        p.userId === learner.id &&
        lessonsStore
          .filter((l) => topicIds.includes(l.topicId))
          .map((l) => l.id)
          .includes(p.lessonId)
    ).length;
    totalCompletion += total > 0 ? (completed / total) * 100 : 0;
  }

  const averageCompletion =
    learners.length > 0
      ? Math.round(totalCompletion / learners.length)
      : 0;

  return {
    totalUsers,
    activeSubscriptions,
    totalSubjects,
    totalLessons,
    averageCompletion,
  };
}

export function getStoreSnapshot() {
  return {
    users: usersStore,
    progress: progressStore,
    subjects: subjectsStore,
    topics: topicsStore,
    lessons: lessonsStore,
    schools: schoolsStore,
    classrooms: classroomsStore,
  };
}

export async function getSchools(): Promise<School[]> {
  await delay(300);
  return [...schoolsStore];
}

export async function getSchool(schoolId: string): Promise<School | null> {
  await delay(150);
  return schoolsStore.find((s) => s.id === schoolId) ?? null;
}

export async function getClassroomsBySchool(schoolId: string): Promise<Classroom[]> {
  await delay(200);
  return classroomsStore.filter((c) => c.schoolId === schoolId);
}

export async function getUsersBySchool(schoolId: string): Promise<User[]> {
  await delay(300);
  return usersStore.filter((u) => u.schoolId === schoolId);
}

export async function getStudentsByClassroom(classroomId: string): Promise<User[]> {
  await delay(200);
  return usersStore.filter(
    (u) => u.classroomId === classroomId && u.role === 'independent'
  );
}

export async function getStudentsByTeacher(teacherId: string): Promise<User[]> {
  await delay(300);
  const teacher = usersStore.find((u) => u.id === teacherId);
  if (!teacher || !teacher.schoolId) return [];
  return usersStore.filter(
    (u) => u.schoolId === teacher.schoolId && u.role === 'independent'
  );
}

export async function toggleSchoolSubscription(schoolId: string): Promise<School> {
  await delay(300);
  const school = schoolsStore.find((s) => s.id === schoolId);
  if (!school) throw new Error('School not found.');
  school.subscriptionStatus =
    school.subscriptionStatus === 'active' ? 'inactive' : 'active';
  return { ...school };
}

export async function getSchoolAnalytics(schoolId: string): Promise<SchoolAnalytics> {
  await delay(400);
  const school = schoolsStore.find((s) => s.id === schoolId);
  if (!school) throw new Error('School not found.');

  const schoolUsers = usersStore.filter((u) => u.schoolId === schoolId);
  const students = schoolUsers.filter((u) => u.role === 'independent');
  const teachers = schoolUsers.filter((u) => u.role === 'teacher');
  const activeClassrooms = classroomsStore.filter((c) => c.schoolId === schoolId);

  const curriculumSubjects = subjectsStore.filter(
    (s) => s.curriculumId === school.curriculumId
  );

  const subjectProgressList: SubjectProgress[] = curriculumSubjects.map((subject) => {
    const subjectTopicIds = topicsStore
      .filter((t) => t.subjectId === subject.id)
      .map((t) => t.id);
    const subjectLessons = lessonsStore.filter((l) =>
      subjectTopicIds.includes(l.topicId)
    );
    const subjectLessonIds = subjectLessons.map((l) => l.id);
    let totalCompleted = 0;
    for (const student of students) {
      totalCompleted += progressStore.filter(
        (p) => p.userId === student.id && subjectLessonIds.includes(p.lessonId)
      ).length;
    }
    const totalPossible = subjectLessons.length * students.length;
    return {
      subjectId: subject.id,
      subjectName: subject.name,
      totalLessons: subjectLessons.length,
      completedLessons: totalCompleted,
      percentage: totalPossible > 0 ? Math.round((totalCompleted / totalPossible) * 100) : 0,
    };
  });

  const classroomBreakdown: ClassroomStats[] = activeClassrooms.map((cls) => {
    const classStudents = students.filter((u) => u.classroomId === cls.id);
    let totalCompletion = 0;
    for (const student of classStudents) {
      const studentCompleted = progressStore.filter((p) => p.userId === student.id).length;
      const curriculumTopicIds = topicsStore
        .filter((t) =>
          curriculumSubjects.map((s) => s.id).includes(t.subjectId)
        )
        .map((t) => t.id);
      const total = lessonsStore.filter((l) => curriculumTopicIds.includes(l.topicId)).length;
      totalCompletion += total > 0 ? (studentCompleted / total) * 100 : 0;
    }
    return {
      classroomId: cls.id,
      classroomName: cls.name,
      studentCount: classStudents.length,
      averageCompletion:
        classStudents.length > 0
          ? Math.round(totalCompletion / classStudents.length)
          : 0,
    };
  });

  let overallCompletion = 0;
  for (const student of students) {
    const completed = progressStore.filter((p) => p.userId === student.id).length;
    const curriculumTopicIds = topicsStore
      .filter((t) => curriculumSubjects.map((s) => s.id).includes(t.subjectId))
      .map((t) => t.id);
    const total = lessonsStore.filter((l) => curriculumTopicIds.includes(l.topicId)).length;
    overallCompletion += total > 0 ? (completed / total) * 100 : 0;
  }

  return {
    schoolId,
    schoolName: school.name,
    totalStudents: students.length,
    totalTeachers: teachers.length,
    activeClassrooms: activeClassrooms.length,
    averageCompletion:
      students.length > 0 ? Math.round(overallCompletion / students.length) : 0,
    subjectBreakdown: subjectProgressList,
    classroomBreakdown,
  };
}

const AI_CONTENT: Record<string, Record<string, { intro: string; explanation: string; example: string; questions: { question: string; options: string[]; correctIndex: number; explanation: string }[]; bulletPoints: string[] }>> = {
  Mathematics: {
    default: {
      intro: 'Welcome to today\'s Mathematics lesson. We will explore key concepts and work through problems together.',
      explanation: 'Mathematics is the study of numbers, quantities, structures, and patterns. It provides the foundation for science, engineering, and technology. In this lesson, we focus on algebraic thinking — understanding how variables represent unknown quantities and how equations model real-world situations.',
      example: 'Example: Solve for x in the equation 2x + 6 = 14.\nStep 1: Subtract 6 from both sides → 2x = 8\nStep 2: Divide both sides by 2 → x = 4\nVerification: 2(4) + 6 = 8 + 6 = 14 ✓',
      questions: [
        { question: 'If 3x + 9 = 24, what is the value of x?', options: ['3', '5', '7', '9'], correctIndex: 1, explanation: '3x = 24 − 9 = 15, so x = 15 ÷ 3 = 5.' },
        { question: 'Which of the following is an example of a quadratic equation?', options: ['y = 2x + 1', 'y = x² + 3x − 4', 'y = 1/x', 'y = √x'], correctIndex: 1, explanation: 'A quadratic equation contains a variable raised to the power of 2.' },
        { question: 'What is the gradient of the line y = 4x − 7?', options: ['−7', '4', '7', '−4'], correctIndex: 1, explanation: 'In y = mx + c, m is the gradient. Here m = 4.' },
      ],
      bulletPoints: [
        'Variables represent unknown values in equations',
        'To solve an equation, perform the same operation on both sides',
        'A linear equation produces a straight line when graphed',
        'Quadratic equations contain a squared variable (x²)',
        'Always verify your answer by substituting back into the original equation',
      ],
    },
  },
  Physics: {
    default: {
      intro: 'Welcome to today\'s Physics lesson. Physics helps us understand how the universe works through observation and experimentation.',
      explanation: 'Physics is the natural science that studies matter, energy, and the fundamental forces of nature. Newton\'s Laws of Motion are central to classical mechanics. The First Law states that an object remains at rest or in uniform motion unless acted upon by an external force — this is the principle of inertia.',
      example: 'Example: A car of mass 1000 kg accelerates at 2 m/s². What is the net force acting on it?\nUsing Newton\'s Second Law: F = ma\nF = 1000 kg × 2 m/s²\nF = 2000 N',
      questions: [
        { question: 'What does Newton\'s Second Law state?', options: ['Every action has an equal and opposite reaction', 'F = ma', 'Objects at rest stay at rest', 'Energy cannot be created or destroyed'], correctIndex: 1, explanation: 'Newton\'s Second Law states that Force equals mass times acceleration (F = ma).' },
        { question: 'What unit is used to measure force?', options: ['Joule', 'Watt', 'Newton', 'Pascal'], correctIndex: 2, explanation: 'Force is measured in Newtons (N).' },
        { question: 'A 5 kg object accelerates at 3 m/s². What is the net force?', options: ['8 N', '2 N', '15 N', '1.67 N'], correctIndex: 2, explanation: 'F = ma = 5 × 3 = 15 N.' },
      ],
      bulletPoints: [
        'Newton\'s First Law: Objects resist changes in their state of motion (inertia)',
        'Newton\'s Second Law: F = ma (Force = mass × acceleration)',
        'Newton\'s Third Law: Every action has an equal and opposite reaction',
        'Force is measured in Newtons (N)',
        'Acceleration is measured in metres per second squared (m/s²)',
      ],
    },
  },
  Chemistry: {
    default: {
      intro: 'Welcome to today\'s Chemistry lesson. Chemistry is the science of matter and how substances interact, combine, and change.',
      explanation: 'Chemistry studies the composition, structure, properties, and reactions of matter. The Periodic Table organises all known elements by atomic number. Each element has a unique number of protons defining its identity. Elements in the same group share similar chemical properties due to having the same number of valence electrons.',
      example: 'Example: Balancing a chemical equation.\nUnbalanced: H₂ + O₂ → H₂O\nBalanced: 2H₂ + O₂ → 2H₂O\nCheck: Left side — 4 H atoms, 2 O atoms. Right side — 4 H atoms, 2 O atoms. ✓',
      questions: [
        { question: 'What determines the atomic number of an element?', options: ['Number of neutrons', 'Number of electrons', 'Number of protons', 'Atomic mass'], correctIndex: 2, explanation: 'The atomic number is defined by the number of protons in the nucleus.' },
        { question: 'Elements in the same group of the Periodic Table have similar:', options: ['Atomic masses', 'Numbers of neutrons', 'Chemical properties', 'Densities'], correctIndex: 2, explanation: 'Elements in the same group have the same number of valence electrons, giving similar chemical behaviour.' },
        { question: 'Which of the following represents a balanced equation?', options: ['H₂ + O₂ → H₂O', '2H₂ + O₂ → 2H₂O', 'H₂ + O → H₂O', 'H + O₂ → H₂O'], correctIndex: 1, explanation: '2H₂ + O₂ → 2H₂O has equal atoms on both sides.' },
      ],
      bulletPoints: [
        'Atomic number = number of protons in the nucleus',
        'Elements in the same group have the same number of valence electrons',
        'Chemical equations must be balanced — atoms are conserved',
        'Ionic bonds form between metals and non-metals',
        'Covalent bonds form when non-metals share electrons',
      ],
    },
  },
};

type ConceptSummaryData = { definition: string; formulaRules: string[]; example: string; commonMistakes: string[] };
const CONCEPT_SUMMARIES: Record<string, Record<string, ConceptSummaryData>> = {
  Mathematics: {
    Algebra: {
      definition: 'Algebra is the branch of mathematics that uses letters and symbols to represent numbers and quantities in formulas and equations. Linear equations are equations of the form ax + b = c, where we solve for the unknown x.',
      formulaRules: [
        'Same operation on both sides: whatever you do to one side, do to the other.',
        'Isolate the variable: undo addition/subtraction first, then multiplication/division.',
        'Inverse operations: addition ↔ subtraction; multiplication ↔ division.',
      ],
      example: 'Solve 2x + 6 = 14.\nStep 1: Subtract 6 from both sides → 2x = 8\nStep 2: Divide both sides by 2 → x = 4\nCheck: 2(4) + 6 = 14 ✓',
      commonMistakes: [
        'Forgetting to do the same operation on both sides.',
        'Dividing or multiplying only one term instead of the whole side.',
        'Mixing up the order of inverse operations (e.g. dividing before subtracting when you should subtract first).',
      ],
    },
    Geometry: {
      definition: 'Geometry is the study of shapes, sizes, angles, and properties of space. It covers triangles, circles, polygons, and the relationships between their sides and angles.',
      formulaRules: [
        'Sum of angles in a triangle = 180°.',
        'Area of triangle = ½ × base × height.',
        'Pythagoras: a² + b² = c² for right-angled triangles.',
      ],
      example: 'Right-angled triangle with legs 3 and 4. Hypotenuse c: c² = 3² + 4² = 9 + 16 = 25, so c = 5.',
      commonMistakes: [
        'Using Pythagoras for non–right-angled triangles.',
        'Confusing perimeter with area.',
                'Using degrees when the formula expects radians (or vice versa).',
      ],
    },
    default: {
      definition: 'Mathematics is the study of numbers, quantities, structures, and patterns. It provides the foundation for science, engineering, and technology.',
      formulaRules: [
        'Variables represent unknown values in equations.',
        'Perform the same operation on both sides to keep equality.',
        'Always verify your answer by substituting back.',
      ],
      example: 'Example: Solve for x in 2x + 6 = 14. Subtract 6: 2x = 8. Divide by 2: x = 4.',
      commonMistakes: [
        'Arithmetic errors when simplifying.',
        'Forgetting to apply an operation to the entire side.',
      ],
    },
  },
  Physics: {
    default: {
      definition: 'Physics is the natural science that studies matter, energy, and the fundamental forces of nature. Newton\'s Laws describe the relationship between forces and motion.',
      formulaRules: [
        'Newton\'s First Law: F = 0 ⇒ constant velocity.',
        'Newton\'s Second Law: F = ma.',
        'Newton\'s Third Law: For every action there is an equal and opposite reaction.',
      ],
      example: 'F = ma: A 1000 kg car at 2 m/s² → F = 1000 × 2 = 2000 N.',
      commonMistakes: [
        'Confusing mass and weight.',
        'Using F = ma when forces are not balanced (correct) vs when they are (a = 0).',
      ],
    },
  },
  Chemistry: {
    default: {
      definition: 'Chemistry studies the composition, structure, properties, and reactions of matter. The Periodic Table organises elements by atomic number.',
      formulaRules: [
        'Atomic number = number of protons.',
        'Elements in the same group share similar chemical properties.',
        'Chemical equations must be balanced (atoms conserved).',
      ],
      example: 'Balancing: H₂ + O₂ → H₂O becomes 2H₂ + O₂ → 2H₂O.',
      commonMistakes: [
        'Forgetting to balance equations.',
        'Confusing atomic number with mass number.',
      ],
    },
  },
};

export async function getConceptSummary(subject: string, topic: string): Promise<ConceptSummary> {
  await delay(200);
  const bySubject = CONCEPT_SUMMARIES[subject] ?? CONCEPT_SUMMARIES['Mathematics'];
  const summary = bySubject[topic] ?? bySubject['default'];
  return {
    definition: summary.definition,
    formulaRules: [...summary.formulaRules],
    example: summary.example,
    commonMistakes: [...summary.commonMistakes],
  };
}

type SocraticHintsByQuestion = string[];
const SOCRATIC_HINTS: Record<string, Record<string, SocraticHintsByQuestion>> = {
  Mathematics: {
    Algebra: [
      'What is the first thing we do to isolate x?',
      'After you remove the constant from the left, what operation do you do next?',
      'Which number is being added to the term with x? What inverse operation removes it?',
    ],
    default: [
      'What do we need to do to both sides to keep the equation true?',
      'What is the inverse of the operation applied to the variable?',
      'Can you substitute your answer back into the original equation to check?',
    ],
  },
  Physics: {
    default: [
      'Which law relates force, mass, and acceleration?',
      'What are the known quantities and what are you solving for?',
      'What unit should the answer be in?',
    ],
  },
  Chemistry: {
    default: [
      'What quantity defines the identity of an element?',
      'How many atoms of each element are on each side of the equation?',
      'What must be equal on both sides of a balanced equation?',
    ],
  },
};

export async function generateSocraticHint(
  subject: string,
  topic: string,
  questionIndex: number,
  hintLevel = 0
): Promise<AiResponse> {
  await delay(500);
  const bySubject = SOCRATIC_HINTS[subject] ?? SOCRATIC_HINTS['Mathematics'];
  const hints = bySubject[topic] ?? bySubject['default'];
  const level = Math.min(hintLevel, hints.length - 1);
  const content = hints[level] ?? hints[0];
  return {
    type: 'followup',
    title: 'GRIO Response',
    content,
  };
}

function getAiContent(subject: string) {
  const subjectContent = AI_CONTENT[subject] ?? AI_CONTENT['Mathematics'];
  return subjectContent['default'];
}

export async function generateLessonIntro(subject: string, topic: string): Promise<AiResponse> {
  await delay(800);
  const content = getAiContent(subject);
  return {
    type: 'intro',
    title: `${subject}: ${topic}`,
    content: content.intro,
  };
}

export async function generateExplanation(subject: string, topic: string): Promise<AiResponse> {
  await delay(1000);
  const content = getAiContent(subject);
  return {
    type: 'explanation',
    title: `Understanding ${topic}`,
    content: content.explanation,
  };
}

export async function generateExample(subject: string, topic: string): Promise<AiResponse> {
  await delay(800);
  const content = getAiContent(subject);
  return {
    type: 'example',
    title: `Worked Example — ${topic}`,
    content: content.example,
  };
}

export async function generateQuestion(
  subject: string,
  _topic: string,
  index = 0
): Promise<AiResponse> {
  await delay(600);
  const content = getAiContent(subject);
  const q = content.questions[index % content.questions.length];
  return {
    type: 'question',
    title: `Question ${index + 1}`,
    content: q.question,
    options: q.options,
    correctIndex: q.correctIndex,
  };
}

export async function evaluateAnswer(
  subject: string,
  questionIndex: number,
  selectedIndex: number
): Promise<AiResponse> {
  await delay(500);
  const content = getAiContent(subject);
  const q = content.questions[questionIndex % content.questions.length];
  const correct = selectedIndex === q.correctIndex;
  return {
    type: 'feedback',
    title: correct ? 'Correct!' : 'Not quite.',
    content: correct
      ? `Well done! ${q.explanation}`
      : `The correct answer is "${q.options[q.correctIndex]}". ${q.explanation}`,
  };
}

export async function generateRevisionPoints(subject: string, topic: string): Promise<AiResponse> {
  await delay(700);
  const content = getAiContent(subject);
  return {
    type: 'revision',
    title: `Key Points — ${topic}`,
    content: content.bulletPoints.join('\n'),
  };
}

export async function generateFollowUpResponse(question: string): Promise<AiResponse> {
  await delay(900);
  const responses = [
    `That's a great question. The concept you're asking about relates to fundamental principles studied at this level. The key is to break the problem into smaller steps and apply what we've covered. Try working through it systematically and use the examples from this lesson as a guide.`,
    `Good thinking! This question connects to what we've been exploring. Remember: always identify what is known, what is unknown, and which rule or formula applies. If you're unsure, revisit the worked example and map the structure onto your question.`,
    `Excellent inquiry. To address this, consider the core principle we discussed. Apply it step by step to the specific case you're asking about. The answer often becomes clear once you've written out all the given information clearly.`,
    `That's a thoughtful question. The answer lies in understanding how the underlying concept scales or changes under different conditions. Think about what changes and what stays constant — that distinction usually leads to the solution.`,
  ];
  const index = question.length % responses.length;
  return {
    type: 'followup',
    title: 'GRIO Response',
    content: responses[index],
  };
}

export async function getGlobalAnalytics(): Promise<GlobalAnalytics> {
  await delay(400);

  const countryBreakdown: CountryStats[] = countries.map((country) => {
    const countrySchools = schoolsStore.filter((s) => s.countryId === country.id);
    const countryUsers = usersStore.filter((u) => u.countryId === country.id);
    const students = countryUsers.filter((u) => u.role === 'independent');
    const countryCurricula = curricula.filter((c) => c.countryId === country.id);
    let totalCompletion = 0;
    for (const student of students) {
      const curriculum = countryCurricula.find((c) => c.id === student.curriculumId);
      if (!curriculum) continue;
      const subjectIds = subjectsStore
        .filter((s) => s.curriculumId === curriculum.id)
        .map((s) => s.id);
      const topicIds = topicsStore
        .filter((t) => subjectIds.includes(t.subjectId))
        .map((t) => t.id);
      const total = lessonsStore.filter((l) => topicIds.includes(l.topicId)).length;
      const completed = progressStore.filter((p) => p.userId === student.id).length;
      totalCompletion += total > 0 ? (completed / total) * 100 : 0;
    }
    return {
      countryId: country.id,
      countryName: country.name,
      schoolCount: countrySchools.length,
      userCount: countryUsers.length,
      averageCompletion:
        students.length > 0 ? Math.round(totalCompletion / students.length) : 0,
    };
  });

  return {
    totalUsers: usersStore.length,
    totalSchools: schoolsStore.length,
    activeSubscriptions: usersStore.filter((u) => u.subscriptionStatus === 'active').length,
    totalSubjects: subjectsStore.length,
    totalLessons: lessonsStore.length,
    averageCompletion:
      countryBreakdown.reduce((sum, c) => sum + c.averageCompletion, 0) /
      (countryBreakdown.length || 1),
    countryBreakdown,
  };
}
