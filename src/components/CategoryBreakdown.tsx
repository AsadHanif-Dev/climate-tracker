'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface CategoryBreakdownProps {
  data: {
    travel: number;
    energy: number;
    food: number;
  };
  loading?: boolean;
}

// Muted, desaturated palette â€” no neon
const CATEGORIES = [
  { key: 'travel', label: 'Travel',  color: 'var(--travel)', bar: '#5778a0' },
  { key: 'energy', label: 'Energy',  color: 'var(--energy)', bar: '#a67240' },
  { key: 'food',   label: 'Food',    color: 'var(--food)',   bar: '#2e8b5a' },
] as const;

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg px-3 py-2 shadow-card-md">
      <p className="text-xs font-semibold text-[var(--text-primary)]">{d.name}</p>
      <p className="metric-value text-sm text-[var(--text-secondary)] mt-0.5">
        {d.value.toFixed(2)} <span className="text-xs text-[var(--text-muted)]">kg CO₂</span>
      </p>
    </div>
  );
};

const EmptyState = ({ label }: { label: string }) => (
  <div className="flex flex-col items-center justify-center h-36 gap-2">
    <div className="w-10 h-10 rounded-full border-2 border-dashed border-[var(--border)] flex items-center justify-center">
      <svg className="w-4 h-4 text-[var(--text-muted)]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" /><path d="M12 8v4l2 2" />
      </svg>
    </div>
    <p className="text-xs text-[var(--text-muted)]">{label}</p>
  </div>
);

export default function CategoryBreakdown({ data, loading = false }: CategoryBreakdownProps) {
  const total = data.travel + data.energy + data.food;

  const chartData = CATEGORIES.map(cat => ({
    name:  cat.label,
    value: Number(data[cat.key].toFixed(3)),
    color: cat.bar,
  })).filter(d => d.value > 0);

  if (loading) {
    return (
      <div className="bg-[var(--bg-surface)] rounded-2xl shadow-card p-6">
        <div className="skeleton h-3 w-40 mb-5" />
        <div className="skeleton h-40 w-full mb-4" />
        <div className="grid grid-cols-3 gap-3">
          {[0,1,2].map(i => <div key={i} className="skeleton h-14" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--bg-surface)] rounded-2xl shadow-card p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-sm font-semibold text-[var(--text-primary)]">Today's Breakdown</h2>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">Emissions by category</p>
        </div>
        {total > 0 && (
          <span className="metric-value text-xs font-semibold text-[var(--text-secondary)] bg-[var(--bg-subtle)] border border-[var(--border)] px-2.5 py-1 rounded-full">
            {total.toFixed(2)} kg total
          </span>
        )}
      </div>

      {total === 0 ? (
        <EmptyState label="No activities logged today" />
      ) : (
        <>
          {/* Donut chart */}
          <div className="h-40 mb-5">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={44}
                  outerRadius={68}
                  paddingAngle={3}
                  dataKey="value"
                  strokeWidth={0}
                  animationBegin={0}
                  animationDuration={600}
                  animationEasing="ease-out"
                >
                  {chartData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Category legend rows */}
          <div className="space-y-2.5">
            {CATEGORIES.filter(cat => data[cat.key] > 0).map(cat => {
              const val  = data[cat.key];
              const pct  = total > 0 ? (val / total) * 100 : 0;
              return (
                <div key={cat.key} className="flex items-center gap-3">
                  {/* Color dot */}
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: cat.bar }}
                  />
                  {/* Label */}
                  <span className="text-xs text-[var(--text-secondary)] w-14 shrink-0">{cat.label}</span>
                  {/* Progress bar */}
                  <div className="flex-1 h-1.5 bg-[var(--bg-subtle)] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, backgroundColor: cat.bar }}
                    />
                  </div>
                  {/* Values */}
                  <div className="flex items-baseline gap-1 shrink-0">
                    <span className="metric-value text-xs font-semibold text-[var(--text-primary)]">{val.toFixed(2)}</span>
                    <span className="text-2xs text-[var(--text-muted)]">kg</span>
                    <span className="text-2xs text-[var(--text-muted)] ml-0.5">({pct.toFixed(0)}%)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

