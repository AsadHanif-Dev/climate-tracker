'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { CATEGORY_COLORS, CATEGORY_LABELS } from '@/constants/co2Factors';

interface CategoryBreakdownProps {
  data: {
    travel: number;
    energy: number;
    food: number;
  };
}

export default function CategoryBreakdown({ data }: CategoryBreakdownProps) {
  const total = data.travel + data.energy + data.food;

  if (total === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Category Breakdown
        </h2>
        <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
          No data to display
        </div>
      </div>
    );
  }

  const chartData = [
    { name: CATEGORY_LABELS.travel, value: Number(data.travel.toFixed(2)), color: CATEGORY_COLORS.travel },
    { name: CATEGORY_LABELS.energy, value: Number(data.energy.toFixed(2)), color: CATEGORY_COLORS.energy },
    { name: CATEGORY_LABELS.food, value: Number(data.food.toFixed(2)), color: CATEGORY_COLORS.food },
  ].filter(item => item.value > 0);

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="font-semibold text-sm"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Today&apos;s Category Breakdown
      </h2>
      {/* Debug info - can be removed in production */}
      <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
        Travel: {data.travel.toFixed(2)} | Energy: {data.energy.toFixed(2)} | Food: {data.food.toFixed(2)} kg CO₂
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => `${value.toFixed(2)} kg CO₂`}
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4">
        {chartData.map((item) => (
          <div key={item.name} className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {item.name}
              </span>
            </div>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {item.value.toFixed(2)} kg
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {((item.value / total) * 100).toFixed(0)}% of total
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
