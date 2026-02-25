'use client';

import { useState, useEffect } from 'react';
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
    <div className="min-h-screen bg-slate-50 flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-b from-[#071728] to-[#0f2a4a] flex-col justify-between p-12">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-white font-bold text-xl">GRIO</span>
          <span className="text-blue-300 text-xs font-medium bg-blue-900/50 px-2 py-0.5 rounded-full">AI</span>
        </Link>
        <div>
          <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
            Start your learning<br />journey today.
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Join learners across Uganda, Zambia and beyond studying with
            curriculum-aligned content built for examination success.
          </p>
        </div>
        <div className="space-y-4">
          {[
            { icon: '✓', text: 'Curriculum-aligned lessons for your exact syllabus' },
            { icon: '✓', text: 'Track your progress across all subjects' },
            { icon: '✓', text: 'Practice questions with worked examples' },
          ].map((item) => (
            <div key={item.text} className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                {item.icon}
              </span>
              <span className="text-slate-300 text-sm">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-16">
        <div className="w-full max-w-md mx-auto">
          <div className="lg:hidden mb-8">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-[#0f2a4a] font-bold text-xl">GRIO</span>
              <span className="text-blue-600 text-xs font-medium bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">AI</span>
            </Link>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 mb-1">Create your account</h1>
          <p className="text-slate-500 text-sm mb-8">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign in
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label htmlFor="signup-name" className="block text-sm font-medium text-slate-700 mb-1.5">
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
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-slate-400 bg-white"
                aria-describedby={error ? 'signup-error' : undefined}
              />
            </div>
            <div>
              <label htmlFor="signup-email" className="block text-sm font-medium text-slate-700 mb-1.5">
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
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-slate-400 bg-white"
                aria-describedby={error ? 'signup-error' : undefined}
              />
            </div>
            <div>
              <label htmlFor="signup-password" className="block text-sm font-medium text-slate-700 mb-1.5">
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
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-slate-400 bg-white"
                aria-describedby="signup-password-hint"
              />
              <p id="signup-password-hint" className="mt-1 text-xs text-slate-400">
                Must be at least 6 characters.
              </p>
            </div>
            <div>
              <label htmlFor="signup-country" className="block text-sm font-medium text-slate-700 mb-1.5">
                Country
              </label>
              <select
                id="signup-country"
                required
                value={countryId}
                onChange={(e) => setCountryId(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-700"
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
              <label htmlFor="signup-curriculum" className="block text-sm font-medium text-slate-700 mb-1.5">
                Curriculum level
              </label>
              <select
                id="signup-curriculum"
                required
                value={curriculumId}
                onChange={(e) => setCurriculumId(e.target.value)}
                disabled={!countryId}
                aria-disabled={!countryId}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-700 disabled:bg-slate-100 disabled:text-slate-400"
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
              className="w-full py-3 bg-[#0f2a4a] text-white font-semibold rounded-lg hover:bg-[#1a3d6b] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              aria-busy={loading}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-6 text-xs text-slate-400 text-center">
            New accounts start with a 14-day trial. No credit card required.
          </p>
        </div>
      </div>
    </div>
  );
}
