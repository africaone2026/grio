'use client';

import Link from 'next/link';

interface LogoProps {
  /**
   * Optional SVG logo URL. If not provided, uses the default logo-white.svg.
   */
  logoSrc?: string;
  /**
   * Link destination for the logo. Defaults to dashboard home.
   */
  href?: string;
  /**
   * Size variant: 'default' (expanded) or 'compact' (collapsed).
   */
  variant?: 'default' | 'compact';
  /**
   * Additional CSS classes.
   */
  className?: string;
}

export default function Logo({ 
  logoSrc = '/logo-white.svg', 
  href = '/dashboard',
  variant = 'default',
  className = ''
}: LogoProps) {
  const logoHeight = variant === 'compact' ? 32 : 40;
  
  const logoContent = (
    <div className="flex items-center gap-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logoSrc}
        alt="GRIO AI"
        height={logoHeight}
        className="h-8 w-auto object-contain"
      />
      <span className="text-blue-300 text-xs font-medium bg-blue-900/50 px-2 py-0.5 rounded-full">AI</span>
    </div>
  );

  return (
    <Link 
      href={href}
      className={`flex items-center ${variant === 'compact' ? 'justify-center' : ''} ${className}`}
      aria-label="GRIO AI - Go to dashboard"
    >
      {logoContent}
    </Link>
  );
}

