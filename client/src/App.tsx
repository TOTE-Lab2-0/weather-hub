/*

the position object automatically returned by navigator.geolocation.getCurrentLocation()

  position = {
    coords: {
      latitude: 51.5074,    // your lat
      longitude: -0.1278,   // your lng
      accuracy: 10,         // how accurate in metres
      altitude: null,       // how high up you are
      speed: null,          // how fast you're moving
    }


    query parameters - send data to the server
    ? marks the start of the query 

*/

import { useState, useEffect } from "react";

import { supabase } from "./supabaseClient";

import "./App.css";

console.log(supabase);

function App() {
  //state -> data we want to react to/update UI based on changes from the user

  // when user clicks "Sign Up" button, show the sign up pop-up. starts hidden

  const [showSignUp, setShowSignUp] = useState(false);

  // when user clicks "Log In" button, show the login pop-up. starts hidden
  const [showLogin, setShowLogin] = useState(false);

  // keeps track of who is logged in. starts as nobody
  const [user, setUser] = useState(null);

  //
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null,
  );

  //
  const [weather, setWeather] = useState<any>(null);

  //react hook - run once after the react component has rendered
  useEffect(() => {
    //navigator.geolocation is a built in web browser API
    navigator.geolocation.getCurrentPosition(
      //how we respond when a user's location is successully accessed
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        setLocation({ lat: 45.4229, lng: -122.3762 });
        console.log(
          "Access to user's location denied - default to Boring, Oregon",
        );
      },
    );
  }, []);

  console.log("Location:", location);

  //
  useEffect(() => {
    //guard clause - if we don't have the location exit out of this function
    if (!location) return;

    const fetchWeather = async () => {
      try {
        //send the longitude and latitude we got in the useEffect above to the backend server
        const res = await fetch(
          `/api/weather?lat=${location?.lat}&lng=${location?.lng}`,
        );

        //convert the response into a javascript object that is useful to us
        const data = await res.json();

        //update the weather state
        setWeather(data);

        console.log("Weather Data:", data);
      } catch (err) {
        console.error("Weather fetch failed:", err);
      }
    };

    fetchWeather();
  }, [location]);

  useEffect(() => {
    //guard clause - if we don't have the weather  exit out of this function
    if (!weather) return;
    console.log("Weather updated:", weather);
  }, [weather]);

  const getWeatherIcon = (code: number) => {
    // Maps Open-Meteo WMO codes to OpenWeather Map icon codes
    if (code === 0) return "01d"; // Sunny
    if (code >= 1 && code <= 3) return "02d"; // Partly Cloudy
    if (code === 45 || code === 48) return "50d"; // Foggy
    if (code >= 51 && code <= 67) return "10d"; // Rain
    if (code >= 71 && code <= 77) return "13d"; // Snow
    if (code >= 80 && code <= 82) return "09d"; // Rain Showers
    if (code >= 95 && code <= 99) return "11d"; // Thunderstorm
    return "03d"; // Default cloudy
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* ── NAVBAR ── */}
      <nav>
        <h1 className="text-blue-600 text-3xl font-bold">Weather App</h1>
        <div>
          {user ? (
            <div>
              <span>Hi, {user}</span>
              <button onClick={() => setUser(null)}>Log Out</button>
            </div>
          ) : (
            <div>
              <button onClick={() => setShowLogin(true)}>Log In</button>
              <button onClick={() => setShowSignUp(true)}>Sign Up</button>
            </div>
          )}
        </div>
      </nav>

      {/* ── CURRENT WEATHER ── */}
      {weather && weather.current ? (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h1 className="text-4xl font-bold">
            {Math.round(weather.current.temperature_2m)}°C
          </h1>
          <p className="text-gray-600">
            Feels like {Math.round(weather.current.apparent_temperature)}°C
          </p>
          <p className="text-sm text-gray-400">
            Humidity: {weather.current.relative_humidity_2m}% | Wind:{" "}
            {weather.current.wind_speed_10m} km/h
          </p>
          <img
            src={`https://openweathermap.org/img/wn/${getWeatherIcon(weather.current.weather_code)}@2x.png`}
            alt="Weather condition graphic"
            className="w-16 h-16 object-contain"
            onError={(e) => {
              // If the image server fails, fallback to a standard emoji text display
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      ) : (
        <p>Loading weather...</p>
      )}

      {/* ── HOURLY FORECAST ── */}
      {weather && weather.hourly && weather.hourly.time && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Hourly Forecast
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {weather.hourly.time
              .map((timeString: string, index: number) => ({
                timeString,
                index,
              }))
              // 1. Filter out data points that are in the past (older than the current hour)
              .filter(({ timeString }: {timeString: string}) => {
                const itemTime = new Date(timeString).getTime();
                const currentHourStart = new Date().setMinutes(0, 0, 0);
                return itemTime >= currentHourStart;
              })
              // 2. Take the next 8 hours starting from right now
              .slice(0, 8)
              .map(
                ({
                  timeString,
                  index,
                }: {
                  timeString: string;
                  index: number;
                }) => (
                  <div
                    key={timeString}
                    className="bg-slate-50 p-4 rounded-lg min-w-[110px] text-center border border-slate-100"
                  >
                    <p className="text-sm font-semibold text-gray-600">
                      {new Date(timeString).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        hour12: true,
                      })}
                    </p>
                    <p className="text-2xl font-bold text-blue-600 mt-1">
                      {Math.round(weather.hourly.temperature_2m[index])}°C
                    </p>
                    <img
                      src={`https://openweathermap.org/img/wn/${getWeatherIcon(weather.hourly.weather_code[index])}.png`}
                      alt="hourly weather icon"
                      className="mx-auto mt-1 w-10 h-10"
                    />
                  </div>
                ),
              )}
          </div>
        </div>
      )}

      {/* ── SAVED LOCATIONS — only when logged in ── */}
      {user && (
        <div>
          <h2>Saved Locations</h2>
          <input type="text" placeholder="Search for a city..." />
          <p>No saved locations yet</p>
        </div>
      )}

      {/* ── SIGN UP MODAL ── */}
      {showSignUp && (
        <div>
          <div>
            <h2>Sign Up</h2>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button>Create Account</button>
            <button onClick={() => setShowSignUp(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* ── LOGIN MODAL ── */}
      {showLogin && (
        <div>
          <div>
            <h2>Log In</h2>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button>Log In</button>
            <button onClick={() => setShowLogin(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
