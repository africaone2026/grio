'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getCountries, getCurricula } from '@/lib/api';
import type { Country, Curriculum } from '@/lib/types';

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [countryId, setCountryId] = useState('');
  const [curriculumId, setCurriculumId] = useState('');
  const [countries, setCountries] = useState<Country[]>([]);
  const [curricula, setCurricula] = useState<Curriculum[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCountries().then(setCountries);
  }, []);

  useEffect(() => {
    if (countryId) {
      getCurricula(countryId).then(setCurricula);
      setCurriculumId('');
    }
  }, [countryId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!curriculumId) {
      setError('Please select a curriculum level.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await signup({ name, email, password, countryId, curriculumId });
      router.push('/dashboard');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Signup failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left panel: branding and copy — dark background only here */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-10 xl:p-12 overflow-hidden bg-[#0B1220] text-white">
        {/* Dark background and effects — scoped to left panel */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#0B1220] via-[#0F172A] to-[#0B1220]"
          aria-hidden
        />
        <div
          className="absolute top-1/2 right-0 w-[200%] h-[120%] -translate-y-1/2 rounded-full bg-[#F21825] opacity-[0.08] blur-[100px] pointer-events-none"
          aria-hidden
        />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-96 bg-[#F21825] opacity-[0.05] blur-[80px] pointer-events-none"
          aria-hidden
        />
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

        <Link href="/" className="relative inline-flex items-center z-10">
          <Image
            src="/logo-white.svg"
            alt="GRIO"
            width={120}
            height={32}
            className="h-8 w-auto"
          />
        </Link>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
            Start your learning
            <br />
            journey today.
          </h2>
          <p className="text-[#94A3B8] text-base leading-relaxed">
            Join learners across Uganda, Zambia and beyond studying with
            curriculum-aligned content built for examination success.
          </p>
        </div>
        <div className="space-y-3 relative z-10">
          {[
            { icon: '✓', text: 'Curriculum-aligned lessons for your exact syllabus' },
            { icon: '✓', text: 'Track your progress across all subjects' },
            { icon: '✓', text: 'Practice questions with worked examples' },
          ].map((item) => (
            <div
              key={item.text}
              className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 hover:bg-white/[0.06] hover:border-[#F21825]/20 transition-all duration-200"
            >
              <span className="w-6 h-6 rounded-full bg-[#F21825]/20 border border-[#F21825]/30 text-[#F21825] flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                {item.icon}
              </span>
              <span className="text-[#94A3B8] text-sm">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel: form — clear background */}
      <div className="relative flex-1 flex flex-col justify-center px-6 py-12 lg:px-16 bg-gray-50">
        <div className="w-full max-w-md mx-auto">
          <div className="lg:hidden mb-8">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/logo.svg"
                alt="GRIO"
                width={120}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Create your account</h1>
            <p className="text-gray-500 text-sm mb-6">
              Already have an account?{' '}
              <Link
                href="/auth/login"
                className="text-[#F21825] hover:text-[#e01522] font-medium transition-colors"
              >
                Sign in
              </Link>
            </p>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label htmlFor="signup-name" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Full name
                </label>
                <input
                  id="signup-name"
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#F21825]/50 focus:border-[#F21825] placeholder-gray-400 bg-white transition-colors"
                  aria-describedby={error ? 'signup-error' : undefined}
                />
              </div>
              <div>
                <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email address
                </label>
                <input
                  id="signup-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#F21825]/50 focus:border-[#F21825] placeholder-gray-400 bg-white transition-colors"
                  aria-describedby={error ? 'signup-error' : undefined}
                />
              </div>
              <div>
                <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>
                <input
                  id="signup-password"
                  type="password"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#F21825]/50 focus:border-[#F21825] placeholder-gray-400 bg-white transition-colors"
                  aria-describedby="signup-password-hint"
                />
                <p id="signup-password-hint" className="mt-1 text-xs text-gray-400">
                  Must be at least 6 characters.
                </p>
              </div>
              <div>
                <label htmlFor="signup-country" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Country
                </label>
                <select
                  id="signup-country"
                  required
                  value={countryId}
                  onChange={(e) => setCountryId(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#F21825]/50 focus:border-[#F21825] bg-white transition-colors"
                >
                  <option value="">Select your country...</option>
                  {countries.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="signup-curriculum" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Curriculum level
                </label>
                <select
                  id="signup-curriculum"
                  required
                  value={curriculumId}
                  onChange={(e) => setCurriculumId(e.target.value)}
                  disabled={!countryId}
                  aria-disabled={!countryId}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#F21825]/50 focus:border-[#F21825] bg-white disabled:bg-gray-100 disabled:text-gray-400 transition-colors"
                >
                  <option value="">
                    {countryId ? 'Select your level...' : 'Select a country first'}
                  </option>
                  {curricula.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              {error && (
                <div
                  id="signup-error"
                  role="alert"
                  className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3"
                >
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#F21825] text-white font-semibold rounded-lg hover:bg-[#e01522] hover:shadow-lg hover:shadow-[#F21825]/25 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-none"
                aria-busy={loading}
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>

            <p className="mt-6 text-xs text-gray-500 text-center">
              New accounts start with a 14-day trial. No credit card required.
            </p>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
              ← Back to home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
