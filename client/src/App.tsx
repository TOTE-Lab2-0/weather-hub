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
  
  const [showSignUp, setShowSignUp] = useState(false)

  // when user clicks "Log In" button, show the login pop-up. starts hidden
  const [showLogin, setShowLogin] = useState(false)

  // keeps track of who is logged in. starts as nobody
  const [user, setUser] = useState(null)

  //
  const [location, setLocation] = useState(null)

  //
  const [weather, setWeather] = useState(null)

  //react hook - run once after the react component has rendered 
  useEffect(
    () => {
      //navigator.geolocation is a built in web browser API
      navigator.geolocation.getCurrentPosition(
        //how we respond when a user's location is successully accessed
        (position) => {
          setLocation(
            { 
              lat: position.coords.latitude, 
              lng: position.coords.longitude 
            });
      }, () => {
            setLocation({ lat: 45.4229, lng: -122.3762 });
            console.log("Access to user's location denied - default to Boring, Oregon")
      });
    }, []
  );

  console.log('Location:', location);

  //
  useEffect(() => {
    //guard clause - if we don't have the location exit out of this function 
    if(!location) return 

    const fetchWeather = async () => {
      try {
        //send the longitude and latitude we got in the useEffect above to the backend server
        const res = await fetch(`/api/weather?lat=${location.lat}&lng=${location.lng}`)

        //convert the response into a javascript object that is useful to us
        const data = await res.json()

        //update the weather state 
        setWeather(data)

        console.log('Weather Data:', data);

      } catch (err) {
        console.error('Weather fetch failed:', err)
      }
    }

    fetchWeather()
  }, [location])

  return (
    <div>

      {/* ── NAVBAR ── */}
      <nav>
        <h1>Weather App</h1>
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

      {/* ── CURRENT WEATHER — always visible ── */}
      <div>
        <h1>72°F</h1>
        <p>Sunny</p>
        <p>Feels like 70°F</p>
      </div>

      {/* ── HOURLY FORECAST — always visible ── */}
      <div>
        {["Now","3pm","6pm","9pm","12am","3am","6am","9am"].map(hour => (
          <div key={hour}>
            <p>{hour}</p>
            <p>70°</p>
          </div>
        ))}
      </div>

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
  )
}



export default App