import { Activity, DailyTotal } from '@/types';
import { CO2_FACTORS } from '@/constants/co2Factors';
import { toDateKey } from '@/utils/helpers';

const STORAGE_KEY = 'climate_tracker_activities';

export const storage = {
  // Get all activities from localStorage
  getActivities: (): Activity[] => {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  },

  // Save activities to localStorage
  saveActivities: (activities: Activity[]): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },

  // Add a new activity
  addActivity: (activity: Activity): Activity[] => {
    const activities = storage.getActivities();
    const newActivities = [...activities, activity];
    storage.saveActivities(newActivities);
    return newActivities;
  },

  // Remove an activity by ID
  removeActivity: (id: string): Activity[] => {
    const activities = storage.getActivities();
    const newActivities = activities.filter(a => a.id !== id);
    storage.saveActivities(newActivities);
    return newActivities;
  },

  // Clear all activities
  clearActivities: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
  },
};

// Calculate CO2 for an activity
export const calculateCO2 = (type: string, amount: number): number => {
  const factor = CO2_FACTORS[type as keyof typeof CO2_FACTORS];
  if (!factor) return 0;
  return Number((factor.co2PerUnit * amount).toFixed(2));
};

// Get daily totals grouped by date
export const getDailyTotals = (activities: Activity[]): DailyTotal[] => {
  const dailyMap = new Map<string, DailyTotal>();

  activities.forEach(activity => {
    const existing = dailyMap.get(activity.date);
    if (existing) {
      existing.total += activity.co2;
      existing.byCategory[activity.category] += activity.co2;
    } else {
      dailyMap.set(activity.date, {
        date: activity.date,
        total: activity.co2,
        byCategory: {
          travel: activity.category === 'travel' ? activity.co2 : 0,
          energy: activity.category === 'energy' ? activity.co2 : 0,
          food: activity.category === 'food' ? activity.co2 : 0,
        },
      });
    }
  });

  return Array.from(dailyMap.values())
    .sort((a, b) => a.date.localeCompare(b.date));
};

// Get activities for a specific date
export const getActivitiesForDate = (
  activities: Activity[],
  date: string
): Activity[] => {
  return activities.filter(a => a.date === date);
};

// Get total CO2 for today
export const getTodayTotal = (activities: Activity[]): number => {
  const today = toDateKey(new Date());
  return getActivitiesForDate(activities, today)
    .reduce((sum, activity) => sum + activity.co2, 0);
};

// Get category totals for today
export const getTodayCategoryTotals = (activities: Activity[]) => {
  const today = toDateKey(new Date());
  const todayActivities = getActivitiesForDate(activities, today);
  
  const totals = {
    travel: 0,
    energy: 0,
    food: 0,
  };

  todayActivities.forEach(activity => {
    totals[activity.category] += activity.co2;
  });

  return totals;
};

/**
 * Returns exactly `days` calendar days ending today, oldest first, including
 * days with no activity as zero entries.
 *
 * Slicing the recorded days instead would sum whatever the last N *entries*
 * happened to be, so a 7-day total could silently span months of gaps and the
 * daily average would divide by the wrong denominator.
 */
export const getLastNDays = (activities: Activity[], days: number): DailyTotal[] => {
  const recorded = new Map(getDailyTotals(activities).map(d => [d.date, d]));
  const today = new Date();
  const window: DailyTotal[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const date = toDateKey(d);
    window.push(
      recorded.get(date) ?? {
        date,
        total: 0,
        byCategory: { travel: 0, energy: 0, food: 0 },
      }
    );
  }

  return window;
};

// Days inside the window that actually have logged activity.
export const countActiveDays = (window: DailyTotal[]): number =>
  window.filter(d => d.total > 0).length;
