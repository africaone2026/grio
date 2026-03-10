import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Image from 'next/image';

const tiers = [
  {
    name: 'Free Trial',
    price: '$0',
    period: '14-day trial',
    description: 'Explore GRIO with limited access before committing.',
    features: [
      'Access to 3 subjects',
      'Progress tracking',
      'Practice questions',
      'Basic analytics',
      'Email support',
    ],
    notIncluded: ['Full curriculum access', 'All subjects', 'Downloadable notes'],
    cta: 'Start Free Trial',
    href: '/auth/signup',
    highlighted: false,
  },
  {
    name: 'Independent Learner',
    price: '$8',
    period: 'per month',
    description: 'Full access for a single learner studying independently.',
    features: [
      'Full curriculum access',
      'All subjects for your country',
      'Progress tracking & analytics',
      'Practice questions',
      'Lesson history',
      'Mobile-compatible (tablet)',
      'Email support',
    ],
    notIncluded: [],
    cta: 'Get Started',
    href: '/auth/signup',
    highlighted: true,
  },
  {
    name: 'Family',
    price: '$18',
    period: 'per month',
    description: 'Up to 4 independent learner accounts under one family.',
    features: [
      'Everything in Independent Learner',
      'Up to 4 learner accounts',
      'Individual progress per learner',
      'Single billing',
      'Priority email support',
    ],
    notIncluded: [],
    cta: 'Get Started',
    href: '/auth/signup',
    highlighted: false,
  },
  {
    name: 'School — Starter',
    price: '$120',
    period: 'per month',
    description: 'For schools with up to 100 active students.',
    features: [
      'Up to 100 student accounts',
      'Teacher dashboards',
      'Class management tools',
      'Admin controls',
      'Curriculum configuration',
      'School-level analytics',
      'Dedicated onboarding',
    ],
    notIncluded: [],
    cta: 'Contact Us',
    href: '/auth/signup',
    highlighted: false,
  },
  {
    name: 'School — Growth',
    price: '$300',
    period: 'per month',
    description: 'For schools with up to 500 active students.',
    features: [
      'Everything in Starter',
      'Up to 500 student accounts',
      'Unlimited teacher accounts',
      'Custom reporting',
      'API access (coming soon)',
      'Priority support SLA',
    ],
    notIncluded: [],
    cta: 'Contact Us',
    href: '/auth/signup',
    highlighted: false,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'per institution',
    description: 'For large institutions, districts, and government deployments.',
    features: [
      'Unlimited students',
      'Custom curriculum configuration',
      'White-labelling available',
      'LMS integration (coming soon)',
      'Dedicated account manager',
      'SLA guarantees',
      'On-site training',
    ],
    notIncluded: [],
    cta: 'Talk to Sales',
    href: '/auth/signup',
    highlighted: false,
  },
];

const faqs = [
  {
    q: 'What curriculum does GRIO support?',
    a: 'GRIO currently supports Uganda Secondary (O-Level), Uganda Primary, Zambia Secondary, and Cambridge IGCSE. More curricula are being added.',
  },
  {
    q: 'Can I switch plans?',
    a: 'Yes. You can upgrade or downgrade your plan at any time. Changes take effect at the start of the next billing cycle.',
  },
  {
    q: 'Is there a contract for school plans?',
    a: 'School plans are available on monthly or annual billing. Annual plans receive a 15% discount. There is no long-term lock-in on monthly plans.',
  },
  {
    q: 'How is a student account defined?',
    a: 'A student account is any active learner who has logged in during the current billing month. Inactive accounts do not count toward your limit.',
  },
  {
    q: 'Do you offer discounts for NGOs or government schools?',
    a: 'Yes. We offer preferential pricing for NGOs, government-funded schools, and institutions serving underserved communities. Contact us to discuss.',
  },
];

function CheckIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.12 7.18a1 1 0 0 1-1.42 0L4.29 9.994A1 1 0 1 1 5.71 8.58l3.17 3.193 6.41-6.465a1 1 0 0 1 1.414-.006Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function PricingCard({
  tier,
  index,
}: {
  tier: (typeof tiers)[0];
  index: number;
}) {
  const isHighlighted = tier.highlighted;
  const priceNum = tier.price.startsWith('$') ? tier.price.slice(1) : null;

  return (
    <div
      data-highlighted={isHighlighted ? 'true' : 'false'}
      className={`pricing-reveal pricing-card group/tier relative flex h-full min-h-[520px] flex-col overflow-hidden rounded-[22px] border p-8 sm:p-10 ${
        isHighlighted
          ? 'bg-[#0f172a] text-white border-white/5 shadow-[0_30px_80px_-28px_rgba(15,23,42,0.75)]'
          : 'border-gray-200/50 bg-white/88 text-gray-900 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.18)] backdrop-blur-xl'
      }`}
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      <div
        className={`pointer-events-none absolute inset-0 ${
          isHighlighted
            ? 'bg-[radial-gradient(circle_at_top,rgba(242,24,37,0.18),transparent_38%)]'
            : 'bg-[radial-gradient(circle_at_top,rgba(242,24,37,0.08),transparent_34%)]'
        }`}
        aria-hidden
      />

      <div className="relative flex h-full flex-col">
        <div className="mb-6">
          {isHighlighted && (
            <span className="pricing-badge inline-flex items-center rounded-full border border-[#F21825]/25 bg-[rgba(242,24,37,0.15)] px-4 py-1.5 text-xs font-semibold text-[#F21825] shadow-[0_8px_24px_-16px_rgba(242,24,37,0.6)]">
              Most Popular
            </span>
          )}
          <h3
            className={`mt-4 text-xl font-bold tracking-tight ${
              isHighlighted ? 'text-white' : 'text-gray-900'
            }`}
          >
            {tier.name}
          </h3>
          <p
            className={`mt-1.5 text-sm ${
              isHighlighted ? 'text-white/70' : 'text-gray-500'
            }`}
          >
            {tier.description}
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-end gap-2">
            {priceNum !== null ? (
              <>
                <span
                  className={`mb-2 text-2xl font-semibold ${
                    isHighlighted ? 'text-white/65' : 'text-gray-400'
                  }`}
                >
                  $
                </span>
                <span
                  className={`text-5xl sm:text-6xl font-bold tracking-tight ${
                    isHighlighted ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {priceNum}
                </span>
              </>
            ) : (
              <span
                className={`text-4xl sm:text-5xl font-bold tracking-tight ${
                  isHighlighted ? 'text-white' : 'text-gray-900'
                }`}
              >
                {tier.price}
              </span>
            )}
          </div>
          <p
            className={`mt-3 text-sm font-medium ${
              isHighlighted ? 'text-white/70' : 'text-gray-500'
            }`}
          >
            {tier.period}
          </p>
        </div>

        <ul className="mb-10 flex-1 space-y-3.5">
          {tier.features.map((f) => (
            <li
              key={f}
              className="pricing-feature group/feature flex items-start gap-3 rounded-2xl"
            >
              <span className="pricing-feature-icon mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[rgba(242,24,37,0.12)] text-[#F21825]">
                <CheckIcon />
              </span>
              <span
                className={`pt-1 text-[0.95rem] leading-7 ${
                  isHighlighted ? 'text-white/80' : 'text-gray-600'
                }`}
              >
                {f}
              </span>
            </li>
          ))}
          {tier.notIncluded.map((f) => (
            <li
              key={f}
              className="flex items-start gap-3 rounded-2xl opacity-80"
            >
              <span className="mt-1.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gray-200/80 text-gray-400">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
                </svg>
              </span>
              <span
                className={`pt-1 text-[0.95rem] leading-7 line-through ${
                  isHighlighted ? 'text-white/50' : 'text-gray-400'
                }`}
              >
                {f}
              </span>
            </li>
          ))}
        </ul>

        <Link
          href={tier.href}
          className={`inline-flex w-full items-center justify-center rounded-xl border px-6 py-3.5 text-sm font-semibold ${
            isHighlighted
              ? 'bg-[#F21825] border-[#F21825] text-white shadow-[0_16px_32px_-18px_rgba(242,24,37,0.8)] hover:bg-[#ff3340] hover:border-[#ff3340]'
              : 'bg-[#0f172a] border-[#0f172a]/10 text-white hover:bg-[#F21825] hover:border-[#F21825] hover:shadow-[0_16px_30px_-18px_rgba(242,24,37,0.7)]'
          }`}
          style={{ transition: 'all 0.25s ease' }}
        >
          {tier.cta}
        </Link>
      </div>
    </div>
  );
}

export default function PricingPage() {
  const learnerTiers = tiers.slice(0, 3);
  const schoolTiers = tiers.slice(3);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero — matches landing pricing section */}
      <section
        className="relative overflow-hidden py-20 sm:py-28 bg-gradient-to-br from-[#0B1220] via-[#0F172A] to-[#0B1220]"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.45]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(242,24,37,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(242,24,37,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '72px 72px',
            maskImage:
              'linear-gradient(180deg, transparent 0%, black 18%, black 82%, transparent 100%)',
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

        <div className="relative max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <h1 className="pricing-reveal text-4xl sm:text-5xl font-bold tracking-tight text-white mb-5">
            Simple, <span className="text-[#F21825]">Transparent</span> Pricing
          </h1>
          <p className="pricing-reveal text-lg sm:text-xl text-gray-100 leading-8 max-w-2xl mx-auto">
            Accessible for individual learners. Scalable for institutions.
            No hidden fees. Cancel anytime.
          </p>
        </div>
      </section>

      {/* For Independent Learners */}
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fff_0%,rgba(242,24,37,0.03)_50%,#fff_100%)] py-20 sm:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(242,24,37,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(242,24,37,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '72px 72px',
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute right-0 top-1/4 h-64 w-64 rounded-full bg-[#F21825]/6 blur-3xl"
          aria-hidden
        />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
          <div className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mb-2">
              For <span className="text-[#F21825]">Independent Learners</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl">
              Study at your own pace with full curriculum access.
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
              {learnerTiers.map((tier, index) => (
                <PricingCard key={tier.name} tier={tier} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* For Schools and Institutions */}
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fff_0%,rgba(242,24,37,0.04)_45%,#fff_100%)] py-20 sm:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.45]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(242,24,37,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(242,24,37,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '72px 72px',
            maskImage:
              'linear-gradient(180deg, transparent 0%, black 15%, black 85%, transparent 100%)',
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute left-[-6%] bottom-1/4 h-56 w-56 rounded-full bg-[#F21825]/8 blur-3xl"
          aria-hidden
        />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
          <div className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mb-2">
              For <span className="text-[#F21825]">Schools and Institutions</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl">
              Full administrative control for structured classroom environments.
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div
              className="pointer-events-none absolute inset-y-10 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#F21825]/12 to-transparent lg:block"
              aria-hidden
            />

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
              {schoolTiers.map((tier, index) => (
                <PricingCard
                  key={tier.name}
                  tier={tier}
                  index={index + learnerTiers.length}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fff_0%,rgba(242,24,37,0.04)_30%,rgba(242,24,37,0.06)_70%,#fff_100%)] py-20 sm:py-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(242,24,37,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(242,24,37,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
          }}
          aria-hidden
        />

        <div className="relative max-w-3xl mx-auto px-6 sm:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-3 text-center">
            Frequently <span className="text-[#F21825]">Asked Questions</span>
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-xl mx-auto">
            Everything you need to know about plans and billing.
          </p>
          <div className="space-y-1">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="group rounded-2xl border border-gray-200/60 bg-white/80 backdrop-blur-sm px-6 py-5 hover:border-[#F21825]/20 hover:shadow-[0_8px_30px_-12px_rgba(242,24,37,0.15)] transition-all duration-200"
              >
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#0f172a]">
                  {faq.q}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
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
