export type ActivityCategory = 'travel' | 'energy' | 'food';

export type ActivityType = 
  | 'car'
  | 'public_transport'
  | 'flight'
  | 'electricity'
  | 'gas'
  | 'meat'
  | 'dairy'
  | 'vegetarian';

export interface Activity {
  id: string;
  date: string; // ISO date string
  category: ActivityCategory;
  type: ActivityType;
  amount: number;
  unit: string;
  co2: number; // in kg
}

export interface DailyTotal {
  date: string;
  total: number;
  byCategory: {
    travel: number;
    energy: number;
    food: number;
  };
}

export interface CO2Factor {
  label: string;
  category: ActivityCategory;
  co2PerUnit: number; // kg CO2 per unit
  unit: string;
}
