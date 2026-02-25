'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { user } = useAuth();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const dashboardHref =
    user?.role === 'super_admin'
      ? '/admin'
      : user?.role === 'school_admin'
      ? '/school-admin'
      : user?.role === 'teacher'
      ? '/teacher'
      : '/dashboard';

  const navLinks = [
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Curriculum', href: '/#curriculum' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'For Schools', href: '/#schools' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-[#0f2a4a] font-bold text-xl tracking-tight">GRIO</span>
          <span className="text-blue-600 text-xs font-medium bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">AI</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <Link
              href={dashboardHref}
              className="px-4 py-2 text-sm font-medium text-white bg-[#0f2a4a] rounded-lg hover:bg-[#1a3d6b] transition-colors"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="hidden sm:block px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="px-4 py-2 text-sm font-medium text-white bg-[#0f2a4a] rounded-lg hover:bg-[#1a3d6b] transition-colors"
              >
                Get Started
              </Link>
            </>
          )}

          <button
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-6 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2.5 text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          {!user && (
            <div className="pt-3 border-t border-slate-100 mt-3">
              <Link
                href="/auth/login"
                className="block py-2.5 text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
