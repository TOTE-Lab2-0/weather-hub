import { useState } from "react";

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