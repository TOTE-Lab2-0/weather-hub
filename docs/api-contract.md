# WeatherHub — API Contract
*Source of truth for frontend ↔ backend communication*
*Auth: express-session (not JWT)*

---

## Auth Routes

```
POST /api/auth/signup
  body:    { name, email, password }
  returns: { id, name, email }

POST /api/auth/login
  body:    { email, password }
  returns: { id, name, email }

POST /api/auth/logout
  returns: { message: "Logged out" }

GET /api/auth/verify
  returns: { user: { id, name, email } }
  note:    called on app load to check existing session
```

---

## Weather Route

```
GET /api/weather?lat={lat}&lng={lng}
  returns:
  {
    weather: {
      current: {
        temperature_2m,        (°F)
        apparent_temperature,  (°F)
        relative_humidity_2m,  (%)
        wind_speed_10m,        (mp/h)
        wind_direction_10m,    (°)
        weather_code           (WMO code)
      },
      hourly: {
        time:                     [...168 entries],
        temperature_2m:           [...168],
        weather_code:             [...168],
        precipitation_probability:[...168]
      },
      daily: {
        time:                        [...7 entries],
        temperature_2m_max:          [...7],  (°F)
        temperature_2m_min:          [...7],  (°F)
        weather_code:                [...7],
        precipitation_probability_max:[...7], (%)
        sunrise:                     [...7],
        sunset:                      [...7],
        uv_index_max:                [...7]
      }
    },
    city: {
      locality:              (display name e.g. "Port Edwards")
      principalSubdivision:  (state e.g. "Wisconsin")
      countryCode:           (e.g. "US")
      ... (other BigDataCloud fields)
    }
  }
```

---

## Location Routes — all protected

```
GET /api/locations
  returns: { saved_locations: [...] }
  note:    each location includes { _id, locationName, lat, lng }

POST /api/locations
  body:    { locationName, lat, lng }
  returns: { saved_location: { _id, locationName, lat, lng } }

DELETE /api/locations/:id
  returns: { message: "Location deleted" }
```

---

## Search Route — stretch feature

```
GET /api/search?city={cityName}
  returns: { locationName, lat, lng }
  note:    backend hits Open-Meteo geocoding API and returns result
           not yet implemented — stretch goal
```

---

## Error Handling

Protected routes return `401` if no active session.
Frontend should handle:
- `401` → redirect to `/` and open AuthModal
- `403` → access denied
- `500` → server error, show generic error state

---

## Notes

- Backend uses BigDataCloud server-side API for reverse geocoding
- New `BIGDATACLOUD_API_KEY` values take a few minutes to propagate
- Hourly array has 168 entries (7 days × 24hrs) — frontend slices from current hour