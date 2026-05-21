# 🌤️ Weather Hub

A real-time weather app that detects your location, displays current conditions and forecasts, and lets logged-in users save and manage their favourite locations.

---

## What it does

- Detects the user's location automatically via the browser
- Displays current weather — temperature, feels like, humidity, wind speed
- Shows a 7-day forecast + Hourly weather
- Falls back to **Boring, Oregon** if location access is denied 
- Users can sign up and log in to save locations
- Logged-in users get a saved locations dashboard with detailed weather pages per location

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, TypeScript, Vite, Tailwind CSS v4 |
| Backend | Node.js, Express, TypeScript |
| Auth | bcrypt, express-session |
| Weather Data | Open-Meteo API (free, no key required) |
| Geocoding | Open-Meteo Geocoding API |
| Database | MongoDB Atlas, Mongoose |
| Version Control | Git, GitHub |

---

## Getting Started

### Prerequisites

- Node.js v18 or higher
- A [MongoDB Atlas](https://www.mongodb.com/atlas) account and cluster

> No weather API key needed — Open-Meteo is completely free and open with no sign up required.

### 1. Clone the repo

```bash
git clone https://github.com/TOTE-Lab2/weather-hub.git
cd weather-hub
```

### 2. Set up the frontend

```bash
cd client
npm install
```

> No `.env` file needed for the frontend.

### 3. Set up the backend

```bash
cd ../server
npm install
```

Create a `.env` file inside `/server` using `.env.example` as a template:
```
PORT=3001
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_random_secret
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
│   │   └── main.tsx          # Entry point
│   └── package.json
├── server/
│   ├── controllers/
│   │   └── weatherController.ts
│   ├── db/
│   │   ├── connection.ts     # MongoDB connection
│   │   └── models/
│   │       └── User.ts       # User model with saved locations
│   ├── middleware/
│   │   └── isAuthenticated.ts
│   ├── routes/
│   │   └── weather.ts
│   ├── index.ts
│   ├── .env
│   ├── .env.example
│   └── package.json
├── docs/                     # Project documentation
└── README.md
```

---

## Environment Variables

### `/server/.env`

| Variable | Description |
|----------|-------------|
| `PORT` | 3000 |
| `MONGODB_URI` | our_mongodb_connection_string |
| `SESSION_SECRET`| your_random_secret |

> ⚠️ Never commit `.env` files to GitHub. Both are listed in `.gitignore`.

---

## API Reference

### `GET /api/weather`

Fetches weather data for a given location via Open-Meteo.

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `lat` | number | Latitude |
| `lng` | number | Longitude |

**Example:**
```
GET /api/weather?lat=51.5074&lng=-0.1278
```

**Response:** Open-Meteo forecast object containing current conditions and hourly data:

```json
{
  "current": {
    "temperature_2m": 18.4,
    "apparent_temperature": 16.2,
    "wind_speed_10m": 12.3,
    "weather_code": 3
  },
  "hourly": {
    "time": ["2024-01-01T00:00", "2024-01-01T01:00"],
    "temperature_2m": [18.4, 17.9]
  }
}
```

---

## Stretch Goals

- Animated weather icons
- Home location pinned to top of saved locations dashboard
- Weather news feed
- Dark mode

---

## Acknowledgements

- Weather data provided by [Open-Meteo](https://open-meteo.com) — free, open, no API key required
- Built with ❤️ by TOTE Lab 2
