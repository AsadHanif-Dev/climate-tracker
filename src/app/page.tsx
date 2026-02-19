'use client';

import { useState, useEffect } from 'react';
import { Activity } from '@/types';
import {
  storage,
  getTodayTotal,
  getTodayCategoryTotals,
  getLastNDays,
} from '@/utils/storage';
import ActivityInput     from '@/components/ActivityInput';
import ActivityList      from '@/components/ActivityList';
import DailyTrendChart   from '@/components/DailyTrendChart';
import CategoryBreakdown from '@/components/CategoryBreakdown';
import StatsCard         from '@/components/StatsCard';
import ThemeToggle       from '@/components/ThemeToggle';
import {
  CalendarIcon,
  ChartBarIcon,
  TrendingUpIcon,
  ListIcon,
  GlobeIcon,
  TrashIcon,
} from '@/components/Icons';

/* â”€â”€ Skeleton cards for initial load â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function SkeletonCards() {
  return (
    <>
      {[0, 1, 2, 3].map(i => (
        <div key={i} className="bg-[var(--bg-surface)] rounded-2xl shadow-card border-l-2 border-forest-500/30 p-6">
          <div className="skeleton h-2.5 w-20 mb-5" />
          <div className="skeleton h-8 w-28 mb-2" />
          <div className="skeleton h-2.5 w-16" />
        </div>
      ))}
    </>
  );
}

export default function Home() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [mounted, setMounted]       = useState(false);

  useEffect(() => {
    setMounted(true);
    setActivities(storage.getActivities());
  }, []);

  const handleAddActivity = (activity: Activity) => {
    setActivities(storage.addActivity(activity));
  };

  const handleRemoveActivity = (id: string) => {
    setActivities(storage.removeActivity(id));
  };

  const handleClearAll = () => {
    if (confirm('Clear all activities? This cannot be undone.')) {
      storage.clearActivities();
      setActivities([]);
    }
  };

  /* â”€â”€ Derived stats â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  const todayTotal         = mounted ? getTodayTotal(activities) : 0;
  const todayCategories    = mounted ? getTodayCategoryTotals(activities) : { travel: 0, energy: 0, food: 0 };
  const last7Days          = mounted ? getLastNDays(activities, 7)  : [];
  const last30Days         = mounted ? getLastNDays(activities, 30) : [];
  const weekTotal          = last7Days.reduce((s, d) => s + d.total, 0);
  const monthTotal         = last30Days.reduce((s, d) => s + d.total, 0);
  const weeklyAvg          = last7Days.length > 0 ? weekTotal / last7Days.length : 0;
  const totalEntries       = activities.length;

  /* â”€â”€ Layout â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  return (
    <div className="min-h-screen bg-[var(--bg-page)] flex flex-col">

      {/* â”€â”€ Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <header className="bg-[var(--bg-surface)] border-b border-[var(--border)] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-14 flex items-center justify-between gap-4">

          {/* Brand */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Brand mark â€” simple circle with globe lines */}
            <div className="w-7 h-7 rounded-lg bg-forest-500 flex items-center justify-center shrink-0">
              <GlobeIcon className="w-[15px] h-[15px] text-white" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-semibold text-[var(--text-primary)] tracking-tight">
                Climate Tracker
              </span>
              <span className="hidden sm:block text-2xs font-medium text-[var(--text-muted)] tracking-wide uppercase">
                CO₂ Dashboard
              </span>
            </div>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {mounted && activities.length > 0 && (
              <button
                onClick={handleClearAll}
                className="
                  hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg
                  text-xs font-medium text-[var(--text-muted)]
                  hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10
                  border border-[var(--border)] transition-all duration-150
                "
                aria-label="Clear all activities"
              >
                <TrashIcon className="w-3.5 h-3.5" />
                Clear all
              </button>
            )}
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* â”€â”€ Main â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 lg:px-8 py-8 space-y-6">

        {/* â”€â”€ Page title â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-xl font-semibold text-[var(--text-primary)] tracking-tight">
              Emissions Overview
            </h1>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              Personal CO₂ footprint · updated in real-time
            </p>
          </div>
          {mounted && (
            <span className="text-2xs font-medium text-[var(--text-muted)] tabular-nums">
              {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          )}
        </div>

        {/* â”€â”€ Metric cards â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4" aria-label="Key metrics">
          {!mounted ? (
            <SkeletonCards />
          ) : (
            <>
              <StatsCard
                title="Today"
                value={todayTotal}
                icon={<CalendarIcon className="w-[15px] h-[15px]" />}
                subtitle="Current day emissions"
                accentColor="forest"
              />
              <StatsCard
                title="7-Day Total"
                value={weekTotal}
                icon={<ChartBarIcon className="w-[15px] h-[15px]" />}
                subtitle={`${weeklyAvg.toFixed(2)} kg avg / day`}
                accentColor="slate"
              />
              <StatsCard
                title="30-Day Total"
                value={monthTotal}
                icon={<TrendingUpIcon className="w-[15px] h-[15px]" />}
                subtitle="Rolling month"
                accentColor="ember"
              />
              <StatsCard
                title="Logged Events"
                value={totalEntries}
                format="number"
                icon={<ListIcon className="w-[15px] h-[15px]" />}
                subtitle={`Across ${last30Days.length} tracked days`}
                accentColor="forest"
              />
            </>
          )}
        </section>

        {/* â”€â”€ Body grid â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        {/*
          Layout:
          â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
          â”‚  Log Activity    â”‚  Category Breakdown              â”‚
          â”‚  (form panel)    â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
          â”‚                  â”‚  Emission Trend (area chart)     â”‚
          â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
        */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start" aria-label="Main panels">
          {/* Left: form */}
          <div className="lg:col-span-1">
            <ActivityInput onAddActivity={handleAddActivity} />
          </div>

          {/* Right: charts stacked */}
          <div className="lg:col-span-2 space-y-5">
            <CategoryBreakdown data={todayCategories} loading={!mounted} />
            <DailyTrendChart   data={last30Days}       loading={!mounted} />
          </div>
        </section>

        {/* â”€â”€ Activity log â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <section aria-label="Activity log">
          <ActivityList
            activities={activities}
            onRemoveActivity={handleRemoveActivity}
            loading={!mounted}
          />
        </section>
      </main>

      {/* â”€â”€ Footer â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <footer className="border-t border-[var(--border)] bg-[var(--bg-surface)] mt-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
            <div className="w-1.5 h-1.5 rounded-full bg-forest-500" />
            <span>Emission factors are approximate industry averages</span>
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            Climate Impact Tracker · {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}


