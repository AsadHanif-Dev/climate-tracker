'use client';

import { useState, useEffect } from 'react';
import { Activity } from '@/types';
import { storage, getDailyTotals, getTodayTotal, getTodayCategoryTotals, getLastNDays } from '@/utils/storage';
import ActivityInput from '@/components/ActivityInput';
import ActivityList from '@/components/ActivityList';
import DailyTrendChart from '@/components/DailyTrendChart';
import CategoryBreakdown from '@/components/CategoryBreakdown';
import StatsCard from '@/components/StatsCard';
import ThemeToggle from '@/components/ThemeToggle';
import { CalendarIcon, ChartBarIcon, TrendingUpIcon, ListIcon, GlobeIcon, LeafIcon } from '@/components/Icons';

export default function Home() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedActivities = storage.getActivities();
    setActivities(savedActivities);
  }, []);

  const handleAddActivity = (activity: Activity) => {
    const newActivities = storage.addActivity(activity);
    setActivities(newActivities);
  };

  const handleRemoveActivity = (id: string) => {
    const newActivities = storage.removeActivity(id);
    setActivities(newActivities);
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all activities? This action cannot be undone.')) {
      storage.clearActivities();
      setActivities([]);
    }
  };

  // Calculate statistics
  const todayTotal = mounted ? getTodayTotal(activities) : 0;
  const todayCategoryTotals = mounted ? getTodayCategoryTotals(activities) : { travel: 0, energy: 0, food: 0 };
  const last7Days = mounted ? getLastNDays(activities, 7) : [];
  const last30Days = mounted ? getLastNDays(activities, 30) : [];
  
  const weekTotal = last7Days.reduce((sum, day) => sum + day.total, 0);
  const monthTotal = last30Days.reduce((sum, day) => sum + day.total, 0);
  const weeklyAverage = last7Days.length > 0 ? weekTotal / last7Days.length : 0;

  // Don't render content until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-primary-600 dark:text-primary-400">
                <GlobeIcon className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  Climate Impact Tracker
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Monitor your daily CO₂ footprint in real-time
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {activities.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                >
                  Clear All
                </button>
              )}
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Today's Total"
            value={todayTotal}
            icon={<CalendarIcon className="w-8 h-8" />}
            subtitle="Current day emissions"
          />
          <StatsCard
            title="7-Day Total"
            value={weekTotal}
            icon={<ChartBarIcon className="w-8 h-8" />}
            subtitle={`Avg: ${weeklyAverage.toFixed(2)} kg/day`}
          />
          <StatsCard
            title="30-Day Total"
            value={monthTotal}
            icon={<TrendingUpIcon className="w-8 h-8" />}
            subtitle="Last month emissions"
          />
          <StatsCard
            title="Total Activities"
            value={activities.length}
            subtitle={`${last7Days.length} days tracked`}
            icon={<ListIcon className="w-8 h-8" />}
            format="number"
          />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Input Form */}
          <div className="lg:col-span-1">
            <ActivityInput onAddActivity={handleAddActivity} />
          </div>

          {/* Charts */}
          <div className="lg:col-span-2 space-y-6">
            <CategoryBreakdown data={todayCategoryTotals} />
            <DailyTrendChart data={last30Days} />
          </div>
        </div>

        {/* Activity List */}
        <ActivityList activities={activities} onRemoveActivity={handleRemoveActivity} />
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <p className="mb-2 flex items-center justify-center gap-2">
              <LeafIcon className="w-4 h-4 text-primary-600" />
              Track your carbon footprint and make a difference for our planet
            </p>
            <p className="text-xs">
              CO₂ emission factors are approximate values based on industry averages
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
