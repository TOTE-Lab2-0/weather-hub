import getWeatherIcon from "../../utils/getWeatherIcon.ts";

type HourlyForecastProps = {
  weatherData: {
    weather: {
      hourly: {
        time: string[];
        temperature_2m: number[];
        weather_code: number[];
        precipitation_probability: number[];
      };
    };
  } | null;
  isLoading: boolean;
  openModal?: (mode: "signup" | "login") => void;
  variant: 'light' | 'dark';
  isLoggedIn: boolean;
};

const HourlyForecast = ({
  weatherData,
  isLoading,
  openModal,
  variant,
  isLoggedIn
}: HourlyForecastProps) => {
  const styles = variant === 'dark' ? {
    card: 'mt-6 mb-6 bg-white/10 backdrop-blur-sm p-6 rounded-xl',
    title: 'text-xs text-transform: uppercase font-semibold tracking-widest text-white/60 mb-4',
    hourCard: 'bg-white/10 p-3 rounded-lg min-w-[75px] text-center',
    time: 'text-sm font-semibold text-white/60',
    temp: 'text-lg font-bold text-white mt-1',
    rain: 'text-xs text-white/60 mt-1',
    cta: 'text-sm text-white/60',
  } : {
    card: 'mt-6 mb-6 bg-white p-6 rounded-lg shadow-md border-t-4 border-t-[#09b8d4]',
    title: 'text-xl font-bold mb-4 text-gray-800',
    hourCard: 'bg-slate-50 p-4 rounded-lg min-w-[110px] text-center border border-slate-100',
    time: 'text-sm font-semibold text-gray-600',
    temp: 'text-2xl font-bold text-gray-800 mt-1',
    rain: 'text-xs text-gray-500 mt-1',
    cta: 'text-sm text-gray-500',
  }
  
  if (isLoading) {
    return (
      <div className={styles.card}>
        <h2 className={styles.title}>
          Hourly Forecast
        </h2>
        <div className='flex items-center justify-center h-32'>
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-[#09b8d4]"></div>
        </div>
      </div>
    );
  }
  return (
    <>
      {weatherData &&
        weatherData.weather &&
        weatherData.weather.hourly &&
        weatherData.weather.hourly.time && (
          <div className={styles.card}>
            <h2 className={styles.title}>
              Hourly Forecast
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {weatherData.weather.hourly.time
                .map((timeString: string, index: number) => ({
                  timeString,
                  index,
                }))
                // 1. Filter out data points that are in the past (older than the current hour)
                .filter(({ timeString }: { timeString: string }) => {
                  const itemTime = new Date(timeString).getTime();
                  const currentHourStart = new Date().setMinutes(0, 0, 0);
                  return itemTime >= currentHourStart;
                })
                // 2. Take the next 8 hours starting from right now
                .slice(0, 24)
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
                      className={styles.hourCard}
                    >
                      <p className={styles.time}>
                        {new Date(timeString).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          hour12: true,
                        })}
                      </p>
                      <p className={styles.temp}>
                        {Math.round(
                          weatherData.weather.hourly.temperature_2m[index],
                        )}
                        °F
                      </p>
                      <img
                        src={`https://openweathermap.org/img/wn/${getWeatherIcon(weatherData.weather.hourly.weather_code[index])}.png`}
                        alt="hourly weather icon"
                        className="mx-auto mt-1 w-10 h-10"
                      />

                      <p className={styles.rain}>
                        Rain{" "}
                        {
                          weatherData.weather.hourly.precipitation_probability[
                            index
                          ]
                        }
                        %
                      </p>
                    </div>
                  ),
                )}
            </div>

            {openModal && !isLoggedIn &&
              <div className="mt-5 flex flex-col items-center gap-3 text-center">
                <p className={styles.cta}>
                  Want more? Create an account for the 7-day forecast.
                </p>
                <button
                  type="button"
                  onClick={() => openModal("signup")}
                  className="px-4 py-2 rounded-lg bg-[#09b8d4] text-white text-sm font-semibold hover:bg-[#09b8d4]/80"
                >
                  View 7-Day Forecast
                </button>
              </div>
            }
          </div>
        )}
    </>
  );
};

export default HourlyForecast;
