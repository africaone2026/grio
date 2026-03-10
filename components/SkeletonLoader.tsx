'use client';

interface SkeletonLoaderProps {
  /**
   * Variant type: 'stat', 'list', or 'card'
   */
  variant?: 'stat' | 'list' | 'card';
  /**
   * Number of skeleton items to render
   */
  count?: number;
  /**
   * Additional CSS classes
   */
  className?: string;
}

export default function SkeletonLoader({
  variant = 'card',
  count = 1,
  className = '',
}: SkeletonLoaderProps) {
  const renderSkeleton = () => {
    switch (variant) {
      case 'stat':
        return (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="h-4 w-24 bg-slate-200 rounded mb-4 animate-pulse" />
            <div className="h-8 w-16 bg-slate-200 rounded mb-2 animate-pulse" />
            <div className="h-3 w-32 bg-slate-200 rounded animate-pulse" />
          </div>
        );
      case 'list':
        return (
          <div className="space-y-3">
            {[...Array(count)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 py-3">
                <div className="w-10 h-10 bg-slate-200 rounded-full animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
                  <div className="h-3 w-24 bg-slate-200 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        );
      case 'card':
      default:
        return (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="space-y-4">
              <div className="h-5 w-3/4 bg-slate-200 rounded animate-pulse" />
              <div className="h-4 w-full bg-slate-200 rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-slate-200 rounded animate-pulse" />
            </div>
          </div>
        );
    }
  };

  if (variant === 'list') {
    return <div className={className}>{renderSkeleton()}</div>;
  }

  return (
    <div className={className}>
      {[...Array(count)].map((_, i) => (
        <div key={i}>{renderSkeleton()}</div>
      ))}
    </div>
  );
}

