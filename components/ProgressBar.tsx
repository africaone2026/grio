'use client';

interface ProgressBarProps {
  label?: string;
  percentage: number;
  showPercentage?: boolean;
  height?: 'sm' | 'md' | 'lg';
  color?: string;
}

export default function ProgressBar({
  label,
  percentage,
  showPercentage = true,
  height = 'md',
  color = 'bg-blue-600',
}: ProgressBarProps) {
  const clampedPct = Math.min(100, Math.max(0, percentage));

  const heightClass = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  }[height];

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && (
            <span className="text-sm text-slate-600 font-medium">{label}</span>
          )}
          {showPercentage && (
            <span className="text-sm font-semibold text-slate-700 ml-auto">
              {clampedPct}%
            </span>
          )}
        </div>
      )}
      <div className={`w-full bg-slate-200 rounded-full ${heightClass}`}>
        <div
          className={`${color} ${heightClass} rounded-full transition-all duration-500`}
          style={{ width: `${clampedPct}%` }}
        />
      </div>
    </div>
  );
}
