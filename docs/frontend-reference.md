# WeatherHub — Project Reference Doc
*Frontend planning session, May 2026*
*Team: Maia (Git Lead, FE), Kanami (FE), John (BE), Tinghong (BE, Scrum Lead)*

---

## Stack
- React, TypeScript, Vite, Tailwind
- Node / Express, MongoDB / Mongoose
- express-session, bcrypt
- Open-Meteo API (weather + forward geocoding)
- Reverse geocoding handled by backend middleware (city name bundled into weather API response)

---

## Locked Component Tree

```
App
├── state: isLoggedIn, user, isModalOpen, modalMode, isLoading
├── routing
└── AuthModal

Landing /
├── NavBar
├── WeatherCard
├── SevenDayForecast
└── CTACard (if !isLoggedIn) | DashboardLink card (if isLoggedIn)
  (SevenDayForecast on Landing also receives onOpenModal — renders a login/signup prompt for non-logged-in users)

Dashboard /dashboard  [protected]
├── NavBar
├── SearchBar
└── SavedLocationCard × many  (each has delete button)

Detail /locations/current and /locations/:id  [protected]
├── HomeLink + DashboardLink  (top bar — no NavBar on this page)
├── Hero
├── SaveButton  (star icon, toggles teal when saved)
├── WeatherDetails
├── HourlyForecast
└── SevenDayForecast

Shared
├── NavBar
├── AuthModal
└── LoadingScreen

Utils → getWeatherIcon(weather_code)
Hook → useWeather(lat, lng)
```

---

## User Flow

```
App loads
  → auth check (GET /auth/verify)
  → LoadingScreen briefly
  → both logged in and not logged in land on /

Landing /
  not logged in → sees CTACard (sign up / log in)
  logged in     → sees DashboardLink card (routes to /dashboard)

NavBar
  not logged in → Log In + Sign Up buttons (open AuthModal)
  logged in     → "Hi, [name]!" 

AuthModal
  opened by: NavBar buttons, CTACard buttons, SevenDayForecast prompt (Landing only)
  modalMode: 'login' | 'signup'
  on error → stays open, shows error
  on success → setUser, setIsLoggedIn, close modal, navigate to /locations/current

/locations/current  [protected]
  top bar: ← Home link | Dashboard → link
  Hero → SaveButton (star) → WeatherDetails → HourlyForecast → SevenDayForecast
  save button → POST /api/locations with { locationName, lat, lng }

/dashboard  [protected]
  NavBar → "Hi, [name]!"
  SearchBar → user types city → backend geocodes → returns { locationName, lat, lng } → navigate to /locations/current with searched coords
  SavedLocationCards → data from GET /api/locations
    each card has delete button → DELETE /api/locations/:id
  click a card → navigates to /locations/:id

/locations/:id  [protected]
  same layout as /locations/current
  data comes from saved location in DB

Protected routes
  if not logged in → redirect to /
```

---

## Backend API Contract

### Auth routes
```
POST /api/auth/signup   → { id, name, email }
POST /api/auth/login    → { id, name, email }
POST /api/auth/logout   → { message: "Logged out" }
GET  /api/auth/verify   → { user: { id, name, email } }
```

### Location routes (all protected)
```
GET    /api/locations      → { saved_locations: [...] }
POST   /api/locations      → { saved_location: {...} }
DELETE /api/locations/:id  → { message: "Location deleted" }
```

### Search (to flag for backend team)
```
GET /api/search?city=Portland → { locationName, lat, lng }
(backend hits Open-Meteo geocoding API, returns result to frontend)
```

---

## useWeather Hook

**Takes in:** `lat`, `lng` (numbers)

**Returns:** `{ weatherData, isLoading, error }`

**Confirmed working query string (tested ✓):**
```
https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lng}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,wind_direction_10m,weather_code&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset,uv_index_max&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&forecast_days=7&timezone=auto
```

**Full backend response shape (confirmed ✓):**
```
response.weather.current   → current weather data
response.weather.hourly    → hourly arrays
response.weather.daily     → daily arrays
response.city.locality     → display city name (e.g. "Port Edwards")
response.city.principalSubdivision → state (e.g. "Wisconsin") — optional for display
```

**weatherData shape:**
```
weather.current
  temperature_2m
  apparent_temperature
  relative_humidity_2m
  wind_speed_10m
  wind_direction_10m
  weather_code
  (note: uv_index not available in current — use daily[0].uv_index_max instead)

weather.hourly  (168 entries — 7 days × 24hrs. slice from current hour index for HourlyForecast)
  temperature_2m
  weather_code
  precipitation_probability

weather.daily  (7 entries — note: precipitation field is precipitation_probability_max not precipitation_probability)
  temperature_2m_max
  temperature_2m_min
  weather_code
  precipitation_probability_max
  sunrise
  sunset
  uv_index_max

city.locality          → display name
city.principalSubdivision → state
```

**Units returned:** °F temp, mp/h wind, % humidity/precipitation

**Which component uses what:**
```
WeatherCard       → weather.current.temperature_2m, apparent_temperature, weather_code
                    city.locality (display name)
Hero              → weather.current.temperature_2m, apparent_temperature
                    weather.daily[0].temperature_2m_max, temperature_2m_min
                    city.locality, city.principalSubdivision
WeatherDetails    → weather.current.relative_humidity_2m, wind_speed_10m, wind_direction_10m
                    weather.daily[0].uv_index_max, sunrise, sunset
HourlyForecast    → weather.hourly sliced from current hour (24 entries)
                    temperature_2m, weather_code, precipitation_probability
SevenDayForecast  → weather.daily.* (all 7 days)
SavedLocationCard → weather.current.temperature_2m, weather_code
                    city.locality (stored in DB at save time)
```

## Work Split

**Maia:**
- App.tsx
- useWeather hook
- NavBar
- LandingPage.tsx + all landing components (WeatherCard, CTACard, DashboardLinkCard)
- DetailPage.tsx + detail components (Hero, SaveButton, WeatherDetails)

**Kanami:**
- AuthModal
- SevenDayForecast (renders on Landing AND Detail — Maia imports it)
- Dashboard.tsx + dashboard components (SearchBar, SavedLocationCard)
- HourlyForecast (minor mod: 8hr → 24hr, renders on Detail — Maia imports it)

---

## Prop Naming Agreement

```
App.tsx state:
  isModalOpen       (bool)
  modalMode         ('login' | 'signup')
  isLoggedIn        (bool)
  user              ({ id, name, email } | null)
  isLoading         (bool)

AuthModal props:
  isOpen            ← isModalOpen
  initialMode       ← modalMode
  onClose           ← onCloseModal function
  onAuthSuccess     ← fires on successful auth, receives user object

onOpenModal passed to:
  NavBar, CTACard, SevenDayForecast (Landing only)
  called as onOpenModal('login') or onOpenModal('signup')
```

---



```
client/src/
  hooks/
    useWeather.ts

  components/
    shared/
      NavBar.tsx
      AuthModal.tsx
      LoadingScreen.tsx
      SevenDayForecast.tsx
    landing/
      WeatherCard.tsx
      CTACard.tsx
      DashboardLinkCard.tsx
    dashboard/
      SearchBar.tsx
      SavedLocationCard.tsx
    detail/
      Hero.tsx
      SaveButton.tsx
      HourlyForecast.tsx
      WeatherDetails.tsx

  pages/
    LandingPage.tsx
    Dashboard.tsx
    DetailPage.tsx

  utils/
    getWeatherIcon.ts

  types/
    index.ts
```

---

## Geocoding Strategy

**Reverse geocoding** (coords → place name)
- Handled by backend middleware using BigDataCloud server-side API (`/data/reverse-geocode`)
- Requires `BIGDATACLOUD_API_KEY` in backend .env — note: new keys need a few minutes to propagate before they work
- City name bundled into weather API response at top level as `response.city`
- Key fields: `city.locality` (display name), `city.principalSubdivision` (state)
- Frontend does not call any geocoding API directly

**Forward geocoding** (city name → coords + place name)
- Used on: Dashboard SearchBar only
- Who does it: backend (keeps API querying in backend middleware, consistent with team pattern)
- API: Open-Meteo geocoding API
- Flow: user types city → SearchBar sends to backend → backend hits Open-Meteo → returns { locationName, lat, lng } → frontend calls useWeather(lat, lng)

**What gets saved to DB:** `{ locationName, lat, lng }`
- Place name already known at save time, no geocoding needed on dashboard load
- SavedLocationCards just use stored name + call useWeather(lat, lng) for fresh weather

---

## Open Questions

- [ ] Can Open-Meteo geocoding API be filtered by parameters (e.g. US only)? Results return country_code field — could filter on frontend. Needs decision.
- [ ] Open-Meteo geocoding API docs: https://open-meteo.com/en/docs/geocoding-api
- [x] Work split between Maia and Kanami — see Work Split section above
- [ ] Loading state UX — skeleton cards (pulsing placeholders) inside components while data loads
- [ ] LoadingScreen design — animated logo idea noted as stretch
- [ ] Gradient top border on cards — do basic color first, gradient is polish pass
- [ ] Star save button toggle styling — outline → teal fill on save
- [ ] Unit toggle (F/C) — stretch feature
- [ ] "Save current location?" prompt on dashboard — stretch feature

---

## NavBar States
```
not logged in  → Log In button + Sign Up button
logged in      → "Hi, [name]!"
detail page    → no NavBar (replaced by HomeLink + DashboardLink top bar)
```

*Note: backend returns `name` not `username` — use `user.name` throughout*