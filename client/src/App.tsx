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
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import LandingPage from "./pages/LandingPage.tsx";
import AuthModal from "./components/shared/AuthModal.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import DetailPage from "./pages/DetailPage.tsx";
import LoadingScreen from "./components/shared/LoadingScreen.tsx";
import useAuth from "./hooks/useAuth.ts";

const ProtectedRoute = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalMode, setModalMode] = useState<"signup" | "login">("login");

  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null,
  );

  const { user, verifying, isLoggedIn, handleLogOut, onAuthSuccess } =
    useAuth();

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

  const onOpenModal = (mode: "signup" | "login") => {
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {verifying ? (
        <LoadingScreen />
      ) : (
        <div>
          {isModalOpen && (
            <AuthModal
              onClose={onCloseModal}
              onAuthSuccess={onAuthSuccess}
              initialMode={modalMode}
              isOpen={isModalOpen}
            />
          )}
          <Routes>
            <Route
              path="/"
              element={
                <LandingPage
                  location={location}
                  logout={handleLogOut}
                  openModal={onOpenModal}
                  user={user}
                />
              }
            />

            <Route element={<ProtectedRoute isAuthenticated={isLoggedIn} />}>
              <Route
                path="/dashboard"
                element={
                  <Dashboard
                    logout={handleLogOut}
                    openModal={onOpenModal}
                    user={user}
                  />
                }
              />
              <Route
                path="/location/current"
                element={<DetailPage location={location} />}
              />
            </Route>
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
