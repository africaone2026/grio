'use client';

const mySubjects = [
  {
    id: 'math-ug-sec',
    name: 'Mathematics',
    topics: ['Algebra', 'Geometry', 'Trigonometry', 'Probability', 'Calculus'],
    students: 28,
    avgProgress: 54,
  },
  {
    id: 'phy-ug-sec',
    name: 'Physics',
    topics: ['Mechanics', 'Electricity & Magnetism', 'Waves & Optics', 'Thermal Physics', 'Atomic & Nuclear Physics'],
    students: 21,
    avgProgress: 38,
  },
  {
    id: 'chem-ug-sec',
    name: 'Chemistry',
    topics: ['The Periodic Table', 'Chemical Bonding', 'Chemical Reactions', 'Organic Chemistry'],
    students: 19,
    avgProgress: 29,
  },
];

export default function TeacherSubjectsPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">My Subjects</h1>
        <p className="text-slate-500 text-sm mt-1">
          Subjects assigned to you for this academic term.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {mySubjects.map((subject) => (
          <div
            key={subject.id}
            className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">{subject.name}</h2>
                <p className="text-sm text-slate-500 mt-0.5">{subject.students} students enrolled</p>
              </div>
              <span className="text-sm font-semibold text-blue-700 bg-blue-50 border border-blue-100 rounded-full px-3 py-1">
                {subject.avgProgress}% avg
              </span>
            </div>
            <div className="mb-5">
              <div className="h-2 bg-slate-200 rounded-full">
                <div
                  className="h-2 bg-blue-500 rounded-full"
                  style={{ width: `${subject.avgProgress}%` }}
                />
              </div>
              <p className="text-xs text-slate-400 mt-1">Class average completion</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                Topics
              </p>
              <div className="flex flex-wrap gap-2">
                {subject.topics.map((topic) => (
                  <span
                    key={topic}
                    className="text-xs bg-slate-100 text-slate-600 rounded-full px-2.5 py-1"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
