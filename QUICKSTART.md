# Quick Start Guide

## Installation & Running

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   - Navigate to: http://localhost:3000

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Run production server
- `npm run lint` - Run ESLint

## Key Features to Test

1. ✅ Add various activities (travel, energy, food)
2. ✅ View real-time CO₂ calculations
3. ✅ Check the pie chart (category breakdown)
4. ✅ Monitor the line chart (30-day trend)
5. ✅ Toggle dark/light mode
6. ✅ Remove individual activities
7. ✅ Refresh page to verify localStorage persistence
8. ✅ Test responsive design on mobile

## Troubleshooting

- **Port already in use**: Change port with `npm run dev -- -p 3001`
- **Build errors**: Delete `.next` folder and `node_modules`, then reinstall
- **Theme not working**: Clear browser cache and localStorage

Enjoy tracking your carbon footprint! 🌍
