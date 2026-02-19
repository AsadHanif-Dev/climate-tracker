'use client';

import {
  AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { DailyTotal } from '@/types';
import { formatDate } from '@/utils/helpers';

interface DailyTrendChartProps {
  data: DailyTotal[];
  loading?: boolean;
}

// Muted analytical palette â€” no neon
const SERIES = [
  { key: 'travel', label: 'Travel',  stroke: '#5778a0', fill: '#5778a020' },
  { key: 'energy', label: 'Energy',  stroke: '#a67240', fill: '#a6724018' },
  { key: 'food',   label: 'Food',    stroke: '#2e8b5a', fill: '#2e8b5a15' },
] as const;

// Custom tooltip â€” clean card design
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const total = payload.reduce((s: number, p: any) => s + (p.value ?? 0), 0);
  return (
    <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl p-3 shadow-card-md min-w-[148px]">
      <p className="text-xs font-semibold text-[var(--text-muted)] mb-2">{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center justify-between gap-4 mb-1">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: p.stroke }} />
            <span className="text-xs text-[var(--text-secondary)]">{p.name}</span>
          </div>
          <span className="metric-value text-xs font-semibold text-[var(--text-primary)]">
            {(p.value as number).toFixed(2)}
          </span>
        </div>
      ))}
      <div className="mt-2 pt-2 border-t border-[var(--border)] flex justify-between">
        <span className="text-xs text-[var(--text-muted)]">Total</span>
        <span className="metric-value text-xs font-semibold text-[var(--text-primary)]">{total.toFixed(2)} kg</span>
      </div>
    </div>
  );
};

const AxisTick = (props: any) => {
  const { x, y, payload } = props;
  return (
    <text x={x} y={y + 12} textAnchor="middle" fontSize={11} fill="var(--text-muted)" fontFamily="inherit">
      {payload.value}
    </text>
  );
};

const YAxisTick = (props: any) => {
  const { x, y, payload } = props;
  return (
    <text x={x - 4} y={y + 4} textAnchor="end" fontSize={11} fill="var(--text-muted)" fontFamily="inherit">
      {payload.value}
    </text>
  );
};

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center h-56 gap-2">
    <div className="w-10 h-10 rounded-full border-2 border-dashed border-[var(--border)] flex items-center justify-center">
      <svg className="w-4 h-4 text-[var(--text-muted)]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path d="M3 17l5-5 4 4 9-10" /><path d="M14 6h7v7" />
      </svg>
    </div>
    <p className="text-xs text-[var(--text-muted)]">No trend data yet — add activities to build history</p>
  </div>
);

export default function DailyTrendChart({ data, loading = false }: DailyTrendChartProps) {
  if (loading) {
    return (
      <div className="bg-[var(--bg-surface)] rounded-2xl shadow-card p-6">
        <div className="skeleton h-3 w-36 mb-5" />
        <div className="skeleton h-64 w-full" />
      </div>
    );
  }

  // Trim to last 14 data points max â€” avoid overcrowded chart
  const trimmed = data.slice(-14);

  const chartData = trimmed.map(item => ({
    date:   formatDate(item.date),
    travel: Number(item.byCategory.travel.toFixed(3)),
    energy: Number(item.byCategory.energy.toFixed(3)),
    food:   Number(item.byCategory.food.toFixed(3)),
  }));

  return (
    <div className="bg-[var(--bg-surface)] rounded-2xl shadow-card p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-sm font-semibold text-[var(--text-primary)]">Emission Trend</h2>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">Daily CO₂ by category · last {trimmed.length} days</p>
        </div>
        {/* Series legend */}
        <div className="flex items-center gap-3">
          {SERIES.map(s => (
            <div key={s.key} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.stroke }} />
              <span className="text-xs text-[var(--text-muted)]">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {data.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 4, right: 4, left: -12, bottom: 0 }}
            >
              <defs>
                {SERIES.map(s => (
                  <linearGradient key={s.key} id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor={s.stroke} stopOpacity={0.15} />
                    <stop offset="100%" stopColor={s.stroke} stopOpacity={0.01} />
                  </linearGradient>
                ))}
              </defs>

              <CartesianGrid
                strokeDasharray="0"
                stroke="var(--border)"
                strokeOpacity={0.5}
                horizontal
                vertical={false}
              />

              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={<AxisTick />}
                interval="preserveStartEnd"
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={<YAxisTick />}
                width={40}
              />

              <Tooltip
                content={<CustomTooltip />}
                cursor={{ stroke: 'var(--border)', strokeWidth: 1 }}
              />

              {SERIES.map(s => (
                <Area
                  key={s.key}
                  type="monotone"
                  dataKey={s.key}
                  name={s.label}
                  stroke={s.stroke}
                  strokeWidth={1.5}
                  fill={`url(#grad-${s.key})`}
                  dot={false}
                  activeDot={{ r: 3, stroke: s.stroke, strokeWidth: 1.5, fill: 'var(--bg-surface)' }}
                  animationDuration={600}
                  animationEasing="ease-out"
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

