import { Activity, ActivityType } from '@/types';
import { CO2_FACTORS } from '@/constants/co2Factors';
import { toDateKey } from '@/utils/helpers';
import { calculateCO2 } from '@/utils/storage';

/**
 * A representative 30-day footprint, used to populate the dashboard on a first
 * visit so the charts have something to show.
 *
 * This data is held in memory only and is never written to localStorage, so it
 * cannot be mistaken for, or mixed into, a real log. Adding a real entry drops
 * it entirely.
 */

// Small deterministic PRNG (mulberry32) so the sample set is stable between
// renders and reloads rather than reshuffling on every mount.
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const DEMO_SEED = 20260814;

function entry(
  rand: () => number,
  date: string,
  type: ActivityType,
  amount: number,
  index: number
): Activity {
  const factor = CO2_FACTORS[type];
  const rounded = Number(amount.toFixed(1));
  return {
    id: `demo-${date}-${index}-${Math.floor(rand() * 1e6)}`,
    date,
    category: factor.category,
    type,
    amount: rounded,
    unit: factor.unit,
    co2: calculateCO2(type, rounded),
  };
}

export function generateDemoActivities(days = 30): Activity[] {
  const rand = mulberry32(DEMO_SEED);
  const activities: Activity[] = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const date = toDateKey(d);
    const weekday = d.getDay() !== 0 && d.getDay() !== 6;
    let n = 0;

    // Commute: mostly car on weekdays, public transport otherwise.
    if (weekday) {
      if (rand() < 0.65) {
        activities.push(entry(rand, date, 'car', 14 + rand() * 18, n++));
      } else {
        activities.push(entry(rand, date, 'public_transport', 18 + rand() * 22, n++));
      }
    } else if (rand() < 0.5) {
      activities.push(entry(rand, date, 'car', 8 + rand() * 25, n++));
    }

    // Household electricity, every day.
    activities.push(entry(rand, date, 'electricity', 4.5 + rand() * 6, n++));

    // Heating, on roughly half the days.
    if (rand() < 0.45) {
      activities.push(entry(rand, date, 'gas', 6 + rand() * 12, n++));
    }

    // Meals: two or three a day, weighted towards plant-based.
    const meals = 2 + (rand() < 0.4 ? 1 : 0);
    for (let m = 0; m < meals; m++) {
      const roll = rand();
      const type: ActivityType =
        roll < 0.3 ? 'meat' : roll < 0.55 ? 'dairy' : 'vegetarian';
      activities.push(entry(rand, date, type, 1, n++));
    }
  }

  // One long-haul trip, placed mid-window so the trend chart has a clear spike.
  const flightDay = new Date(today);
  flightDay.setDate(flightDay.getDate() - Math.floor(days / 2));
  activities.push(entry(rand, toDateKey(flightDay), 'flight', 1180, 99));

  return activities;
}
