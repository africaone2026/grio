'use client';

import { ReactNode } from 'react';

interface DashboardCardProps {
  /**
   * Optional header content (title, actions, etc.)
   */
  header?: ReactNode;
  /**
   * Main card content
   */
  children: ReactNode;
  /**
   * Optional footer/action area
   */
  action?: ReactNode;
  /**
   * Card variant style
   */
  variant?: 'default' | 'elevated' | 'outlined';
  /**
   * Whether the card is clickable/interactive
   */
  interactive?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Click handler (only used if interactive is true)
   */
  onClick?: () => void;
}

export default function DashboardCard({
  header,
  children,
  action,
  variant = 'default',
  interactive = false,
  className = '',
  onClick,
}: DashboardCardProps) {
  const baseClasses = 'bg-white rounded-xl p-6 transition-all duration-150 ease-in-out';
  
  const variantClasses = {
    default: 'shadow-sm hover:shadow-md',
    elevated: 'shadow-md hover:shadow-lg',
    outlined: 'border border-slate-200 shadow-none hover:shadow-sm',
  };

  const interactiveClasses = interactive
    ? 'cursor-pointer hover:-translate-y-0.5 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
    : '';

  const cardContent = (
    <>
      {header && (
        <div className="mb-4 border-b border-slate-100 pb-4 last:mb-0 last:border-0 last:pb-0">
          {header}
        </div>
      )}
      <div className="flex-1">
        {children}
      </div>
      {action && (
        <div className="mt-4 pt-4 border-t border-slate-100">
          {action}
        </div>
      )}
    </>
  );

  const cardClasses = `${baseClasses} ${variantClasses[variant]} ${interactiveClasses} ${className}`;

  if (interactive && onClick) {
    return (
      <div
        className={cardClasses}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={typeof header === 'string' ? header : 'Interactive card'}
      >
        {cardContent}
      </div>
    );
  }

  return (
    <div className={cardClasses}>
      {cardContent}
    </div>
  );
}

