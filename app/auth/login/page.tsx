'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { DEMO_CREDENTIALS } from '@/lib/mockData';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const loggedInUser = await login({ email, password });
      if (loggedInUser.role === 'super_admin') {
        router.push('/admin');
      } else if (loggedInUser.role === 'school_admin') {
        router.push('/school-admin');
      } else if (loggedInUser.role === 'teacher') {
        router.push('/teacher');
      } else {
        router.push('/dashboard');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed.');
    } finally {
      setLoading(false);
    }
  }

  function fillCredentials(demoEmail: string, demoPassword: string) {
    setEmail(demoEmail);
    setPassword(demoPassword);
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
            Your learning
            <br />
            infrastructure awaits.
          </h2>
          <p className="text-[#94A3B8] text-base leading-relaxed">
            Access curriculum-aligned lessons, track your progress, and study
            at your own pace — for Uganda, Zambia, and IGCSE.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 relative z-10">
          {['60+ Lessons', '7 Subjects', '4 Curricula', '3 Countries'].map((stat) => (
            <div
              key={stat}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-4 hover:bg-white/[0.06] hover:border-[#F21825]/20 transition-all duration-200"
            >
              <p className="text-white font-semibold">{stat}</p>
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
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Sign in to GRIO</h1>
            <p className="text-gray-500 text-sm mb-6">
              Don&apos;t have an account?{' '}
              <Link
                href="/auth/signup"
                className="text-[#F21825] hover:text-[#e01522] font-medium transition-colors"
              >
                Create one
              </Link>
            </p>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-lg text-sm text-gray-900 placeholder-gray-400 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F21825]/50 focus:border-[#F21825] transition-colors"
                  aria-describedby={error ? 'login-error' : undefined}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 pr-12 rounded-lg text-sm text-gray-900 placeholder-gray-400 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F21825]/50 focus:border-[#F21825] transition-colors"
                    aria-describedby={error ? 'login-error' : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              {error && (
                <div
                  id="login-error"
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
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Demo accounts — click to fill
              </p>
              <div className="space-y-2">
                {DEMO_CREDENTIALS.map((demo) => (
                  <button
                    key={demo.email}
                    onClick={() => fillCredentials(demo.email, demo.password)}
                    className="w-full text-left px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-[#F21825]/30 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">{demo.label}</span>
                      <span className="text-xs text-gray-500 font-mono">{demo.email}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
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
