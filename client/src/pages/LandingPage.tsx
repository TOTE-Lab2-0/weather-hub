import WeatherCard from "../components/landing/WeatherCard.tsx";
import NavBar from "../components/shared/NavBar.tsx";
import CTACard from "../components/landing/CTACard.tsx";
import DashboardLinkCard from "../components/landing/DashboardLinkCard.tsx";
import HourlyForecast from "../components/details/HourlyForecast.tsx";

import useWeather from "../hooks/useWeather.ts";

const LandingPage = ({ location, logout, openModal, user }) => {
  const { weatherData, isLoading, error } = useWeather(
    location?.lat,
    location?.lng,
  );

  return (
    <>
      {error ? (
        <p>Something went wrong loading weather data.</p>
      ) : (
        <>
          <NavBar logout={logout} openModal={openModal} user={user} />
          <div className="min-h-screen bg-[#EEF4F8]">
            <div className="px-4 pt-15 pb-6 max-w-3xl mx-auto">
              <p className="text-xs font-semibold tracking-widest text-gray-500 mb-1">
                LIVE CONDITIONS
              </p>
              <h1 className="text-4xl font-black text-gray-900 mb-6">
                Your weather, <span className="text-[#09b8d4]">right now.</span>
              </h1>
              <WeatherCard weatherData={weatherData} isLoading={isLoading} />
              <HourlyForecast weatherData={weatherData} isLoading={isLoading} openModal={openModal} variant={'light'}/>
              {!user ? (
                <CTACard openModal={openModal} />
              ) : (
                <DashboardLinkCard user={user} />
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LandingPage;
