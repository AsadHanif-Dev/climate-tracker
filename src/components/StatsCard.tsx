'use client';

import { formatCO2 } from '@/utils/helpers';
import { TrendingUpIcon, TrendingDownIcon } from './Icons';

interface StatsCardProps {
  title: string;
  value: number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean; // true = emissions went UP (bad)
  };
  format?: 'co2' | 'number';
  accentColor?: 'forest' | 'slate' | 'ember';
  loading?: boolean;
}

const accentMap = {
  forest: 'border-forest-500',
  slate:  'border-slate-500',
  ember:  'border-ember-500',
};

export default function StatsCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  format = 'co2',
  accentColor = 'forest',
  loading = false,
}: StatsCardProps) {
  const accentBorder = accentMap[accentColor] ?? accentMap.forest;

  if (loading) {
    return (
      <div className={`bg-[var(--bg-surface)] rounded-2xl shadow-card border-l-2 ${accentBorder} p-6 animate-pulse-slow`}>
        <div className="skeleton h-3 w-20 mb-4" />
        <div className="skeleton h-8 w-28 mb-2" />
        <div className="skeleton h-3 w-16" />
      </div>
    );
  }

  return (
    <div className={`bg-[var(--bg-surface)] rounded-2xl shadow-card border-l-2 ${accentBorder} p-6 transition-shadow hover:shadow-card-md`}>
      {/* Header row */}
      <div className="flex items-start justify-between mb-4">
        <span className="text-2xs font-semibold tracking-[0.1em] uppercase text-[var(--text-muted)]">
          {title}
        </span>
        {icon && (
          <span className="text-[var(--text-muted)] opacity-60 shrink-0">
            {icon}
          </span>
        )}
      </div>

      {/* Metric value */}
      <p className="metric-value text-[2rem] font-semibold leading-none tracking-tight text-[var(--text-primary)] mb-1">
        {format === 'co2'
          ? <>{value.toFixed(2)}<span className="text-base font-normal text-[var(--text-muted)] ml-1.5">kg CO₂</span></>
          : value
        }
      </p>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-xs text-[var(--text-muted)] mt-1.5 leading-relaxed">
          {subtitle}
        </p>
      )}

      {/* Trend indicator */}
      {trend && (
        <div className={`flex items-center gap-1 mt-3 text-xs font-medium ${trend.isPositive ? 'text-rose-500 dark:text-rose-400' : 'text-forest-600 dark:text-forest-400'}`}>
          {trend.isPositive
            ? <TrendingUpIcon className="w-3.5 h-3.5" />
            : <TrendingDownIcon className="w-3.5 h-3.5" />
          }
          <span>{Math.abs(trend.value).toFixed(1)}%</span>
          <span className="text-[var(--text-muted)] font-normal">vs last week</span>
        </div>
      )}
    </div>
  );
}

