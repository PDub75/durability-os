# Durability OS - Project Context

## Project Overview
**Durability OS** is a personal health and wellness tracking application built with React, TypeScript, and Vite. It's designed to help users track daily habits and metrics related to durability (physical, mental, and overall wellness).

**Live Demo:** https://PDub75.github.io/durability-os  
**Repository:** https://github.com/PDub75/durability-os  
**Status:** Currently shared with Tim for review

## Core Features
- **Daily Habit Tracking**: 11 default habits including morning routine, exercise, nutrition, and sleep
- **Metrics Dashboard**: Tracks Battery, HRV, Sleep, Stress, and RHR
- **Morning Check-in**: Loads daily coaching brief when check-in is completed
- **Food Logging**: Nutrition tracking with smoothie editing
- **Mind & Review Screens**: Mental health and daily review features

## Tech Stack
- **Frontend**: React 19.2.6 + TypeScript 6.0
- **Bundler**: Vite 8.0.12
- **State Management**: Zustand 5.0.13
- **Styling**: Tailwind CSS 3.4.19
- **Routing**: React Router 7.15.1
- **Charts**: Recharts 3.8.1
- **UI Icons**: Lucide React 1.16.0

## Project Structure
```
src/
├── screens/       # Route-based pages (Home, CheckIn, Food, Mind, Quit, Review)
├── components/    # Reusable UI components (BottomNav, etc.)
├── store/         # Zustand state management
├── lib/           # Utility functions (e.g., longevityPool.ts)
├── assets/        # Static assets
├── App.tsx        # Main app with routing
├── main.tsx       # Entry point
└── index.css      # Global styles
```

## Known Issues & Next Steps

### Design/Styling
- [ ] Layout styling issues reported (see details below)
- [ ] Review responsive behavior on deployed version

### Features In Progress
- [ ] **Password/Authentication Screen** - Add simple password protection to app entrance
  - Should be lightweight (not full auth system)
  - Blocks access until correct password entered
  - Appears before routing/main app loads

### Deployment
- Deployed via GitHub Pages using `npm run deploy` (gh-pages)
- Uses hash-based routing for client-side routing compatibility

## Build & Development

### Setup
```bash
npm install
npm run dev          # Start dev server with HMR
npm run build        # TypeScript + Vite build
npm run deploy       # Build and deploy to gh-pages
npm run lint         # ESLint check
```

## Recent Activity
- Code pushed to GitHub repository
- Shared with Tim for review and feedback
- Styling layout issues identified that need fixing
- Password screen feature requested

## Notes for Future Sessions
- When addressing styling issues, verify the fixes work on both local dev and deployed GitHub Pages version
- Password feature should load before app initializes (check App.tsx loading state)
- Test thoroughly before deploying - use `npm run preview` to test production build locally
