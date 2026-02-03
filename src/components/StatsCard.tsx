'use client';

import { formatCO2 } from '@/utils/helpers';

interface StatsCardProps {
  title: string;
  value: number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  format?: 'co2' | 'number';
}

export default function StatsCard({ title, value, subtitle, icon, trend, format = 'co2' }: StatsCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {format === 'co2' ? formatCO2(value) : value}
          </p>
          {subtitle && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {subtitle}
            </p>
          )}
          {trend && (
            <div className="mt-2 flex items-center">
              <span className={`text-sm font-medium ${trend.isPositive ? 'text-red-600' : 'text-green-600'}`}>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value).toFixed(1)}%
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                vs last week
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div className="text-primary-600 dark:text-primary-400 opacity-50">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
