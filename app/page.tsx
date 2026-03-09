import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

const modes = [
  {
    title: 'Independent Learner',
    description:
      'Self-paced learning for students studying at home or supplementing classroom education. Access curriculum-aligned lessons, track your own progress, and study at your own pace.',
    icon: 'user',
    cta: 'Start Learning',
    href: '/auth/signup',
  },
  {
    title: 'Classroom Mode',
    description:
      'Structured learning environments for schools. Teachers manage student access, monitor class progress, and align lessons with the national curriculum timetable.',
    icon: 'school',
    cta: 'Register School',
    href: '/auth/signup',
  },
  {
    title: 'Teacher Workspace',
    description:
      'A dedicated workspace for educators to prepare lessons, review student performance, and leverage AI-assisted planning tools to improve teaching effectiveness.',
    icon: 'pencil',
    cta: 'For Teachers',
    href: '/auth/signup',
  },
];

const curricula = [
  {
    country: 'Uganda',
    flag: '🇺🇬',
    levels: ['Primary', 'Secondary (O-Level)'],
    subjects: ['Mathematics', 'English', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography'],
  },
  {
    country: 'Zambia',
    flag: '🇿🇲',
    levels: ['Secondary'],
    subjects: ['Mathematics', 'English', 'Science'],
  },
  {
    country: 'International',
    flag: '🌍',
    levels: ['Cambridge IGCSE'],
    subjects: ['Mathematics', 'Combined Science'],
  },
];

const pricingTiers = [
  {
    name: 'Free Trial',
    price: '$0',
    period: '14 days',
    features: ['Access to 3 subjects', 'Progress tracking', 'Practice questions', 'Basic analytics'],
    cta: 'Start Free Trial',
    href: '/auth/signup',
    highlighted: false,
  },
  {
    name: 'Independent Learner',
    price: '$8',
    period: 'per month',
    features: ['Full curriculum access', 'All subjects', 'Progress tracking', 'Practice questions', 'Downloadable notes'],
    cta: 'Get Started',
    href: '/auth/signup',
    highlighted: true,
  },
  {
    name: 'School',
    price: 'Custom',
    period: 'per institution',
    features: ['Unlimited student accounts', 'Teacher dashboards', 'Class management', 'Admin controls', 'Priority support', 'Custom reporting'],
    cta: 'Contact Us',
    href: '/auth/signup',
    highlighted: false,
  },
];

const stats = [
  { value: '3', label: 'Countries', icon: 'globe' },
  { value: '4', label: 'Curricula', icon: 'book' },
  { value: '11+', label: 'Subjects', icon: 'layers' },
  { value: '60+', label: 'Lessons', icon: 'file' },
];

const schoolFeatures = [
  'Bulk student registration and management',
  'Teacher dashboards with class overview',
  'Admin controls for curriculum access',
  'School-level analytics and reporting',
  'Dedicated support and onboarding',
];

const teacherFeatures = [
  { icon: 'book', label: 'Curriculum-aligned lesson library' },
  { icon: 'chart', label: 'Student progress analytics' },
  { icon: 'note', label: 'Lesson planning workspace' },
  { icon: 'spark', label: 'AI assistant (coming soon)' },
];

function ModeIcon({ icon, className }: { icon: string; className: string }) {
  if (icon === 'user') {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    );
  }

  if (icon === 'school') {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    );
  }

  if (icon === 'pencil') {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    );
  }

  return null;
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0B1220] text-white">
        {/* Background: radial gradient + subtle red glow */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#0B1220] via-[#0F172A] to-[#0B1220]"
          aria-hidden
        />
        <div
          className="absolute top-1/2 right-0 w-[80%] max-w-2xl h-[120%] -translate-y-1/2 rounded-full bg-[#F21825] opacity-[0.08] blur-[100px] pointer-events-none"
          aria-hidden
        />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-96 bg-[#F21825] opacity-[0.05] blur-[80px] pointer-events-none"
          aria-hidden
        />

        {/* AI grid / neural pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
          aria-hidden
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center min-h-0">
            {/* Left: copy */}
            <div className="max-w-xl min-w-0 animate-fade-in-up text-center lg:text-left">
              <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-2 text-[#F21825] text-xs sm:text-sm font-medium leading-relaxed bg-[#F21825]/10 border border-[#F21825]/30 rounded-full px-3 sm:px-4 py-1.5 mb-6 sm:mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F21825] animate-pulse" />
                Now available in Uganda, Zambia and for IGCSE learners
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold leading-[1.1] tracking-tight mb-5 sm:mb-6 text-white text-balance">
                AI Learning Infrastructure
                <br className="hidden sm:block" />
                <span className="text-[#F21825]">for Classrooms and</span>
                <br className="hidden sm:block" />
                Independent Learners
              </h1>
              <p className="text-base sm:text-lg text-[#94A3B8] max-w-xl leading-relaxed mb-8 sm:mb-10 mx-auto lg:mx-0 text-pretty">
                GRIO delivers structured, curriculum-aligned learning for students across Africa.
                Built for schools, teachers, and independent learners who demand more than a textbook.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link
                  href="/auth/signup"
                  className="inline-flex justify-center items-center w-full sm:w-auto sm:min-w-[180px] px-8 py-3.5 bg-[#F21825] text-white font-semibold rounded-lg hover:bg-[#e01522] hover:shadow-lg hover:shadow-[#F21825]/25 hover:-translate-y-0.5 transition-all duration-200"
                >
                  Start Learning
                </Link>
                <Link
                  href="#schools"
                  className="inline-flex justify-center items-center w-full sm:w-auto sm:min-w-[180px] px-8 py-3.5 border-2 border-[#F21825]/60 text-white font-semibold rounded-lg hover:bg-[#F21825]/10 hover:border-[#F21825] transition-all duration-200"
                >
                  Register School
                </Link>
              </div>
            </div>

            {/* Right: Education-themed visual — central device + floating cards */}
            <div className="relative h-[280px] sm:h-[320px] md:h-[360px] lg:h-[440px] min-h-[260px] max-w-[360px] sm:max-w-[420px] md:max-w-none mx-auto w-full">
              <div className="absolute inset-y-0 inset-x-2 sm:inset-x-4 md:inset-0 flex items-center justify-center">
                {/* Central glow */}
                <div className="absolute w-36 h-36 sm:w-48 sm:h-48 rounded-full bg-[#F21825]/20 blur-3xl animate-glow-pulse" aria-hidden />
                <div className="absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-[#F21825]/10 blur-2xl" aria-hidden />

                {/* Central device — lesson/study screen mockup */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[128px] sm:w-[140px] lg:w-[160px] rounded-2xl bg-[#0F172A]/90 border border-white/10 shadow-2xl overflow-hidden hero-float-2" style={{ boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
                  <div className="flex items-center justify-between px-3 py-2 border-b border-white/5">
                    <span className="text-[10px] lg:text-xs font-medium text-[#94A3B8]">Lesson</span>
                    <span className="text-[10px] text-[#94A3B8]/80">2:04</span>
                  </div>
                  <div className="p-3 space-y-2">
                    <div className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 mx-auto rounded-xl bg-[#F21825]/20 border border-[#F21825]/30">
                      <svg className="w-5 h-5 lg:w-6 lg:h-6 text-[#F21825]" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path d="M8 5v14l11-7L8 5z" />
                      </svg>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/10" />
                    <div className="h-1.5 w-4/5 rounded-full bg-white/10 mx-auto" />
                    <div className="h-1.5 w-3/4 rounded-full bg-white/10 mx-auto" />
                  </div>
                  <div className="px-3 pb-2">
                    <div className="text-[10px] text-[#94A3B8] text-center">Curriculum-aligned</div>
                  </div>
                </div>

                {/* Lesson module card */}
                <div className="absolute top-[4%] right-[0%] w-28 sm:w-32 lg:w-36 p-2.5 sm:p-3 rounded-xl bg-white/[0.08] border border-white/10 backdrop-blur-md shadow-xl hero-float-1 hero-card-interactive cursor-default rotate-[-2deg]">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-8 h-8 rounded-lg bg-[#F21825]/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-[#F21825]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                    </span>
                    <span className="text-xs font-semibold text-white truncate">Algebra Basics</span>
                  </div>
                  <button type="button" className="w-full py-1.5 rounded-lg bg-[#F21825] text-white text-[10px] font-semibold hover:bg-[#e01522] transition-colors">
                    Resume
                  </button>
                </div>

                {/* Achievement / rating card */}
                <div className="absolute top-[7%] left-[4%] px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-[#F21825]/25 border border-[#F21825]/40 backdrop-blur-md shadow-lg hero-float-3 hero-card-interactive cursor-default rotate-[1deg]">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-sm">★★★★★</span>
                    <span className="text-[10px] font-semibold text-white">Completed</span>
                  </div>
                </div>

                {/* Checklist: goals achieved */}
                <div className="absolute top-[34%] right-[0%] w-[132px] sm:w-auto space-y-1.5 sm:space-y-2 hero-float-4">
                  <div className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-white/[0.08] border border-white/10 backdrop-blur-md shadow-xl hero-card-interactive cursor-default">
                    <span className="w-5 h-5 rounded-full bg-[#F21825]/20 flex items-center justify-center flex-shrink-0 text-[#F21825] text-xs">✓</span>
                    <span className="text-[11px] text-white font-medium">Curriculum aligned</span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-white/[0.08] border border-white/10 backdrop-blur-md shadow-xl hero-card-interactive cursor-default">
                    <span className="w-5 h-5 rounded-full bg-[#F21825]/20 flex items-center justify-center flex-shrink-0 text-[#F21825] text-xs">✓</span>
                    <span className="text-[11px] text-white font-medium">Track progress</span>
                  </div>
                </div>

                {/* Bold stat card */}
                <div className="absolute bottom-[17%] right-[10%] w-24 sm:w-28 lg:w-32 p-3 sm:p-4 rounded-xl bg-[#F21825]/20 border border-[#F21825]/40 backdrop-blur-md shadow-xl hero-float-2 hero-card-interactive cursor-default rotate-[-1deg]">
                  <div className="text-2xl lg:text-3xl font-bold text-white tabular-nums">60+</div>
                  <div className="text-[10px] text-[#94A3B8] uppercase tracking-wide mt-0.5">Lessons</div>
                  <div className="text-[10px] text-white/80 mt-1">Ready to study</div>
                </div>

                {/* Subject tags card */}
                <div className="absolute bottom-[4%] left-[2%] w-32 sm:w-36 lg:w-40 p-2.5 sm:p-3 rounded-xl bg-white/[0.08] border border-white/10 backdrop-blur-md shadow-xl hero-float-1 hero-card-interactive cursor-default rotate-[2deg]">
                  <div className="text-[10px] text-[#94A3B8] font-medium mb-2">Subjects</div>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#F21825]/20 text-[#F21825] text-[10px] font-medium border border-[#F21825]/30">+ Math</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#F21825]/20 text-[#F21825] text-[10px] font-medium border border-[#F21825]/30">+ Science</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#F21825]/20 text-[#F21825] text-[10px] font-medium border border-[#F21825]/30">+ English</span>
                  </div>
                </div>

                {/* Decorative nodes */}
                <div className="absolute top-[22%] left-[28%] w-2 h-2 rounded-full bg-[#F21825]/50 hero-node-pulse" aria-hidden />
                <div className="absolute bottom-[45%] right-[35%] w-1.5 h-1.5 rounded-full bg-[#F21825]/40 hero-node-pulse-delay" aria-hidden />
                <div className="absolute top-[55%] left-[38%] w-1 h-1 rounded-full bg-[#F21825]/30 hero-node-pulse" style={{ animationDelay: '0.4s' }} aria-hidden />
              </div>
            </div>
          </div>

          {/* Stats: modern cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-14 sm:mt-16 lg:mt-20 pt-10 sm:pt-12 border-t border-white/[0.05]">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group min-w-0 rounded-xl bg-white/[0.03] border border-white/[0.05] p-5 lg:p-6 hover:bg-white/[0.06] hover:border-[#F21825]/20 transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-2">
                  {stat.icon === 'globe' && (
                    <svg className="w-5 h-5 text-[#F21825]/80 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0h.5a2.5 2.5 0 0010.5-2.065M12 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {stat.icon === 'book' && (
                    <svg className="w-5 h-5 text-[#F21825]/80 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  )}
                  {stat.icon === 'layers' && (
                    <svg className="w-5 h-5 text-[#F21825]/80 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  )}
                  {stat.icon === 'file' && (
                    <svg className="w-5 h-5 text-[#F21825]/80 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )}
                  <p className="text-2xl lg:text-3xl font-bold text-white tabular-nums">{stat.value}</p>
                </div>
                <p className="text-[#94A3B8] text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="relative overflow-hidden py-20 md:py-28">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(242,24,37,0.08),_transparent_30%),linear-gradient(180deg,_#FFFFFF_0%,_#F8FAFC_55%,_#F1F5F9_100%)]"
          aria-hidden
        />
        <div
          className="absolute left-1/2 top-14 h-56 w-[78%] -translate-x-1/2 rounded-full bg-white/80 blur-3xl"
          aria-hidden
        />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14 md:mb-20">
            <span className="inline-flex items-center rounded-full border border-gray-200 bg-white/80 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-500 shadow-sm backdrop-blur-sm">
              Explore Grio
            </span>
            <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
            One Platform, Three Modes
            </h2>
            <p className="mt-5 text-lg text-gray-600 leading-relaxed opacity-90">
            GRIO adapts to how you learn — whether you're a student studying independently, a teacher managing a class, or a school scaling its curriculum.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {modes.map((mode, index) => {
              const cardTheme = [
                {
                  eyebrow: 'For self-paced focus',
                  accent: 'bg-[#FFF6F4]',
                  orb: 'bg-[#F21825]/10',
                  iconWrap: 'border-[#F21825]/10 bg-white/90 text-[#F21825]',
                  badge: 'border-[#F21825]/12 bg-[#F21825]/[0.06] text-[#F21825]',
                  ctaTone: 'text-gray-900 group-hover:text-[#F21825]',
                },
                {
                  eyebrow: 'For coordinated delivery',
                  accent: 'bg-[#F8FAFC]',
                  orb: 'bg-slate-900/10',
                  iconWrap: 'border-slate-200 bg-white/85 text-slate-900',
                  badge: 'border-slate-300/70 bg-slate-900/[0.03] text-slate-700',
                  ctaTone: 'text-slate-900 group-hover:text-[#F21825]',
                },
                {
                  eyebrow: 'For planning and insight',
                  accent: 'bg-[#F7F7FB]',
                  orb: 'bg-indigo-500/10',
                  iconWrap: 'border-indigo-200/80 bg-white/90 text-indigo-700',
                  badge: 'border-indigo-200/80 bg-indigo-50 text-indigo-700',
                  ctaTone: 'text-slate-900 group-hover:text-indigo-700',
                },
              ][index];

              return (
                <Link
                  key={mode.title}
                  href={mode.href}
                  className={`group relative flex min-h-[360px] flex-col overflow-hidden rounded-[28px] border border-white/80 ${cardTheme.accent} p-6 sm:p-7 lg:p-8 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.25)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_70px_-34px_rgba(15,23,42,0.28)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F21825] focus-visible:ring-offset-2`}
                >
                  <div className={`absolute -right-10 top-8 h-28 w-28 rounded-full ${cardTheme.orb} blur-2xl transition-transform duration-500 group-hover:scale-125`} aria-hidden />
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(255,255,255,0.55),_transparent_38%,_rgba(255,255,255,0.2)_100%)]" aria-hidden />
                  <div className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-gray-300/70 to-transparent" aria-hidden />

                  <div className="relative flex h-full flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${cardTheme.badge}`}>
                        {cardTheme.eyebrow}
                      </div>
                      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border shadow-sm ${cardTheme.iconWrap}`}>
                        <ModeIcon icon={mode.icon} className="h-6 w-6" />
                      </div>
                    </div>

                    <div className="mt-12">
                      <div className="h-px w-16 bg-gradient-to-r from-gray-400/60 to-transparent" aria-hidden />

                      <h3 className="mt-8 text-2xl font-bold tracking-tight text-gray-900">
                        {mode.title}
                      </h3>
                      <p className="mt-4 max-w-sm text-[15px] leading-7 text-gray-600">
                        {mode.description}
                      </p>
                    </div>

                    <div className="mt-auto pt-8">
                      <div className="flex items-center justify-between border-t border-black/5 pt-5">
                        <span className={`text-sm font-semibold transition-colors duration-200 ${cardTheme.ctaTone}`}>
                          {mode.cta}
                        </span>
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/70 text-gray-700 transition-all duration-200 group-hover:border-[#F21825]/20 group-hover:text-[#F21825]">
                          <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Curriculum Coverage */}
      <section
        id="curriculum"
        className="relative overflow-hidden py-20 md:py-28"
      >
        <div
          className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/80 to-gray-100/60"
          aria-hidden
        />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14 md:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-5">
              Curriculum <span className="text-[#F21825]">Coverage</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed opacity-90">
              Content is mapped precisely to national curricula — not generic lessons, but
              exactly what students need for their specific examinations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {curricula.map((c, index) => {
              const badge =
                c.country === 'Uganda' ? 'UG' : c.country === 'Zambia' ? 'ZM' : 'IG';

              return (
                <article
                  key={c.country}
                  className="curriculum-reveal group relative flex h-full flex-col overflow-hidden rounded-[18px] border border-gray-200/90 bg-white p-6 sm:p-7 lg:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#F21825]/30 transition-all duration-300"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <span
                    className="pointer-events-none absolute left-px right-px top-px h-1 rounded-t-[16px] bg-[#F21825] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-hidden
                  />

                  <div className="flex h-full flex-col">
                    <div className="mb-6 flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#F21825]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#F21825]/15 transition-colors duration-300">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#F21825]/15 bg-white text-xs font-bold tracking-[0.18em] text-[#F21825]">
                          {badge}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-gray-900 leading-tight">
                          {c.country}
                        </h3>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {c.levels.map((level) => (
                            <span
                              key={level}
                              className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-500"
                            >
                              {level}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <ul className="mt-auto space-y-3.5 border-t border-gray-100 pt-6">
                      {c.subjects.map((subject) => (
                        <li
                          key={subject}
                          className="flex items-start gap-3 text-sm sm:text-[15px] leading-6 text-gray-600"
                        >
                          <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#F21825]/10 text-[#F21825]">
                            <svg
                              className="h-3 w-3"
                              fill="none"
                              viewBox="0 0 12 12"
                              stroke="currentColor"
                              strokeWidth={2.2}
                              aria-hidden
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.5 6.5 4.75 8.75 9.5 4"
                              />
                            </svg>
                          </span>
                          <span>{subject}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* For Schools */}
      <section id="schools" className="relative overflow-hidden bg-[#081a2d] py-28 sm:py-32 text-white">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 12% 18%, rgba(242, 24, 37, 0.16), transparent 30%),
              radial-gradient(circle at 85% 22%, rgba(59, 130, 246, 0.12), transparent 28%),
              radial-gradient(circle at 72% 78%, rgba(242, 24, 37, 0.12), transparent 26%),
              linear-gradient(135deg, #081a2d 0%, #0b1f35 48%, #071728 100%)
            `,
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 left-1/2 w-[58%] -translate-x-1/2 bg-white/[0.03] blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute left-[-8%] top-12 h-64 w-64 rounded-full border border-white/10 opacity-40"
          style={{ boxShadow: '0 0 120px rgba(242, 24, 37, 0.08)' }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-[-4rem] right-[-2rem] h-80 w-80 rounded-full border border-[#F21825]/10 opacity-50"
          style={{ boxShadow: '0 0 140px rgba(242, 24, 37, 0.12)' }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/[0.03] to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: '44px 44px',
            maskImage: 'radial-gradient(circle at center, black 45%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 45%, transparent 100%)',
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              'radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            maskImage: 'linear-gradient(135deg, transparent 10%, black 35%, black 70%, transparent 92%)',
            WebkitMaskImage:
              'linear-gradient(135deg, transparent 10%, black 35%, black 70%, transparent 92%)',
          }}
          aria-hidden
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:gap-14 xl:gap-16">
            <div className="curriculum-reveal max-w-2xl">
              <h2 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
                Built for Schools at Scale
              </h2>
              <p className="mt-8 max-w-xl text-lg leading-8 text-slate-300 sm:text-[1.125rem]">
                GRIO&apos;s institutional tier gives school administrators full control over
                student accounts, content access, and curriculum deployment. Designed for
                secondary schools that want a structured digital learning environment without
                the complexity of enterprise software.
              </p>

              <ul className="mt-10 space-y-4">
                {schoolFeatures.map((feature) => (
                  <li
                    key={feature}
                    className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-slate-200 hover:translate-x-1 hover:border-[#F21825]/30 hover:bg-white/[0.05]"
                    style={{ transition: 'all 0.25s ease' }}
                  >
                    <span
                      className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#F21825]/15 text-[#F21825] group-hover:bg-[#F21825]/25"
                      style={{ transition: 'all 0.25s ease' }}
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 16 16"
                        stroke="currentColor"
                        strokeWidth={2.4}
                        aria-hidden
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.5 8.5 6.5 11.5 12.5 5.5"
                        />
                      </svg>
                    </span>
                    <span className="pt-1 text-sm leading-6 text-slate-200 sm:text-[0.95rem]">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/auth/signup"
                className="mt-10 inline-flex items-center justify-center rounded-xl bg-[#F21825] px-8 py-3.5 text-base font-semibold text-white shadow-[0_14px_34px_-16px_rgba(242,24,37,0.85)] hover:-translate-y-0.5 hover:bg-[#ff3340] hover:shadow-[0_18px_40px_-16px_rgba(242,24,37,0.9)]"
                style={{ transition: 'all 0.25s ease' }}
              >
                Register Your School
              </Link>
            </div>

            <div className="curriculum-reveal lg:justify-self-end">
              <div className="group/teacher relative overflow-hidden rounded-[24px] border border-[#F21825]/15 bg-white/[0.045] p-6 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.8)] backdrop-blur-sm sm:p-8 lg:p-9">
                <div
                  className="pointer-events-none absolute -right-12 top-16 h-32 w-32 rounded-full bg-[#F21825]/10 blur-3xl"
                  aria-hidden
                />

                <div className="relative">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F21825]/15 text-[#F21825] shadow-[inset_0_0_0_1px_rgba(242,24,37,0.15)]">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.8}
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.75 6.75A2.75 2.75 0 0 1 7.5 4h9.75v13.25A2.75 2.75 0 0 0 14.5 14.5H4.75V6.75Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 17.25A2.75 2.75 0 0 1 14.5 20H7.75A3.75 3.75 0 0 1 4 16.25v-1.75"
                      />
                    </svg>
                  </div>

                  <h3 className="text-xl font-semibold text-white sm:text-2xl">For Teachers</h3>
                  <p className="mt-5 text-base leading-7 text-slate-300 sm:text-[1.02rem]">
                    GRIO gives teachers a dedicated workspace to prepare lessons,
                    monitor individual student progress, and access AI-assisted planning tools —
                    all integrated with the same content students use.
                  </p>

                  <ul className="mt-8 space-y-3.5">
                    {teacherFeatures.map((item) => (
                      <li
                        key={item.label}
                        className="group/item flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0d2138]/70 px-4 py-3.5 hover:translate-x-1 hover:border-[#F21825]/20 hover:bg-[#102740]"
                        style={{ transition: 'all 0.25s ease' }}
                      >
                        <span
                          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#F21825]/12 text-[#F21825] group-hover/item:bg-[#F21825]/20"
                          style={{ transition: 'all 0.25s ease' }}
                        >
                          {item.icon === 'book' && (
                            <svg
                              className="h-[18px] w-[18px]"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={1.9}
                              aria-hidden
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.75 6.75A2.75 2.75 0 0 1 7.5 4h9.75v13.25A2.75 2.75 0 0 0 14.5 14.5H4.75V6.75Z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.25 17.25A2.75 2.75 0 0 1 14.5 20H7.75A3.75 3.75 0 0 1 4 16.25v-1.75"
                              />
                            </svg>
                          )}
                          {item.icon === 'chart' && (
                            <svg
                              className="h-[18px] w-[18px]"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={1.9}
                              aria-hidden
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 19.25h14"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7.5 16V10.5M12 16V7.5M16.5 16v-4.75"
                              />
                            </svg>
                          )}
                          {item.icon === 'note' && (
                            <svg
                              className="h-[18px] w-[18px]"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={1.9}
                              aria-hidden
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8 7.75h8M8 11.75h8M8 15.75h5.5"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.75 4.75h10.5A1.75 1.75 0 0 1 19 6.5v11A1.75 1.75 0 0 1 17.25 19H6.75A1.75 1.75 0 0 1 5 17.5v-11a1.75 1.75 0 0 1 1.75-1.75Z"
                              />
                            </svg>
                          )}
                          {item.icon === 'spark' && (
                            <svg
                              className="h-[18px] w-[18px]"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={1.9}
                              aria-hidden
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m12 3.75 1.65 4.6 4.6 1.65-4.6 1.65L12 16.25l-1.65-4.6-4.6-1.65 4.6-1.65L12 3.75Z"
                              />
                            </svg>
                          )}
                        </span>
                        <span className="text-sm leading-6 text-slate-200 sm:text-[0.95rem]">
                          {item.label}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/auth/signup"
                    className="group/link mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#F21825] hover:text-[#ff5b65]"
                    style={{ transition: 'all 0.25s ease' }}
                  >
                    <span className="relative">
                      <span className="after:absolute after:left-0 after:top-full after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:content-[''] group-hover/link:after:scale-x-100 after:[transition:transform_0.25s_ease]">
                        Join as a Teacher
                      </span>
                    </span>
                    <span
                      className="text-base group-hover/link:translate-x-1"
                      style={{ transition: 'all 0.25s ease' }}
                      aria-hidden
                    >
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section
        id="pricing"
        className="relative overflow-hidden bg-[linear-gradient(180deg,#fff_0%,rgba(242,24,37,0.04)_45%,#fff_100%)] py-28 sm:py-32"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.45]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(242,24,37,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(242,24,37,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '72px 72px',
            maskImage: 'linear-gradient(180deg, transparent 0%, black 18%, black 82%, transparent 100%)',
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute left-[-8%] top-16 h-56 w-56 rounded-full bg-[#F21825]/10 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute right-[-4%] top-1/3 h-72 w-72 rounded-full bg-[#F21825]/8 blur-[120px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-12 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-[#F21825]/10 blur-3xl"
          aria-hidden
        />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
          <div className="pricing-reveal text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-5">
              Simple, <span className="text-[#F21825]">Transparent</span> Pricing
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 leading-8 max-w-2xl mx-auto">
              Designed to be accessible for independent learners and scalable for institutions.
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div
              className="pointer-events-none absolute inset-y-10 left-1/3 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#F21825]/12 to-transparent xl:block"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-y-10 left-2/3 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#F21825]/12 to-transparent xl:block"
              aria-hidden
            />

            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 xl:gap-10">
              {pricingTiers.map((tier, index) => (
                <div
                  key={tier.name}
                  data-highlighted={tier.highlighted ? 'true' : 'false'}
                  className={`pricing-reveal pricing-card group/tier relative flex h-full min-h-[540px] flex-col overflow-hidden rounded-[22px] border p-8 sm:p-10 ${
                    tier.highlighted
                      ? 'bg-[#0f172a] text-white border-white/5 shadow-[0_30px_80px_-28px_rgba(15,23,42,0.75)]'
                      : 'border-gray-200/50 bg-white/88 text-gray-900 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.18)] backdrop-blur-xl'
                  } ${index === 2 ? 'md:col-span-2 xl:col-span-1' : ''}`}
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <div
                    className={`pointer-events-none absolute inset-0 ${
                      tier.highlighted
                        ? 'bg-[radial-gradient(circle_at_top,rgba(242,24,37,0.18),transparent_38%)]'
                        : 'bg-[radial-gradient(circle_at_top,rgba(242,24,37,0.08),transparent_34%)]'
                    }`}
                    aria-hidden
                  />

                  <div className="relative flex h-full flex-col">
                    <div className="mb-8">
                      {tier.highlighted && (
                        <span className="pricing-badge inline-flex items-center rounded-full border border-[#F21825]/25 bg-[rgba(242,24,37,0.15)] px-4 py-1.5 text-xs font-semibold text-[#F21825] shadow-[0_8px_24px_-16px_rgba(242,24,37,0.6)]">
                          Most Popular
                        </span>
                      )}
                      <h3
                        className={`mt-5 text-xl font-bold tracking-tight ${
                          tier.highlighted ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {tier.name}
                      </h3>
                    </div>

                    <div className="mb-8">
                      <div className="flex items-end gap-2">
                        {tier.price.startsWith('$') ? (
                          <>
                            <span
                              className={`mb-2 text-2xl font-semibold ${
                                tier.highlighted ? 'text-white/65' : 'text-gray-400'
                              }`}
                            >
                              $
                            </span>
                            <span
                              className={`text-5xl sm:text-6xl font-bold tracking-tight ${
                                tier.highlighted ? 'text-white' : 'text-gray-900'
                              }`}
                            >
                              {tier.price.slice(1)}
                            </span>
                          </>
                        ) : (
                          <span
                            className={`text-4xl sm:text-5xl font-bold tracking-tight ${
                              tier.highlighted ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {tier.price}
                          </span>
                        )}
                      </div>
                      <p
                        className={`mt-3 text-sm font-medium ${
                          tier.highlighted ? 'text-white/70' : 'text-gray-500'
                        }`}
                      >
                        {tier.period}
                      </p>
                    </div>

                    <ul className="mb-10 flex-1 space-y-3.5">
                      {tier.features.map((feature) => (
                        <li key={feature} className="pricing-feature group/feature flex items-start gap-3 rounded-2xl">
                          <span className="pricing-feature-icon mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[rgba(242,24,37,0.12)] text-[#F21825]">
                            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                              <path
                                fillRule="evenodd"
                                d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.12 7.18a1 1 0 0 1-1.42 0L4.29 9.994A1 1 0 1 1 5.71 8.58l3.17 3.193 6.41-6.465a1 1 0 0 1 1.414-.006Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                          <span
                            className={`pt-1 text-[0.95rem] leading-7 ${
                              tier.highlighted ? 'text-white/80' : 'text-gray-600'
                            }`}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={tier.href}
                      className={`inline-flex w-full items-center justify-center rounded-xl border px-6 py-3.5 text-sm font-semibold ${
                        tier.highlighted
                          ? 'bg-[#F21825] border-[#F21825] text-white shadow-[0_16px_32px_-18px_rgba(242,24,37,0.8)] hover:bg-[#ff3340] hover:border-[#ff3340]'
                          : 'bg-[#0f172a] border-[#0f172a]/10 text-white hover:bg-[#F21825] hover:border-[#F21825] hover:shadow-[0_16px_30px_-18px_rgba(242,24,37,0.7)]'
                      }`}
                      style={{ transition: 'all 0.25s ease' }}
                    >
                      {tier.cta}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-10 sm:mt-12">
            <Link
              href="/pricing"
              className="group/link inline-flex items-center gap-2 text-sm font-semibold text-[#F21825]"
              style={{ transition: 'all 0.25s ease' }}
            >
              <span className="relative">
                <span className="after:absolute after:left-0 after:top-full after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:content-[''] group-hover/link:after:scale-x-100 after:[transition:transform_0.25s_ease]">
                  View full pricing details
                </span>
              </span>
              <span
                className="text-base group-hover/link:translate-x-1"
                style={{ transition: 'all 0.25s ease' }}
                aria-hidden
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative overflow-hidden border-t border-white/5 bg-[#071728] text-white">
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#071728] via-[#0B1220] to-[#071728]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute left-[-8%] top-0 h-64 w-64 rounded-full bg-[#F21825]/12 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-[-3rem] right-[-4%] h-72 w-72 rounded-full bg-[#2563eb]/10 blur-3xl"
          aria-hidden
        />

        <div className="relative max-w-7xl mx-auto px-6 py-14 sm:py-16">
          <div className="grid gap-10 border-b border-white/10 pb-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.3fr)_repeat(3,minmax(0,0.7fr))] lg:gap-12">
            <div className="max-w-md space-y-5">
              <div className="flex items-center">
                <Image
                  src="/logo-white.svg"
                  alt="GRIO"
                  width={120}
                  height={32}
                  className="h-8 w-auto"
                />
              </div>
              <p className="text-sm leading-7 text-slate-300 sm:text-base">
                Learning infrastructure for Africa with curriculum-aligned lessons, school-ready tools,
                and support for independent learners.
              </p>
              <div className="flex flex-wrap gap-3 text-sm">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center rounded-lg bg-[#F21825] px-4 py-2.5 font-semibold text-white transition-colors hover:bg-[#ff3340]"
                >
                  Get Started
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center rounded-lg border border-white/12 px-4 py-2.5 font-semibold text-slate-200 transition-colors hover:border-white/20 hover:text-white"
                >
                  Pricing
                </Link>
              </div>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">Platform</p>
              <div className="mt-4 grid gap-3 text-sm text-slate-300">
                <Link href="/#how-it-works" className="transition-colors hover:text-white">
                  How it works
                </Link>
                <Link href="/#curriculum" className="transition-colors hover:text-white">
                  Curriculum
                </Link>
                <Link href="/pricing" className="transition-colors hover:text-white">
                  Pricing
                </Link>
              </div>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">Solutions</p>
              <div className="mt-4 grid gap-3 text-sm text-slate-300">
                <Link href="/#schools" className="transition-colors hover:text-white">
                  For schools
                </Link>
                <Link href="/auth/signup" className="transition-colors hover:text-white">
                  For teachers
                </Link>
                <Link href="/auth/signup" className="transition-colors hover:text-white">
                  Independent learners
                </Link>
              </div>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">Account</p>
              <div className="mt-4 grid gap-3 text-sm text-slate-300">
                <Link href="/auth/login" className="transition-colors hover:text-white">
                  Sign in
                </Link>
                <Link href="/auth/signup" className="transition-colors hover:text-white">
                  Create account
                </Link>
                <Link href="/auth/signup" className="transition-colors hover:text-white">
                  Register school
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; {new Date().getFullYear()} GRIO AI. Learning infrastructure for Africa.</p>
            <p className="text-slate-500">Uganda, Zambia, and IGCSE learners.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
