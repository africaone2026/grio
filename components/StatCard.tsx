'use client';

interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}

export default function StatCard({
  label,
  value,
  sub,
  icon,
  trend,
}: StatCardProps) {
  const trendColors = {
    up: 'text-emerald-600',
    down: 'text-red-500',
    neutral: 'text-slate-500',
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">
            {label}
          </p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
          {sub && (
            <p
              className={`mt-1 text-sm ${
                trend ? trendColors[trend] : 'text-slate-500'
              }`}
            >
              {sub}
            </p>
          )}
        </div>
        {icon && (
          <div className="ml-4 p-3 bg-slate-50 rounded-lg text-slate-600">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
