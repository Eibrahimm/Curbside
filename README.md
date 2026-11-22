# Curbside — City Street-Food Map

A bold, black-and-white interactive city street-food guide featuring the top 10 local spots, exactly what to order at each stand, a customizable crawl planner, and live in-browser guide editing.

**Live Demo:** https://curbside.embarko.app

## Features

- **Interactive Curbside Map** — Explore 10 numbered street-food pins on a custom city grid with an optional crawl-path overlay and synced spot inspector.
- **Time-of-Day & Crawl Filters** — Filter spots by `All 10`, `Morning`, `Midday`, `Late Night`, or `My Crawl`.
- **Top 10 Spots & Dish Stamps** — Detailed cards for every corner with exact orders, insider notes, quick jump controls, and photography.
- **Pocket Order Sheet** — A compact checklist for toggling spots on or off your personal crawl.
- **Live Guide Editor** — Edit spot titles, notes, and guide copy directly inside the app via the built-in editor drawer.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 8**
- **Tailwind CSS v4**
- **Motion** & **Lucide React**

## Run Locally

**Prerequisites:** Node.js 18+

1. Clone the repository:
   ```bash
   git clone https://github.com/Eibrahimm/Curbside.git
   cd Curbside
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```text
├── index.html
├── package.json
├── vite.config.ts
└── src/
    ├── App.tsx
    ├── components/
    │   ├── CityMap.tsx
    │   ├── DishStamp.tsx
    │   ├── EditGuideDrawer.tsx
    │   └── SpotCard.tsx
    ├── data/
    │   └── streetFoodData.ts
    └── assets/images/
```
