'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { DailyTotal } from '@/types';
import { formatDate } from '@/utils/helpers';

interface DailyTrendChartProps {
  data: DailyTotal[];
}

export default function DailyTrendChart({ data }: DailyTrendChartProps) {
  if (data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Daily CO₂ Trend
        </h2>
        <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
          No data to display
        </div>
      </div>
    );
  }

  const chartData = data.map(item => ({
    date: formatDate(item.date),
    total: Number(item.total.toFixed(2)),
    travel: Number(item.byCategory.travel.toFixed(2)),
    energy: Number(item.byCategory.energy.toFixed(2)),
    food: Number(item.byCategory.food.toFixed(2)),
  }));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Daily CO₂ Trend
      </h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-700" />
            <XAxis 
              dataKey="date" 
              className="text-gray-600 dark:text-gray-400"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              className="text-gray-600 dark:text-gray-400"
              tick={{ fontSize: 12 }}
              label={{ value: 'kg CO₂', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
              formatter={(value: number) => [`${value} kg CO₂`, '']}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="total" 
              stroke="#22c55e" 
              strokeWidth={3}
              name="Total"
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="travel" 
              stroke="#3b82f6" 
              strokeWidth={2}
              name="Travel"
              dot={{ r: 3 }}
            />
            <Line 
              type="monotone" 
              dataKey="energy" 
              stroke="#f59e0b" 
              strokeWidth={2}
              name="Energy"
              dot={{ r: 3 }}
            />
            <Line 
              type="monotone" 
              dataKey="food" 
              stroke="#10b981" 
              strokeWidth={2}
              name="Food"
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
