import Link from 'next/link';
import Navbar from '@/components/Navbar';

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

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="bg-gradient-to-b from-[#071728] to-[#0f2a4a] text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Pricing</h1>
          <p className="text-slate-300 text-lg leading-relaxed">
            Accessible for individual learners. Scalable for institutions.
            No hidden fees. Cancel anytime.
          </p>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-xl font-bold text-slate-900 mb-2">For Independent Learners</h2>
          <p className="text-slate-500 mb-10">Study at your own pace with full curriculum access.</p>
          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {tiers.slice(0, 3).map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl border p-8 ${
                  tier.highlighted
                    ? 'bg-[#0f2a4a] border-[#0f2a4a] shadow-xl'
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
                <p className={`text-sm mb-4 ${tier.highlighted ? 'text-slate-400' : 'text-slate-500'}`}>
                  {tier.description}
                </p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className={`text-3xl font-bold ${tier.highlighted ? 'text-white' : 'text-slate-900'}`}>
                    {tier.price}
                  </span>
                  <span className={`text-sm ${tier.highlighted ? 'text-slate-300' : 'text-slate-400'}`}>
                    {tier.period}
                  </span>
                </div>
                <ul className="space-y-2.5 mb-8">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className={`text-xs mt-1 flex-shrink-0 ${tier.highlighted ? 'text-blue-300' : 'text-emerald-600'}`}>✓</span>
                      <span className={`text-sm ${tier.highlighted ? 'text-slate-300' : 'text-slate-600'}`}>{f}</span>
                    </li>
                  ))}
                  {tier.notIncluded.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="text-xs mt-1 flex-shrink-0 text-slate-300">✗</span>
                      <span className="text-sm text-slate-400 line-through">{f}</span>
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

          <h2 className="text-xl font-bold text-slate-900 mb-2">For Schools and Institutions</h2>
          <p className="text-slate-500 mb-10">Full administrative control for structured classroom environments.</p>
          <div className="grid lg:grid-cols-3 gap-8">
            {tiers.slice(3).map((tier) => (
              <div
                key={tier.name}
                className="bg-white rounded-2xl border border-slate-200 p-8 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-1">{tier.name}</h3>
                <p className="text-sm text-slate-500 mb-4">{tier.description}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-bold text-slate-900">{tier.price}</span>
                  <span className="text-sm text-slate-400">{tier.period}</span>
                </div>
                <ul className="space-y-2.5 mb-8">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="text-xs mt-1 flex-shrink-0 text-emerald-600">✓</span>
                      <span className="text-sm text-slate-600">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={tier.href}
                  className="block text-center px-6 py-3 bg-[#0f2a4a] text-white rounded-lg font-semibold text-sm hover:bg-[#1a3d6b] transition-colors"
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-10 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="border-b border-slate-100 pb-6">
                <h3 className="font-semibold text-slate-900 mb-2">{faq.q}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
