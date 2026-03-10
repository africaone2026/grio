'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';

const MOBILE_MENU_ID = 'mobile-flyout-menu';

export default function Navbar() {
  const { user } = useAuth();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

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

  const closeMenu = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    queueMicrotask(closeMenu);
  }, [pathname, closeMenu]);

  // Lock body scroll when flyout is open
  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileOpen]);

  // ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) closeMenu();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen, closeMenu]);

  // Focus trap and return focus on close
  useEffect(() => {
    if (!mobileOpen) {
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        previousFocusRef.current.focus();
        previousFocusRef.current = null;
      }
      return;
    }
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const menuEl = menuRef.current;
    if (!menuEl) return;
    const focusables = menuEl.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])'
    );
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (first) {
      requestAnimationFrame(() => first.focus());
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    menuEl.addEventListener('keydown', handleKeyDown);
    return () => menuEl.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  const handleToggleClick = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      const [path, hash] = href.split('#');
      const pathPart = path || '/';
      if (hash && pathname === pathPart) {
        e.preventDefault();
        const el = document.getElementById(hash);
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        closeMenu();
      } else if (pathname !== pathPart) {
        closeMenu();
      }
    },
    [pathname, closeMenu]
  );

  const primaryButtonClass =
    'px-4 py-2 text-sm font-medium text-white rounded-lg bg-gradient-to-r from-[#F21825] to-[#c41420] shadow-md hover:shadow-lg hover:shadow-[#F21825]/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300';
  const secondaryButtonClass =
    'px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border-2 border-gray-300 hover:border-gray-500 rounded-lg transition-all duration-200';

  return (
    <header className="w-screen sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200">
      <div className="relative max-w-7xl mx-auto px-4 pr-16 sm:px-6 sm:pr-20 lg:pr-6 h-16 flex items-center justify-between gap-4">
        {/* Logo - left */}
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0"
          aria-label="GRIO home"
        >
          <Image
            src="/logo.svg"
            alt="GRIO"
            width={120}
            height={32}
            className="h-8 w-auto"
            priority
          />
        </Link>

        {/* Desktop: center nav (≥1024px) */}
        <nav
          className="hidden lg:flex items-center justify-center gap-8 flex-1"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleAnchorClick(e, link.href)}
              className="text-sm font-semibold text-gray-800 hover:text-[#F21825] transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: CTA + mobile toggle */}
        <div className="ml-auto flex items-center gap-2 sm:gap-3 shrink-0">
          {user ? (
            <Link
              href={dashboardHref}
              className="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-white bg-[#0f2a4a] rounded-lg hover:bg-[#1a3d6b] transition-colors duration-200"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/auth/login"
                className={`hidden sm:inline-flex ${secondaryButtonClass}`}
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className={`hidden sm:inline-flex ${primaryButtonClass}`}
              >
                Get Started
              </Link>
            </>
          )}

        </div>

        {/* Hamburger - visible <1024px */}
        <button
          ref={toggleButtonRef}
          type="button"
          className="absolute right-4 top-1/2 z-50 -translate-y-1/2 lg:hidden p-2.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#F21825] focus:ring-offset-2 sm:right-6"
          onClick={handleToggleClick}
          aria-expanded={mobileOpen}
          aria-controls={MOBILE_MENU_ID}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          <span className="relative w-5 h-5 block" aria-hidden>
            <span
              className={`absolute left-0 w-5 h-0.5 bg-current rounded-full origin-center transition-all duration-[250ms] ease-out ${
                mobileOpen
                  ? 'top-1/2 -translate-y-1/2 rotate-45'
                  : 'top-1'
              }`}
            />
            <span
              className={`absolute left-0 w-5 h-0.5 bg-current rounded-full top-1/2 -translate-y-1/2 transition-all duration-[250ms] ease-out ${
                mobileOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
              }`}
            />
            <span
              className={`absolute left-0 w-5 h-0.5 bg-current rounded-full origin-center transition-all duration-[250ms] ease-out ${
                mobileOpen
                  ? 'top-1/2 -translate-y-1/2 -rotate-45'
                  : 'bottom-1'
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile flyout: backdrop + panel */}
      <div
        className="lg:hidden fixed inset-0 z-40"
        aria-hidden={!mobileOpen}
        style={{ pointerEvents: mobileOpen ? 'auto' : 'none' }}
      >
        {/* Backdrop */}
        <button
          type="button"
          className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-[250ms] ease-out focus:outline-none focus:ring-0"
          style={{
            opacity: mobileOpen ? 1 : 0,
            transitionProperty: 'opacity',
          }}
          onClick={closeMenu}
          aria-label="Close menu"
          tabIndex={-1}
        />

        {/* Flyout panel - slide from right */}
        <div
          ref={menuRef}
          id={MOBILE_MENU_ID}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="absolute top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-xl flex flex-col origin-right transition-transform duration-[250ms] ease-out"
          style={{
            transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
          }}
        >
          <div className="flex flex-col gap-1 p-6 pt-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  handleAnchorClick(e, link.href);
                  closeMenu();
                }}
                className="py-3 px-3 text-base font-semibold text-gray-800 hover:text-[#F21825] hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-4 pt-4 border-t border-gray-200 flex flex-col gap-2">
              {user ? (
                <Link
                  href={dashboardHref}
                  onClick={closeMenu}
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-[#0f2a4a] rounded-lg hover:bg-[#1a3d6b] transition-colors duration-200"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    onClick={closeMenu}
                    className={`inline-flex justify-center ${secondaryButtonClass}`}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    onClick={closeMenu}
                    className={`inline-flex justify-center ${primaryButtonClass}`}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
