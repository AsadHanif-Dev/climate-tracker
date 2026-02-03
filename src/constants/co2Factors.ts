import { ActivityType, CO2Factor } from '@/types';

// CO2 emission factors (kg CO2 per unit)
export const CO2_FACTORS: Record<ActivityType, CO2Factor> = {
  // Travel (kg CO2 per km)
  car: {
    label: 'Car',
    category: 'travel',
    co2PerUnit: 0.192, // per km
    unit: 'km',
  },
  public_transport: {
    label: 'Public Transport',
    category: 'travel',
    co2PerUnit: 0.089, // per km
    unit: 'km',
  },
  flight: {
    label: 'Flight',
    category: 'travel',
    co2PerUnit: 0.255, // per km
    unit: 'km',
  },
  
  // Energy (kg CO2 per kWh)
  electricity: {
    label: 'Electricity',
    category: 'energy',
    co2PerUnit: 0.475, // per kWh
    unit: 'kWh',
  },
  gas: {
    label: 'Natural Gas',
    category: 'energy',
    co2PerUnit: 0.203, // per kWh
    unit: 'kWh',
  },
  
  // Food (kg CO2 per serving)
  meat: {
    label: 'Meat Meal',
    category: 'food',
    co2PerUnit: 7.26, // per meal
    unit: 'meals',
  },
  dairy: {
    label: 'Dairy Products',
    category: 'food',
    co2PerUnit: 3.2, // per serving
    unit: 'servings',
  },
  vegetarian: {
    label: 'Vegetarian Meal',
    category: 'food',
    co2PerUnit: 1.7, // per meal
    unit: 'meals',
  },
};

export const CATEGORY_COLORS = {
  travel: '#3b82f6', // blue
  energy: '#f59e0b', // amber
  food: '#10b981', // green
};

export const CATEGORY_LABELS = {
  travel: 'Travel',
  energy: 'Energy',
  food: 'Food',
};
