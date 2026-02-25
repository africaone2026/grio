import Link from 'next/link';
import Navbar from '@/components/Navbar';

const modes = [
  {
    title: 'Independent Learner',
    description:
      'Self-paced learning for students studying at home or supplementing classroom education. Access curriculum-aligned lessons, track your own progress, and study at your own pace.',
    icon: '👤',
    cta: 'Start Learning',
    href: '/auth/signup',
  },
  {
    title: 'Classroom Mode',
    description:
      'Structured learning environments for schools. Teachers manage student access, monitor class progress, and align lessons with the national curriculum timetable.',
    icon: '🏫',
    cta: 'Register School',
    href: '/auth/signup',
  },
  {
    title: 'Teacher Workspace',
    description:
      'A dedicated workspace for educators to prepare lessons, review student performance, and leverage AI-assisted planning tools to improve teaching effectiveness.',
    icon: '✏️',
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
  { value: '3', label: 'Countries' },
  { value: '4', label: 'Curricula' },
  { value: '11+', label: 'Subjects' },
  { value: '60+', label: 'Lessons' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-b from-[#071728] to-[#0f2a4a] text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 text-blue-300 text-sm font-medium bg-blue-900/30 border border-blue-800/50 rounded-full px-4 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              Now available in Uganda, Zambia and for IGCSE learners
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
              AI Learning Infrastructure<br />
              <span className="text-blue-300">for Classrooms and</span><br />
              Independent Learners
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl leading-relaxed mb-10">
              GRIO delivers structured, curriculum-aligned learning for students across Africa.
              Built for schools, teachers, and independent learners who demand more than a textbook.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/auth/signup"
                className="px-8 py-3.5 bg-white text-[#0f2a4a] font-semibold rounded-lg hover:bg-slate-100 transition-colors"
              >
                Start Learning
              </Link>
              <Link
                href="#schools"
                className="px-8 py-3.5 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/5 transition-colors"
              >
                Register School
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20 pt-12 border-t border-white/10">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-slate-400 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">One Platform, Three Modes</h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              GRIO adapts to how you learn — whether you&apos;re a student studying independently,
              a teacher managing a class, or a school scaling its curriculum.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {modes.map((mode) => (
              <div
                key={mode.title}
                className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-5">{mode.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{mode.title}</h3>
                <p className="text-slate-500 leading-relaxed mb-6">{mode.description}</p>
                <Link
                  href={mode.href}
                  className="inline-flex items-center text-sm font-semibold text-[#0f2a4a] hover:text-blue-700 transition-colors"
                >
                  {mode.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Coverage */}
      <section id="curriculum" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Curriculum Coverage</h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              Content is mapped precisely to national curricula — not generic lessons, but
              exactly what students need for their specific examinations.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {curricula.map((c) => (
              <div
                key={c.country}
                className="bg-slate-50 rounded-2xl border border-slate-200 p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">{c.flag}</span>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{c.country}</h3>
                    <p className="text-sm text-slate-400">{c.levels.join(' · ')}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {c.subjects.map((subject) => (
                    <li
                      key={subject}
                      className="flex items-center gap-2 text-sm text-slate-600"
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
              <p className="text-slate-300 leading-relaxed text-lg mb-8">
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
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/auth/signup"
                className="inline-flex px-8 py-3.5 bg-white text-[#0f2a4a] font-semibold rounded-lg hover:bg-slate-100 transition-colors"
              >
                Register Your School
              </Link>
            </div>
            <div className="bg-[#0f2a4a] rounded-2xl border border-white/10 p-8">
              <h3 className="text-white font-semibold mb-6 text-lg">For Teachers</h3>
              <p className="text-slate-400 leading-relaxed mb-8">
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
                    <span className="text-slate-300 text-sm">{item.label}</span>
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
      <section id="pricing" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-slate-500 text-lg leading-relaxed">
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
                    : 'bg-white border-slate-200'
                }`}
              >
                {tier.highlighted && (
                  <span className="inline-block text-xs font-semibold text-blue-300 bg-blue-900/50 border border-blue-700/30 rounded-full px-3 py-1 mb-4">
                    Most Popular
                  </span>
                )}
                <h3
                  className={`text-lg font-bold mb-1 ${
                    tier.highlighted ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {tier.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span
                    className={`text-3xl font-bold ${
                      tier.highlighted ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {tier.price}
                  </span>
                  <span
                    className={`text-sm ${
                      tier.highlighted ? 'text-slate-300' : 'text-slate-400'
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
                          tier.highlighted ? 'text-slate-300' : 'text-slate-600'
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
                      ? 'bg-white text-[#0f2a4a] hover:bg-slate-100'
                      : 'bg-[#0f2a4a] text-white hover:bg-[#1a3d6b]'
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/pricing" className="text-sm text-slate-500 hover:text-slate-700 underline">
              View full pricing details →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#071728] text-slate-400 py-12">
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
