# 🌍 Climate Impact Tracker

A real-time web application for tracking your daily CO₂ footprint, built with React, Next.js, TypeScript, and Tailwind CSS.

## ✨ Features

- **Activity Tracking**: Log daily activities across three categories:
  - 🚗 **Travel**: Car, public transport, flights
  - ⚡ **Energy**: Electricity, natural gas
  - 🍽️ **Food**: Meat meals, dairy products, vegetarian meals

- **Real-time Calculations**: Instant CO₂ footprint calculations as you input data
- **Interactive Visualizations**:
  - Line chart showing daily emissions trends over time
  - Pie chart displaying category breakdown
  - Statistics cards for quick insights
  
- **Sample data on first run**: a generated 30-day footprint populates the
  dashboard so the charts are readable immediately. It is held in memory only,
  never written to storage, and is replaced the moment you log a real activity
- **Rolling calendar windows**: 7- and 30-day totals cover the actual calendar
  window including days with no activity, so averages use the right denominator
  and gaps in logging do not distort the trend
- **Data Persistence**: All activities stored in browser localStorage
- **Dark/Light Mode**: Toggle between themes with system preference detection
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Clean UI**: Modern, intuitive interface built with Tailwind CSS

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm package manager

### Installation

1. **Clone or navigate to the project directory**:
   ```bash
   cd Cimate-impact-tracker
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
Cimate-impact-tracker/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with theme provider
│   │   ├── page.tsx             # Main dashboard page
│   │   └── globals.css          # Global styles
│   ├── components/
│   │   ├── ActivityInput.tsx    # Form for adding activities
│   │   ├── ActivityList.tsx     # Display logged activities
│   │   ├── CategoryBreakdown.tsx # Pie chart component
│   │   ├── DailyTrendChart.tsx  # Line chart component
│   │   ├── StatsCard.tsx        # Statistics display card
│   │   ├── ThemeProvider.tsx    # Theme context provider
│   │   └── ThemeToggle.tsx      # Dark/light mode toggle
│   ├── constants/
│   │   └── co2Factors.ts        # CO₂ emission factors
│   ├── types/
│   │   └── index.ts             # TypeScript type definitions
│   └── utils/
│       ├── storage.ts           # localStorage utilities
│       └── helpers.ts           # Helper functions
├── public/                      # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── README.md
```

## 🎯 Usage

### Adding Activities

1. Select a date (defaults to today)
2. Choose an activity type from the dropdown
3. Enter the amount (distance in km, energy in kWh, or number of meals/servings)
4. Click "Add Activity" to log it
5. The CO₂ calculation is displayed instantly

### Viewing Data

- **Today's Total**: Current day's total emissions
- **7-Day Total**: Weekly emissions with daily average
- **30-Day Total**: Monthly emissions
- **Category Breakdown**: Pie chart showing today's emissions by category
- **Daily Trend**: Line chart showing emissions over the last 30 days
- **Activity Log**: Detailed list of all logged activities, grouped by date

### Managing Data

- Click the ❌ icon next to any activity to remove it
- Use the "Clear All" button to delete all activities
- Toggle between light/dark mode using the theme button in the header

## 🔢 CO₂ Emission Factors

The app uses the following hardcoded emission factors:

| Activity | CO₂ per Unit | Unit |
|----------|--------------|------|
| Car | 0.192 kg | km |
| Public Transport | 0.089 kg | km |
| Flight | 0.255 kg | km |
| Electricity | 0.475 kg | kWh |
| Natural Gas | 0.203 kg | kWh |
| Meat Meal | 7.26 kg | meal |
| Dairy Products | 3.2 kg | serving |
| Vegetarian Meal | 1.7 kg | meal |

*Note: These are approximate industry averages and may vary based on location and specific circumstances.*

## 🛠️ Technologies Used

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Data Storage**: Browser localStorage
- **Icons**: Emoji + SVG icons

## 📦 Build for Production

```bash
npm run build
npm start
```

This creates an optimized production build and starts the server.

## 🎨 Customization

### Changing CO₂ Factors

Edit [src/constants/co2Factors.ts](src/constants/co2Factors.ts) to modify emission factors.

### Adding New Activity Types

1. Add the activity type to the `ActivityType` union in [src/types/index.ts](src/types/index.ts)
2. Add the corresponding factor in [src/constants/co2Factors.ts](src/constants/co2Factors.ts)
3. Update the select options in [src/components/ActivityInput.tsx](src/components/ActivityInput.tsx)

### Styling

All styles use Tailwind CSS. Modify [tailwind.config.ts](tailwind.config.ts) for theme customization.

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Requires localStorage support

## 📝 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Feel free to fork this project and make improvements! Some ideas:
- Add more activity types
- Implement goals and targets
- Add export functionality (CSV, PDF)
- Create comparison views
- Add social sharing features

## 📧 Support

For issues or questions, please refer to the project documentation or create an issue in the repository.

---

Built with 💚 for a sustainable future 🌱
