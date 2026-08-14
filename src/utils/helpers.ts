/**
 * Canonical date key (YYYY-MM-DD) for a Date, in the user's *local* calendar.
 *
 * `toISOString()` converts to UTC first, so anyone east or west of UTC gets the
 * wrong day for part of every day. At UTC+5 an entry logged at 02:00 would be
 * filed under yesterday, and it would never show up in "Today".
 */
export const toDateKey = (date: Date): string => {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return local.toISOString().split('T')[0];
};

/** Parse a YYYY-MM-DD key back into a Date at local midnight. */
export const fromDateKey = (dateKey: string): Date => {
  const [year, month, day] = dateKey.split('-').map(Number);
  return new Date(year, month - 1, day);
};

// Format date to readable string
export const formatDate = (dateString: string): string => {
  // Parsed as local midnight; `new Date('2026-08-14')` would be UTC midnight
  // and render as the previous day for anyone behind UTC.
  return fromDateKey(dateString).toLocaleDateString('en-GB', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

/** Short label for chart axes, e.g. "14 Aug". */
export const formatDateShort = (dateString: string): string =>
  fromDateKey(dateString).toLocaleDateString('en-GB', {
    month: 'short',
    day: 'numeric',
  });

// Format CO2 value with kg unit
export const formatCO2 = (value: number): string => {
  return `${value.toFixed(2)} kg CO₂`;
};

// Get today's date as a local ISO date key
export const getTodayISO = (): string => toDateKey(new Date());

// Generate unique ID
export const generateId = (): string =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
