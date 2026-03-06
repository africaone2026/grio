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

        <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-0">
            {/* Left: copy */}
            <div className="max-w-xl animate-fade-in-up text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-[#F21825] text-sm font-medium bg-[#F21825]/10 border border-[#F21825]/30 rounded-full px-4 py-1.5 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F21825] animate-pulse" />
                Now available in Uganda, Zambia and for IGCSE learners
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight mb-6 text-white">
                AI Learning Infrastructure<br />
                <span className="text-[#F21825]">for Classrooms and</span><br />
                Independent Learners
              </h1>
              <p className="text-lg text-[#94A3B8] max-w-xl leading-relaxed mb-10 mx-auto lg:mx-0">
                GRIO delivers structured, curriculum-aligned learning for students across Africa.
                Built for schools, teachers, and independent learners who demand more than a textbook.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start">
                <Link
                  href="/auth/signup"
                  className="inline-flex justify-center items-center w-full sm:w-auto px-8 py-3.5 bg-[#F21825] text-white font-semibold rounded-lg hover:bg-[#e01522] hover:shadow-lg hover:shadow-[#F21825]/25 hover:-translate-y-0.5 transition-all duration-200"
                >
                  Start Learning
                </Link>
                <Link
                  href="#schools"
                  className="inline-flex justify-center items-center w-full sm:w-auto px-8 py-3.5 border-2 border-[#F21825]/60 text-white font-semibold rounded-lg hover:bg-[#F21825]/10 hover:border-[#F21825] transition-all duration-200"
                >
                  Register School
                </Link>
              </div>
            </div>

            {/* Right: Education-themed visual — central device + floating cards */}
            <div className="relative hidden md:block h-[360px] lg:h-[440px] min-h-[300px]">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Central glow */}
                <div className="absolute w-48 h-48 rounded-full bg-[#F21825]/20 blur-3xl animate-glow-pulse" aria-hidden />
                <div className="absolute w-32 h-32 rounded-full bg-[#F21825]/10 blur-2xl" aria-hidden />

                {/* Central device — lesson/study screen mockup */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] lg:w-[160px] rounded-2xl bg-[#0F172A]/90 border border-white/10 shadow-2xl overflow-hidden hero-float-2" style={{ boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
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
                <div className="absolute top-[5%] right-[2%] w-32 lg:w-36 p-3 rounded-xl bg-white/[0.08] border border-white/10 backdrop-blur-md shadow-xl hero-float-1 hero-card-interactive cursor-default rotate-[-2deg]">
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
                <div className="absolute top-[8%] left-[8%] px-3 py-2 rounded-xl bg-[#F21825]/25 border border-[#F21825]/40 backdrop-blur-md shadow-lg hero-float-3 hero-card-interactive cursor-default rotate-[1deg]">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">★★★★★</span>
                    <span className="text-[10px] font-semibold text-white">Completed</span>
                  </div>
                </div>

                {/* Checklist: goals achieved */}
                <div className="absolute top-[32%] right-[0%] space-y-2 hero-float-4">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.08] border border-white/10 backdrop-blur-md shadow-xl hero-card-interactive cursor-default">
                    <span className="w-5 h-5 rounded-full bg-[#F21825]/20 flex items-center justify-center flex-shrink-0 text-[#F21825] text-xs">✓</span>
                    <span className="text-[11px] text-white font-medium">Curriculum aligned</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.08] border border-white/10 backdrop-blur-md shadow-xl hero-card-interactive cursor-default">
                    <span className="w-5 h-5 rounded-full bg-[#F21825]/20 flex items-center justify-center flex-shrink-0 text-[#F21825] text-xs">✓</span>
                    <span className="text-[11px] text-white font-medium">Track progress</span>
                  </div>
                </div>

                {/* Bold stat card */}
                <div className="absolute bottom-[18%] right-[12%] w-28 lg:w-32 p-4 rounded-xl bg-[#F21825]/20 border border-[#F21825]/40 backdrop-blur-md shadow-xl hero-float-2 hero-card-interactive cursor-default rotate-[-1deg]">
                  <div className="text-2xl lg:text-3xl font-bold text-white tabular-nums">60+</div>
                  <div className="text-[10px] text-[#94A3B8] uppercase tracking-wide mt-0.5">Lessons</div>
                  <div className="text-[10px] text-white/80 mt-1">Ready to study</div>
                </div>

                {/* Subject tags card */}
                <div className="absolute bottom-[5%] left-[5%] w-36 lg:w-40 p-3 rounded-xl bg-white/[0.08] border border-white/10 backdrop-blur-md shadow-xl hero-float-1 hero-card-interactive cursor-default rotate-[2deg]">
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-16 lg:mt-20 pt-12 border-t border-white/[0.05]">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="group rounded-xl bg-white/[0.03] border border-white/[0.05] p-5 lg:p-6 hover:bg-white/[0.06] hover:border-[#F21825]/20 transition-all duration-200"
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
      <section id="how-it-works" className="relative py-20 md:py-28 overflow-hidden">
        {/* Subtle gradient background */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/80 to-gray-100/60"
          aria-hidden
        />

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Section header */}
          <div className="text-center max-w-2xl mx-auto mb-14 md:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-5">
              One Platform, Three Modes
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed opacity-90">
              GRIO adapts to how you learn — whether you&apos;re a student studying independently,
              a teacher managing a class, or a school scaling its curriculum.
            </p>
          </div>

          {/* Cards grid: 1 col mobile, 2 tablet, 3 desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {modes.map((mode) => (
              <Link
                key={mode.title}
                href={mode.href}
                className="group group/card relative flex flex-col bg-white rounded-[18px] border border-gray-200/90 p-6 sm:p-7 lg:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#F21825]/30 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F21825] focus-visible:ring-offset-2"
              >
                {/* Accent top border on hover */}
                <span className="absolute top-0 left-0 right-0 h-0.5 rounded-t-[18px] bg-[#F21825] opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" aria-hidden />

                {/* Icon in circular background */}
                <div className="w-12 h-12 rounded-full bg-[#F21825]/10 flex items-center justify-center mb-5 flex-shrink-0 group-hover/card:bg-[#F21825]/15 transition-colors duration-300">
                  {mode.icon === 'user' && (
                    <svg className="w-6 h-6 text-[#F21825]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                  {mode.icon === 'school' && (
                    <svg className="w-6 h-6 text-[#F21825]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  )}
                  {mode.icon === 'pencil' && (
                    <svg className="w-6 h-6 text-[#F21825]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  )}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                  {mode.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6 flex-grow text-[15px]">
                  {mode.description}
                </p>

                {/* CTA link with arrow animation */}
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-800 group-hover/card:text-[#F21825] transition-colors duration-200 mt-auto">
                  {mode.cta}
                  <svg className="w-4 h-4 group-hover/card:translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Coverage */}
      <section id="curriculum" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Curriculum Coverage</h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              Content is mapped precisely to national curricula — not generic lessons, but
              exactly what students need for their specific examinations.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {curricula.map((c) => (
              <div
                key={c.country}
                className="bg-gray-50 rounded-2xl border border-gray-200 p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">{c.flag}</span>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{c.country}</h3>
                    <p className="text-sm text-gray-400">{c.levels.join(' · ')}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {c.subjects.map((subject) => (
                    <li
                      key={subject}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                      {subject}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Schools */}
      <section id="schools" className="py-24 bg-[#071728] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Built for Schools at Scale</h2>
              <p className="text-gray-300 leading-relaxed text-lg mb-8">
                GRIO&apos;s institutional tier gives school administrators full control over
                student accounts, content access, and curriculum deployment. Designed for
                secondary schools that want a structured digital learning environment without
                the complexity of enterprise software.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  'Bulk student registration and management',
                  'Teacher dashboards with class overview',
                  'Admin controls for curriculum access',
                  'School-level analytics and reporting',
                  'Dedicated support and onboarding',
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs flex-shrink-0 mt-0.5">✓</span>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/auth/signup"
                className="inline-flex px-8 py-3.5 bg-white text-[#0f2a4a] font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Register Your School
              </Link>
            </div>
            <div className="bg-[#0f2a4a] rounded-2xl border border-white/10 p-8">
              <h3 className="text-white font-semibold mb-6 text-lg">For Teachers</h3>
              <p className="text-gray-400 leading-relaxed mb-8">
                GRIO gives teachers a dedicated workspace to prepare lessons,
                monitor individual student progress, and access AI-assisted planning tools —
                all integrated with the same content students use.
              </p>
              <div className="space-y-4">
                {[
                  { icon: '📚', label: 'Curriculum-aligned lesson library' },
                  { icon: '📊', label: 'Student progress analytics' },
                  { icon: '📝', label: 'Lesson planning workspace' },
                  { icon: '✦', label: 'AI assistant (coming soon)' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-gray-300 text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/auth/signup"
                className="mt-8 inline-flex items-center text-sm font-semibold text-blue-300 hover:text-blue-200 transition-colors"
              >
                Join as a Teacher →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section id="pricing" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              Designed to be accessible for independent learners and scalable for institutions.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl border p-8 ${
                  tier.highlighted
                    ? 'bg-[#0f2a4a] border-[#0f2a4a] text-white shadow-xl'
                    : 'bg-white border-gray-200'
                }`}
              >
                {tier.highlighted && (
                  <span className="inline-block text-xs font-semibold text-blue-300 bg-blue-900/50 border border-blue-700/30 rounded-full px-3 py-1 mb-4">
                    Most Popular
                  </span>
                )}
                <h3
                  className={`text-lg font-bold mb-1 ${
                    tier.highlighted ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {tier.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span
                    className={`text-3xl font-bold ${
                      tier.highlighted ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {tier.price}
                  </span>
                  <span
                    className={`text-sm ${
                      tier.highlighted ? 'text-gray-300' : 'text-gray-400'
                    }`}
                  >
                    {tier.period}
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span
                        className={`text-xs mt-0.5 flex-shrink-0 ${
                          tier.highlighted ? 'text-blue-300' : 'text-blue-600'
                        }`}
                      >
                        ✓
                      </span>
                      <span
                        className={`text-sm ${
                          tier.highlighted ? 'text-gray-300' : 'text-gray-600'
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={tier.href}
                  className={`block text-center px-6 py-3 rounded-lg font-semibold text-sm transition-colors ${
                    tier.highlighted
                      ? 'bg-white text-[#0f2a4a] hover:bg-gray-100'
                      : 'bg-[#0f2a4a] text-white hover:bg-[#1a3d6b]'
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/pricing" className="text-sm text-gray-500 hover:text-gray-700 underline">
              View full pricing details →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#071728] text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-lg">GRIO</span>
            <span className="text-blue-400 text-xs font-medium">AI</span>
          </div>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} GRIO AI. Learning infrastructure for Africa.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/auth/login" className="hover:text-white transition-colors">Sign In</Link>
            <Link href="/auth/signup" className="hover:text-white transition-colors">Get Started</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
