'use client';

import DashboardCard from './DashboardCard';

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
    neutral: 'text-gray-500',
  };

  return (
    <DashboardCard variant="default">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            {label}
          </p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
          {sub && (
            <p
              className={`mt-1 text-sm ${
                trend ? trendColors[trend] : 'text-gray-500'
              }`}
            >
              {sub}
            </p>
          )}
        </div>
        {icon && (
          <div className="ml-4 p-3 bg-gray-50 rounded-lg text-gray-600">
            {icon}
          </div>
        )}
      </div>
    </DashboardCard>
  );
}
