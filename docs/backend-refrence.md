# WeatherHub Backend Reference

This document is the backend reference for WeatherHub. It defines the backend responsibilities, API contracts, data shapes, and implementation conventions that keep frontend and backend work aligned.

Use this alongside:

- `docs/api-contract.md` for the compact route contract
- `docs/frontend-reference.md` for frontend flow and component expectations
- `server/.env.example` for local environment setup

---

## Backend Responsibilities

The backend owns:

- Weather data proxying through Open-Meteo
- Reverse geocoding through BigDataCloud
- User signup, login, logout, and session verification
- Protected saved-location CRUD
- City search through Open-Meteo geocoding
- MongoDB persistence through two Mongoose models: `User` and `SavedLocation`
- Consistent validation and error responses

The frontend should not call third-party APIs directly when the data belongs in a shared app contract. The backend normalizes those external API responses into shapes the frontend can rely on.

---

## Server Setup

Entry point:

```text
server/index.ts
```

The Express app should:

- Load environment variables with `dotenv.config()`
- Connect to MongoDB before serving protected data
- Enable CORS for the Vite frontend
- Allow credentials for session cookies
- Parse JSON request bodies
- Register session middleware before protected routes
- Mount API routes under `/api`
- Register one global error handler after all routes
- Listen on `process.env.PORT || 3001`

Local scripts:

```bash
npm run server --prefix server
npm run dev
```

---

## Environment Variables

Environment file:

```text
server/.env
```

Template:

```text
server/.env.example
```

Required values:

| Variable               | Purpose                             |
| ---------------------- | ----------------------------------- |
| `PORT`                 | Backend port, usually `3001`        |
| `MONGODB_URI`          | MongoDB Atlas connection string     |
| `SESSION_SECRET`       | Secret used to sign session cookies |
| `BIGDATACLOUD_API_KEY` | API key for reverse geocoding       |

Do not commit real `.env` values.

---

## API Overview

```text
GET    /api/weather?lat={lat}&lng={lng}

POST   /api/auth/signup
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/verify

GET    /api/locations
POST   /api/locations
DELETE /api/locations/:id

GET    /api/search?city={cityName}
```

Protected routes require an active session:

```text
GET    /api/locations
POST   /api/locations
DELETE /api/locations/:id
```

---

## Weather Route

### `GET /api/weather?lat={lat}&lng={lng}`

Fetches forecast data and city metadata for a coordinate pair.

Query parameters:

| Name  | Type   | Required | Notes     |
| ----- | ------ | -------- | --------- |
| `lat` | number | Yes      | Latitude  |
| `lng` | number | Yes      | Longitude |

Expected response:

```json
{
  "weather": {
    "current": {
      "temperature_2m": 72.4,
      "apparent_temperature": 70.9,
      "relative_humidity_2m": 62,
      "wind_speed_10m": 8.5,
      "wind_direction_10m": 270,
      "weather_code": 1
    },
    "hourly": {
      "time": [],
      "temperature_2m": [],
      "weather_code": [],
      "precipitation_probability": []
    },
    "daily": {
      "time": [],
      "temperature_2m_max": [],
      "temperature_2m_min": [],
      "weather_code": [],
      "precipitation_probability_max": [],
      "sunrise": [],
      "sunset": [],
      "uv_index_max": []
    }
  },
  "city": {
    "locality": "Portland",
    "principalSubdivision": "Oregon",
    "countryCode": "US"
  }
}
```

Backend responsibilities:

- Validate `lat` and `lng`
- Request weather data from Open-Meteo
- Request city metadata from BigDataCloud
- Return one combined `{ weather, city }` object
- Use Fahrenheit, mph, 7 forecast days, and automatic timezone

Open-Meteo fields:

```text
current:
  temperature_2m
  apparent_temperature
  relative_humidity_2m
  wind_speed_10m
  wind_direction_10m
  weather_code

hourly:
  temperature_2m
  weather_code
  precipitation_probability

daily:
  weather_code
  temperature_2m_max
  temperature_2m_min
  precipitation_probability_max
  sunrise
  sunset
  uv_index_max
```

Frontend usage:

```ts
fetch(`/api/weather?lat=${lat}&lng=${lng}`);
```

---

## Auth Routes

Base path:

```text
/api/auth
```

Auth uses `express-session`. The API does not use JWT.

### `POST /api/auth/signup`

Request body:

```json
{
  "name": "Ada",
  "email": "ada@example.com",
  "password": "password123"
}
```

Expected response:

```json
{
  "id": "mongo-user-id",
  "name": "Ada",
  "email": "ada@example.com"
}
```

Backend responsibilities:

- Validate `name`, `email`, and `password`
- Normalize email to lowercase
- Reject duplicate emails
- Hash password with bcrypt
- Save the user
- Store the user id in the session
- Return safe user data only

### `POST /api/auth/login`

Request body:

```json
{
  "email": "ada@example.com",
  "password": "password123"
}
```

Expected response:

```json
{
  "id": "mongo-user-id",
  "name": "Ada",
  "email": "ada@example.com"
}
```

Backend responsibilities:

- Normalize email to lowercase
- Find user by email
- Compare password with bcrypt
- Store the user id in the session
- Return safe user data only

### `POST /api/auth/logout`

Expected response:

```json
{
  "message": "Logged out"
}
```

Backend responsibilities:

- Destroy the session
- Clear the session cookie
- Return a success message

### `GET /api/auth/verify`

Expected response when logged in:

```json
{
  "user": {
    "id": "mongo-user-id",
    "name": "Ada",
    "email": "ada@example.com"
  }
}
```

Expected response when logged out:

```json
{
  "error": "Not authenticated"
}
```

Backend responsibilities:

- Check for an active session
- Return `401` when no session exists
- Return safe user data when a session exists

Frontend usage:

```ts
fetch("/api/auth/verify", {
  method: "GET",
  credentials: "include",
});
```

---

## Location Routes

Base path:

```text
/api/locations
```

All location routes require session auth.

### `GET /api/locations`

Returns the logged-in user's saved locations.

Expected response:

```json
{
  "saved_locations": [
    {
      "_id": "location-id",
      "locationName": "Portland",
      "lat": 45.5152,
      "lng": -122.6784
    }
  ]
}
```

Backend responsibilities:

- Require login
- Load saved locations where `userId` matches the logged-in user
- Return only locations owned by that user

### `POST /api/locations`

Saves a location to the logged-in user's account.

Request body:

```json
{
  "locationName": "Portland",
  "lat": 45.5152,
  "lng": -122.6784
}
```

Expected response:

```json
{
  "saved_location": {
    "_id": "location-id",
    "locationName": "Portland",
    "lat": 45.5152,
    "lng": -122.6784
  }
}
```

Backend responsibilities:

- Require login
- Validate `locationName`, `lat`, and `lng`
- Create a saved-location document with `userId` set to the logged-in user's id
- Return the created saved location

### `DELETE /api/locations/:id`

Deletes one saved location owned by the logged-in user.

Expected response:

```json
{
  "message": "Location deleted"
}
```

Backend responsibilities:

- Require login
- Delete only a location where `_id` matches `:id` and `userId` matches the logged-in user
- Return `404` if the location does not exist for that user

---

## Search Route

### `GET /api/search?city={cityName}`

Looks up a city through Open-Meteo geocoding and returns normalized coordinates.

Expected response:

```json
{
  "locationName": "Portland, Oregon",
  "lat": 45.5152,
  "lng": -122.6784
}
```

Backend responsibilities:

- Validate the `city` query parameter
- Call Open-Meteo Geocoding API
- Choose the best matching result
- Return normalized location data

This supports the dashboard search flow:

```text
SearchBar -> backend geocodes city -> frontend navigates with returned coords
```

---

## Data Model

WeatherHub uses two MongoDB collections:

- `users`
- `saved_locations`

Saved locations belong to users through a `userId` reference. They are not embedded inside the user document.

### User Model

Recommended shape:

```ts
{
  name: string;
  email: string;
  passwordHash: string;
}
```

Rules:

- Never return `passwordHash` to the frontend
- Store normalized emails in lowercase
- Use the user `_id` as the session identity
- Keep user auth data separate from saved-location data

### SavedLocation Model

Recommended shape:

```ts
{
  userId: ObjectId;
  locationName: string;
  lat: number;
  lng: number;
}
```

Rules:

- `userId` references the owning user
- Every saved-location query should filter by `userId`
- Delete actions should filter by both `_id` and `userId`
- The frontend response does not need to include `userId`
- Keep API response keys aligned with `docs/api-contract.md`

---

## Session Configuration

Session middleware should be registered before auth-protected routes.

```ts
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    },
  }),
);
```

For local frontend requests that include cookies, CORS must allow credentials:

```ts
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
```

Frontend requests that depend on login should include:

```ts
credentials: "include";
```

---

## Error Handling

Use consistent status codes and response shapes.

| Status | Meaning                                       |
| ------ | --------------------------------------------- |
| `400`  | Missing or invalid request data               |
| `401`  | Not logged in                                 |
| `403`  | Logged in but not allowed                     |
| `404`  | Requested resource not found                  |
| `409`  | Duplicate account or duplicate saved location |
| `500`  | Server or external API error                  |

Recommended error response:

```json
{
  "error": "Human-readable error message"
}
```

Global error handler responsibilities:

- Log useful server-side details
- Avoid leaking secrets to the frontend
- Return a predictable `{ error }` response
- Preserve status codes from route/controller errors

---

## File Organization

Recommended backend structure:

```text
server/
├── index.ts
├── package.json
├── .env.example
└── src/
    ├── controller/
    │   ├── authController.ts
    │   ├── cityController.ts
    │   ├── locationController.ts
    │   ├── searchController.ts
    │   └── weatherController.ts
    ├── db/
    │   └── connection.ts
    ├── middleware/
    │   └── requireAuth.ts
    ├── models/
    │   ├── SavedLocation.ts
    │   └── User.ts
    └── routes/
        ├── authRoutes.ts
        ├── locationRoutes.ts
        ├── searchRoutes.ts
        └── weatherRoutes.ts
```

Conventions:

- Routes define URL paths and middleware order
- Controllers handle request logic and responses
- Models define MongoDB shape and validation
- Middleware handles shared concerns like auth checks
- Database connection logic stays outside route files

---

## Manual Verification

Weather:

```bash
curl "http://localhost:3001/api/weather?lat=45.5152&lng=-122.6784"
```

Expected:

- Response has `weather.current`
- Response has `weather.hourly`
- Response has `weather.daily`
- Response has a usable `city` object

Auth:

```bash
curl -i -X POST "http://localhost:3001/api/auth/signup" \
  -H "Content-Type: application/json" \
  -d '{"name":"Ada","email":"ada@example.com","password":"password123"}'
```

Protected locations without login:

```bash
curl -i "http://localhost:3001/api/locations"
```

Expected:

```json
{
  "error": "Not authenticated"
}
```

Search:

```bash
curl "http://localhost:3001/api/search?city=Portland"
```

Expected:

- Response has `locationName`
- Response has `lat`
- Response has `lng`

---

## Backend Task List

Project setup:

- [x] Use `process.env.PORT || 3001` in `server/index.ts`
- [x] Configure CORS with `credentials: true`
- [x] Add `express-session` middleware
- [x] Connect MongoDB with `MONGODB_URI`
- [x] Keep `.env.example` aligned with required backend variables

Models:

- [x] Create `User` model
- [x] Create `SavedLocation` model
- [x] Add `userId` reference from `SavedLocation` to `User`
- [x] Normalize user emails before saving or querying
- [ ] Prevent password hashes from being returned in API responses

Auth:

- [x] Create auth routes under `/api/auth`
- [x] Implement `POST /api/auth/signup`
- [x] Implement `POST /api/auth/login`
- [x] Implement `POST /api/auth/logout`
- [x] Implement `GET /api/auth/verify`
- [x] Store the logged-in user id in the session
- [x] Return `401` for missing or invalid sessions

Locations:

- [ ] Create location routes under `/api/locations`
- [ ] Protect all location routes with session auth
- [ ] Implement `GET /api/locations`
- [ ] Implement `POST /api/locations`
- [ ] Implement `DELETE /api/locations/:id`
- [ ] Filter all location queries by `userId`
- [ ] Exclude `userId` from frontend responses unless the team explicitly needs it

Weather and search:

- [ ] Validate `lat` and `lng` in `/api/weather`
- [ ] Keep weather response shape as `{ weather, city }`
- [ ] Create search route under `/api/search`
- [ ] Implement Open-Meteo geocoding lookup
- [ ] Return normalized `{ locationName, lat, lng }` search results

Errors and verification:

- [ ] Add global error handler middleware after all routes
- [ ] Normalize error responses as `{ error: "message" }`
- [ ] Preserve useful HTTP status codes
- [ ] Keep secrets out of frontend-facing errors
- [ ] Manually verify each route with curl or the frontend
- [ ] Update this task list as backend work is completed

## technical challenges/notes
