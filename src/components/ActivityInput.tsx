'use client';

import { useState } from 'react';
import { Activity, ActivityType } from '@/types';
import { CO2_FACTORS } from '@/constants/co2Factors';
import { generateId, getTodayISO } from '@/utils/helpers';
import { calculateCO2 } from '@/utils/storage';
import { PlusIcon, ChevronDownIcon, InfoIcon } from './Icons';

interface ActivityInputProps {
  onAddActivity: (activity: Activity) => void;
}

const ACTIVITY_GROUPS = [
  {
    label: 'Travel',
    options: [
      { value: 'car',              label: 'Car' },
      { value: 'public_transport', label: 'Public Transport' },
      { value: 'flight',           label: 'Flight' },
    ],
  },
  {
    label: 'Energy',
    options: [
      { value: 'electricity', label: 'Electricity' },
      { value: 'gas',         label: 'Natural Gas' },
    ],
  },
  {
    label: 'Food',
    options: [
      { value: 'meat',        label: 'Meat Meal' },
      { value: 'dairy',       label: 'Dairy Products' },
      { value: 'vegetarian',  label: 'Vegetarian Meal' },
    ],
  },
] as const;

const inputClass = `
  w-full px-3 py-2.5 text-sm
  bg-[var(--bg-subtle)]
  text-[var(--text-primary)]
  border border-[var(--border)]
  rounded-lg input-ring
  placeholder:text-[var(--text-muted)]
  transition-colors duration-150
  focus:bg-[var(--bg-surface)]
`;

const labelClass = 'block text-xs font-semibold tracking-[0.06em] uppercase text-[var(--text-muted)] mb-1.5';

export default function ActivityInput({ onAddActivity }: ActivityInputProps) {
  const [selectedType, setSelectedType] = useState<ActivityType>('car');
  const [amount, setAmount]             = useState<string>('');
  const [date, setDate]                 = useState<string>(getTodayISO());

  const factor    = CO2_FACTORS[selectedType];
  const amountNum = parseFloat(amount);
  const preview   = !isNaN(amountNum) && amountNum > 0 ? calculateCO2(selectedType, amountNum) : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isNaN(amountNum) || amountNum <= 0) return;

    onAddActivity({
      id:       generateId(),
      date,
      category: factor.category,
      type:     selectedType,
      amount:   amountNum,
      unit:     factor.unit,
      co2:      calculateCO2(selectedType, amountNum),
    });
    setAmount('');
  };

  return (
    <div className="bg-[var(--bg-surface)] rounded-2xl shadow-card p-6 h-full flex flex-col">
      {/* Panel heading */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-[var(--text-primary)]">Log Activity</h2>
        <p className="text-xs text-[var(--text-muted)] mt-0.5">Record a new emission event</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 flex-1">
        {/* Date */}
        <div>
          <label className={labelClass} htmlFor="activity-date">Date</label>
          <input
            id="activity-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={inputClass}
            required
          />
        </div>

        {/* Activity type */}
        <div>
          <label className={labelClass} htmlFor="activity-type">Activity</label>
          <div className="relative">
            <select
              id="activity-type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as ActivityType)}
              className={`${inputClass} appearance-none pr-8 cursor-pointer`}
            >
              {ACTIVITY_GROUPS.map(group => (
                <optgroup key={group.label} label={group.label}>
                  {group.options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </optgroup>
              ))}
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
          </div>
        </div>

        {/* Amount */}
        <div>
          <label className={labelClass} htmlFor="activity-amount">
            Amount <span className="normal-case font-normal text-[var(--text-muted)]">({factor.unit})</span>
          </label>
          <input
            id="activity-amount"
            type="number"
            step="0.1"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={`0 ${factor.unit}`}
            className={inputClass}
            required
          />
          <p className="text-2xs text-[var(--text-muted)] mt-1.5 flex items-center gap-1">
            <InfoIcon className="w-3 h-3 shrink-0" />
            {factor.co2PerUnit} kg CO₂ per {factor.unit}
          </p>
        </div>

        {/* COâ‚‚ preview */}
        <div
          className={`
            rounded-xl px-4 py-3 border transition-all duration-200
            ${preview !== null
              ? 'bg-[var(--accent-subtle)] border-forest-200 dark:border-forest-800 opacity-100'
              : 'bg-[var(--bg-subtle)] border-[var(--border-subtle)] opacity-40 pointer-events-none'
            }
          `}
        >
          <p className="text-2xs font-semibold tracking-[0.08em] uppercase text-[var(--text-muted)] mb-1">
            Estimated emission
          </p>
          <p className="metric-value text-xl font-semibold text-[var(--text-primary)]">
            {preview !== null ? preview.toFixed(2) : '—'}
            <span className="text-sm font-normal text-[var(--text-muted)] ml-1">kg CO₂</span>
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!amount || isNaN(amountNum) || amountNum <= 0}
          className="
            mt-auto w-full flex items-center justify-center gap-2
            bg-forest-500 hover:bg-forest-600
            disabled:opacity-40 disabled:cursor-not-allowed
            text-white text-sm font-medium
            py-2.5 px-4 rounded-lg
            transition-colors duration-150
            focus:outline-none focus:ring-2 focus:ring-forest-500 focus:ring-offset-2
            focus:ring-offset-[var(--bg-surface)]
          "
        >
          <PlusIcon className="w-4 h-4" />
          Add to Log
        </button>
      </form>
    </div>
  );
}

