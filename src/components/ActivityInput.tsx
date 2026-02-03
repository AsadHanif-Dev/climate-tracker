'use client';

import { useState } from 'react';
import { Activity, ActivityType } from '@/types';
import { CO2_FACTORS } from '@/constants/co2Factors';
import { generateId, getTodayISO, formatCO2 } from '@/utils/helpers';
import { calculateCO2 } from '@/utils/storage';

interface ActivityInputProps {
  onAddActivity: (activity: Activity) => void;
}

export default function ActivityInput({ onAddActivity }: ActivityInputProps) {
  const [selectedType, setSelectedType] = useState<ActivityType>('car');
  const [amount, setAmount] = useState<string>('');
  const [date, setDate] = useState<string>(getTodayISO());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    const factor = CO2_FACTORS[selectedType];
    const co2 = calculateCO2(selectedType, amountNum);

    const newActivity: Activity = {
      id: generateId(),
      date,
      category: factor.category,
      type: selectedType,
      amount: amountNum,
      unit: factor.unit,
      co2,
    };

    onAddActivity(newActivity);
    setAmount('');
  };

  const factor = CO2_FACTORS[selectedType];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Add Activity
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Date Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        {/* Activity Type Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Activity Type
          </label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as ActivityType)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
          >
            <optgroup label="Travel">
              <option value="car">� Car</option>
              <option value="public_transport">🚇 Public Transport</option>
              <option value="flight">✈️ Flight</option>
            </optgroup>
            <optgroup label="Energy">
              <option value="electricity">💡 Electricity</option>
              <option value="gas">🔥 Natural Gas</option>
            </optgroup>
            <optgroup label="Food">
              <option value="meat">🍖 Meat Meal</option>
              <option value="dairy">🥛 Dairy Products</option>
              <option value="vegetarian">🥗 Vegetarian Meal</option>
            </optgroup>
          </select>
        </div>

        {/* Amount Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Amount ({factor.unit})
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={`Enter ${factor.unit}`}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
            required
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {factor.co2PerUnit} kg CO₂ per {factor.unit}
          </p>
        </div>

        {/* CO2 Preview */}
        {amount && !isNaN(parseFloat(amount)) && parseFloat(amount) > 0 && (
          <div className="bg-primary-50 dark:bg-primary-900/20 p-3 rounded-md">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Estimated CO₂: <span className="font-bold text-primary-600 dark:text-primary-400">
                {formatCO2(calculateCO2(selectedType, parseFloat(amount)))}
              </span>
            </p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Add Activity
        </button>
      </form>
    </div>
  );
}
