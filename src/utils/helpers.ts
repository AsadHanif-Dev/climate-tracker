// Format date to readable string
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  });
};

// Format CO2 value with kg unit
export const formatCO2 = (value: number): string => {
  return `${value.toFixed(2)} kg CO₂`;
};

// Get today's date as ISO string
export const getTodayISO = (): string => {
  return new Date().toISOString().split('T')[0];
};

// Generate unique ID
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
