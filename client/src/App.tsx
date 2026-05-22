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
import NavBar from './components/NavBar.tsx'
import LandingPage from './pages/LandingPage.tsx'
import Dashboard from "./pages/Dashboard.tsx";

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
      },
    );
  }, []);

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
      } catch (err) {
        console.error("Weather fetch failed:", err);
      }
    };

    fetchWeather();
  }, [location]);

  return (
    <div>
      <NavBar setShowLogin={setShowLogin} setShowSignUp={setShowSignUp}/>
      <LandingPage weather={weather} showLogin={showLogin} showSignUp={showSignUp} setShowLogin={setShowLogin} setShowSignUp={setShowSignUp}/>

      
    </div>
  );
}

export default App;
