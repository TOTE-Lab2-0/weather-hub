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
import { Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage.tsx'
import AuthModal from './components/shared/AuthModal.tsx'
import Dashboard from "./pages/Dashboard.tsx";
import DetailPage from "./pages/DetailPage.tsx";
import LoadingScreen from "./components/shared/LoadingScreen.tsx";

const ProtectedRoute = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to='/' replace/>
  }
  return <Outlet />
}

function App() {
  const [ verifying, setVerifying ] = useState(false)

  const [ isModalOpen, setIsModalOpen ] = useState(false);

  const [ modalMode, setModalMode ] = useState<'signup' | 'login' | null>(null)

  const [ isLoggedIn, setIsLoggedIn ] = useState(false);

  const [user, setUser] = useState(null);

  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  const navigate = useNavigate()

  useEffect(() => {
    const verifyUser = async () => {
      setVerifying(true)
      try {
        const res = await fetch('/api/auth/verify', {
          method: 'GET',
          credentials: 'include'
        })

        if (res.ok) {
          const data = await res.json()
          setUser(data)
          setIsLoggedIn(true)
        }
      } catch(err) {
        console.error('Auth error', err)
      } finally {
        setVerifying(false)
      }
    }
    verifyUser()
  }, [])

  const handleLogOut = async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      })

      if (!res.ok) {
        throw new Error("Logout Failed")
      }

      setUser(null)
      setIsLoggedIn(false)
      navigate('/')
    } catch(err) {
      console.error(err)
    }
  }

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

  const onOpenModal = (mode: 'signup' | 'login') => {
    setIsModalOpen(true)
    setModalMode(mode)
  }

  const onCloseModal = () => {
    setIsModalOpen(false)
  }

  const onAuthSuccess = (user) => {
    setUser(user)
    setIsLoggedIn(true)
    setIsModalOpen(false)
    navigate("/location/current")
  }

  return ( 
    <>
      {verifying ? <LoadingScreen /> : 
        <div>
          <AuthModal onClose={onCloseModal} onAuthSuccess={onAuthSuccess} initialMode={modalMode} isOpen={isModalOpen}/>
          <Routes>
            <Route path="/" element={<LandingPage location={location} logOut={handleLogOut} openModal={onOpenModal} user={user}/>} />

            <Route element={<ProtectedRoute isAuthenticated={isLoggedIn} />}>
              <Route path="/dashboard" element={<Dashboard logOut={handleLogOut} openModal={onOpenModal} user={user}/>} />
              <Route path="/location/current" element={<DetailPage location={location}/>} />
            </Route>
          </Routes>
        </div>
      }
    </>
  );
}

export default App;
