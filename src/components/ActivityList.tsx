'use client';

import { Activity } from '@/types';
import { formatDate, formatCO2 } from '@/utils/helpers';
import { CO2_FACTORS } from '@/constants/co2Factors';
import { CarIcon, BusIcon, PlaneIcon, LightningIcon, FlameIcon, MeatIcon, CheeseIcon, VegetableIcon } from './Icons';

interface ActivityListProps {
  activities: Activity[];
  onRemoveActivity: (id: string) => void;
}

const activityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  car: CarIcon,
  public_transport: BusIcon,
  flight: PlaneIcon,
  electricity: LightningIcon,
  gas: FlameIcon,
  meat: MeatIcon,
  dairy: CheeseIcon,
  vegetarian: VegetableIcon,
};

export default function ActivityList({ activities, onRemoveActivity }: ActivityListProps) {
  if (activities.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Activity Log
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          No activities recorded yet. Add your first activity to get started!
        </p>
      </div>
    );
  }

  // Group activities by date
  const groupedActivities = activities.reduce((acc, activity) => {
    if (!acc[activity.date]) {
      acc[activity.date] = [];
    }
    acc[activity.date].push(activity);
    return acc;
  }, {} as Record<string, Activity[]>);

  // Sort dates in descending order
  const sortedDates = Object.keys(groupedActivities).sort((a, b) => b.localeCompare(a));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Activity Log
      </h2>
      
      <div className="space-y-6">
        {sortedDates.map(date => {
          const dateActivities = groupedActivities[date];
          const dateTotal = dateActivities.reduce((sum, a) => sum + a.co2, 0);

          return (
            <div key={date} className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-4 last:pb-0">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {formatDate(date)}
                </h3>
                <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                  Total: {formatCO2(dateTotal)}
                </span>
              </div>

              <div className="space-y-2">
                {dateActivities.map(activity => {
                  const factor = CO2_FACTORS[activity.type];
                  const IconComponent = activityIcons[activity.type];
                  return (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="text-primary-600 dark:text-primary-400">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {factor.label}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {activity.amount} {activity.unit}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500">
                            Category: {activity.category}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {formatCO2(activity.co2)}
                        </span>
                        <button
                          onClick={() => onRemoveActivity(activity.id)}
                          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                          aria-label="Remove activity"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
