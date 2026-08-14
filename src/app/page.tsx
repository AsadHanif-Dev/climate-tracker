'use client';

import { useState, useEffect } from 'react';
import { Activity } from '@/types';
import {
  storage,
  getTodayTotal,
  getTodayCategoryTotals,
  getLastNDays,
  countActiveDays,
} from '@/utils/storage';
import { generateDemoActivities } from '@/utils/demoData';
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

/* ── Skeleton cards for initial load ───────────────────────────────────── */
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

const DEMO_DISMISSED_KEY = 'climate_tracker_demo_dismissed';

export default function Home() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [mounted, setMounted]       = useState(false);
  const [isDemo, setIsDemo]         = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = storage.getActivities();

    if (stored.length > 0) {
      setActivities(stored);
      return;
    }

    // An empty dashboard reads as a broken app, so a first-time visitor gets a
    // sample footprint instead of four zeroes and two empty charts. It stays in
    // memory only, and never once they have chosen to start fresh.
    const dismissed =
      typeof window !== 'undefined' &&
      window.localStorage.getItem(DEMO_DISMISSED_KEY) === '1';

    if (!dismissed) {
      setActivities(generateDemoActivities(30));
      setIsDemo(true);
    }
  }, []);

  const dismissDemo = () => {
    setIsDemo(false);
    try {
      window.localStorage.setItem(DEMO_DISMISSED_KEY, '1');
    } catch {
      /* storage unavailable (private mode); demo simply returns next visit */
    }
  };

  const handleAddActivity = (activity: Activity) => {
    // The first real entry replaces the sample set rather than merging into it,
    // so a real log can never be polluted with generated data.
    if (isDemo) {
      dismissDemo();
      storage.saveActivities([activity]);
      setActivities([activity]);
      return;
    }
    setActivities(storage.addActivity(activity));
  };

  const handleRemoveActivity = (id: string) => {
    if (isDemo) {
      setActivities(prev => prev.filter(a => a.id !== id));
      return;
    }
    setActivities(storage.removeActivity(id));
  };

  const handleClearAll = () => {
    if (isDemo) {
      dismissDemo();
      setActivities([]);
      return;
    }
    if (confirm('Clear all activities? This cannot be undone.')) {
      storage.clearActivities();
      setActivities([]);
    }
  };

  const handleLoadDemo = () => {
    setActivities(generateDemoActivities(30));
    setIsDemo(true);
    try {
      window.localStorage.removeItem(DEMO_DISMISSED_KEY);
    } catch {
      /* no-op */
    }
  };

  /* ── Derived stats ──────────────────────────────────────────────────── */
  const todayTotal         = mounted ? getTodayTotal(activities) : 0;
  const todayCategories    = mounted ? getTodayCategoryTotals(activities) : { travel: 0, energy: 0, food: 0 };
  const last7Days          = mounted ? getLastNDays(activities, 7)  : [];
  const last30Days         = mounted ? getLastNDays(activities, 30) : [];
  const weekTotal          = last7Days.reduce((s, d) => s + d.total, 0);
  const monthTotal         = last30Days.reduce((s, d) => s + d.total, 0);
  // The window is always exactly 7 days, so this is a true daily average
  // rather than an average across only the days that happen to have entries.
  const weeklyAvg          = weekTotal / 7;
  const totalEntries       = activities.length;
  const activeDays         = countActiveDays(last30Days);

  // Week-over-week change: this week's total against the seven days before it.
  const last14Days   = mounted ? getLastNDays(activities, 14) : [];
  const priorWeek    = last14Days.slice(0, 7).reduce((s, d) => s + d.total, 0);
  const weekTrend    =
    priorWeek > 0
      ? { value: ((weekTotal - priorWeek) / priorWeek) * 100, isPositive: weekTotal > priorWeek }
      : undefined;

  /* ── Layout ─────────────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-[var(--bg-page)] flex flex-col">

      {/* ── Header ───────────────────────────────────────────────────── */}
      <header className="bg-[var(--bg-surface)] border-b border-[var(--border)] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-14 flex items-center justify-between gap-4">

          {/* Brand */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Brand mark — simple circle with globe lines */}
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

      {/* ── Main ─────────────────────────────────────────────────────── */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 lg:px-8 py-8 space-y-6">

        {/* ── Page title ─────────────────────────────────────────────── */}
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

        {/* ── Metric cards ───────────────────────────────────────────── */}
        {mounted && isDemo && (
          <div
            role="status"
            className="
              flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4
              rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] px-4 py-3
            "
          >
            <span className="
              shrink-0 self-start sm:self-auto rounded-md bg-forest-500/10
              px-2 py-0.5 text-2xs font-semibold uppercase tracking-wide
              text-forest-600 dark:text-forest-400
            ">
              Sample data
            </span>
            <p className="flex-1 text-xs text-[var(--text-muted)]">
              These 30 days are generated so the charts have something to show.
              Nothing is saved until you log your own activity.
            </p>
            <button
              onClick={handleClearAll}
              className="
                shrink-0 self-start sm:self-auto rounded-lg border border-[var(--border)]
                px-3 py-1.5 text-xs font-medium text-[var(--text-primary)]
                hover:border-forest-500 hover:text-forest-600 dark:hover:text-forest-400
                transition-colors duration-150
              "
            >
              Start with an empty log
            </button>
          </div>
        )}

        {mounted && !isDemo && activities.length === 0 && (
          <div
            role="status"
            className="
              flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4
              rounded-xl border border-dashed border-[var(--border)] px-4 py-3
            "
          >
            <p className="flex-1 text-xs text-[var(--text-muted)]">
              Your log is empty. Add an activity on the left to start tracking.
            </p>
            <button
              onClick={handleLoadDemo}
              className="
                shrink-0 self-start sm:self-auto rounded-lg border border-[var(--border)]
                px-3 py-1.5 text-xs font-medium text-[var(--text-primary)]
                hover:border-forest-500 hover:text-forest-600 dark:hover:text-forest-400
                transition-colors duration-150
              "
            >
              Show sample data
            </button>
          </div>
        )}

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
                trend={weekTrend}
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
                subtitle={`Across ${activeDays} active ${activeDays === 1 ? 'day' : 'days'}`}
                accentColor="forest"
              />
            </>
          )}
        </section>

        {/* ── Body grid ──────────────────────────────────────────────── */}
        {/*
          Layout:
          ┌──────────────────┬──────────────────────────────────┐
          │  Log Activity    │  Category Breakdown              │
          │  (form panel)    ├──────────────────────────────────┤
          │                  │  Emission Trend (area chart)     │
          └──────────────────┴──────────────────────────────────┘
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

        {/* ── Activity log ───────────────────────────────────────────── */}
        <section aria-label="Activity log">
          <ActivityList
            activities={activities}
            onRemoveActivity={handleRemoveActivity}
            loading={!mounted}
          />
        </section>
      </main>

      {/* ── Footer ───────────────────────────────────────────────────── */}
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


