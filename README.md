# 🌤️ Weather Hub

A real-time weather app that detects your location and displays current conditions and an hourly forecast. Built as a first group project.

---

## What it does

- Detects the user's location automatically via the browser
- Displays current weather — temperature, condition, feels like, and weather icon
- Shows an 8-hour forecast with real times and temperatures
- Falls back to **Boring, Oregon** if location access is denied 🗺️

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, TypeScript, Vite, Tailwind CSS v4 |
| Backend | Node.js, Express, TypeScript |
| Weather Data | OpenWeatherMap API |
| Database | Supabase |
| Version Control | Git, GitHub |

---

## Getting Started

### Prerequisites

- Node.js v18 or higher
- An [OpenWeatherMap](https://openweathermap.org) API key (free tier)
- A [Supabase](https://supabase.com) project

### 1. Clone the repo

```bash
git clone https://github.com/TOTE-Lab/weather-hub.git
cd weather-hub
```

### 2. Set up the frontend

```bash
cd client
npm install
```

Create a `.env` file inside `/client`:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Set up the backend

```bash
cd ../server
npm install
```

Create a `.env` file inside `/server`:

```
OPENWEATHER_API_KEY=your_openweathermap_api_key
```

### 4. Run the app

You need two terminals running at the same time:

**Terminal 1 — Backend:**
```bash
cd server
npm run dev
# Server running on port 3001
```

**Terminal 2 — Frontend:**
```bash
cd client
npm run dev
# Local: http://localhost:5173
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Project Structure

```
weather-hub/
├── client/                   # React frontend
│   ├── src/
│   │   ├── App.tsx           # Main app component
│   │   ├── supabaseClient.ts # Shared Supabase instance
│   │   └── main.tsx          # Entry point
│   ├── .env                  # Frontend environment variables (never commit)
│   └── package.json
├── server/                   # Express backend
│   ├── controllers/
│   │   └── weatherController.ts
│   ├── routes/
│   │   └── weather.ts
│   ├── index.ts              # Server entry point
│   ├── .env                  # Backend environment variables (never commit)
│   └── package.json
└── README.md
```

---

## Environment Variables

### `/client/.env`

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon public key |

### `/server/.env`

| Variable | Description |
|----------|-------------|
| `OPENWEATHER_API_KEY` | Your OpenWeatherMap API key |

> ⚠️ Never commit `.env` files to GitHub. Both are listed in `.gitignore`.

---

## API Reference

### `GET /api/weather`

Fetches weather data for a given location.

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `lat` | number | Latitude |
| `lng` | number | Longitude |

**Example:**
```
GET /api/weather?lat=51.5074&lng=-0.1278
```

**Response:** OpenWeatherMap forecast object containing current conditions and hourly data.

---

## Acknowledgements

- Weather data provided by [OpenWeatherMap](https://openweathermap.org)
- Database and auth infrastructure by [Supabase](https://supabase.com)
- Built with ❤️ by TOTE Lab