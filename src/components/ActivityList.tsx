'use client';

import { Activity } from '@/types';
import { formatDate } from '@/utils/helpers';
import { CO2_FACTORS } from '@/constants/co2Factors';
import {
  CarIcon, BusIcon, PlaneIcon, LightningIcon,
  FlameIcon, MeatIcon, CheeseIcon, VegetableIcon, XIcon,
} from './Icons';

interface ActivityListProps {
  activities: Activity[];
  onRemoveActivity: (id: string) => void;
  loading?: boolean;
}

const ACTIVITY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  car:              CarIcon,
  public_transport: BusIcon,
  flight:           PlaneIcon,
  electricity:      LightningIcon,
  gas:              FlameIcon,
  meat:             MeatIcon,
  dairy:            CheeseIcon,
  vegetarian:       VegetableIcon,
};

const CATEGORY_CONFIG: Record<string, { label: string; pillClass: string; dotStyle: string }> = {
  travel: { label: 'Travel',  pillClass: 'pill-travel', dotStyle: 'bg-[var(--travel)]'  },
  energy: { label: 'Energy',  pillClass: 'pill-energy', dotStyle: 'bg-[var(--energy)]'  },
  food:   { label: 'Food',    pillClass: 'pill-food',   dotStyle: 'bg-[var(--food)]'    },
};

function SkeletonRows() {
  return (
    <div className="space-y-2.5">
      {[0,1,2].map(i => (
        <div key={i} className="flex items-center gap-3 p-3 rounded-xl">
          <div className="skeleton w-8 h-8 rounded-lg shrink-0" />
          <div className="flex-1 space-y-1.5">
            <div className="skeleton h-3 w-32" />
            <div className="skeleton h-2.5 w-20" />
          </div>
          <div className="skeleton h-4 w-16" />
        </div>
      ))}
    </div>
  );
}

export default function ActivityList({ activities, onRemoveActivity, loading = false }: ActivityListProps) {
  // Group by date, sorted newest first
  const grouped = activities.reduce<Record<string, Activity[]>>((acc, a) => {
    if (!acc[a.date]) acc[a.date] = [];
    acc[a.date].push(a);
    return acc;
  }, {});
  const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <div className="bg-[var(--bg-surface)] rounded-2xl shadow-card p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-sm font-semibold text-[var(--text-primary)]">Activity Log</h2>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            {activities.length === 0 ? 'No entries yet' : `${activities.length} total entr${activities.length === 1 ? 'y' : 'ies'}`}
          </p>
        </div>
      </div>

      {loading ? (
        <SkeletonRows />
      ) : activities.length === 0 ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center py-12 gap-3">
          <div className="w-12 h-12 rounded-full border-2 border-dashed border-[var(--border)] flex items-center justify-center">
            <svg className="w-5 h-5 text-[var(--text-muted)]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-[var(--text-secondary)]">Your log is empty</p>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">Add an activity above to start tracking</p>
          </div>
        </div>
      ) : (
        <div className="space-y-7 thin-scrollbar">
          {sortedDates.map(date => {
            const dateActivities = grouped[date];
            const dateTotal      = dateActivities.reduce((sum, a) => sum + a.co2, 0);
            const catConfig      = CATEGORY_CONFIG;

            return (
              <div key={date}>
                {/* Date group header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-4 rounded-full bg-[var(--border)]" />
                    <span className="text-xs font-semibold text-[var(--text-secondary)]">{formatDate(date)}</span>
                  </div>
                  <span className="metric-value text-xs font-semibold text-forest-600 dark:text-forest-400 bg-[var(--accent-subtle)] px-2 py-0.5 rounded-md">
                    {dateTotal.toFixed(2)} kg CO₂
                  </span>
                </div>

                {/* Activity rows */}
                <div className="space-y-1.5">
                  {dateActivities.map(activity => {
                    const factor  = CO2_FACTORS[activity.type];
                    const Icon    = ACTIVITY_ICONS[activity.type];
                    const catConf = catConfig[activity.category];

                    return (
                      <div
                        key={activity.id}
                        className="
                          group flex items-center gap-3 px-3 py-2.5 rounded-xl
                          bg-[var(--bg-subtle)] hover:bg-[var(--bg-surface)]
                          border border-transparent hover:border-[var(--border)]
                          transition-all duration-150
                        "
                      >
                        {/* Icon container */}
                        <div className="
                          w-8 h-8 rounded-lg shrink-0 flex items-center justify-center
                          bg-[var(--bg-surface)] border border-[var(--border)]
                          text-[var(--text-muted)]
                        ">
                          <Icon className="w-4 h-4" />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="text-sm font-medium text-[var(--text-primary)] truncate">
                              {factor.label}
                            </span>
                            <span className={`text-2xs font-semibold px-1.5 py-0.5 rounded-md ${catConf.pillClass}`}>
                              {catConf.label}
                            </span>
                          </div>
                          <span className="text-xs text-[var(--text-muted)]">
                            {activity.amount} {activity.unit}
                          </span>
                        </div>

                        {/* CO₂ value */}
                        <span className="metric-value text-sm font-semibold text-[var(--text-primary)] shrink-0">
                          {activity.co2.toFixed(2)}
                          <span className="text-xs font-normal text-[var(--text-muted)] ml-1">kg</span>
                        </span>

                        {/* Remove button â€” shows on hover */}
                        <button
                          onClick={() => onRemoveActivity(activity.id)}
                          className="
                            shrink-0 w-6 h-6 rounded-md flex items-center justify-center
                            text-[var(--text-muted)] hover:text-rose-500
                            hover:bg-rose-50 dark:hover:bg-rose-500/10
                            opacity-0 group-hover:opacity-100
                            transition-all duration-150
                          "
                          aria-label="Remove activity"
                        >
                          <XIcon className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

