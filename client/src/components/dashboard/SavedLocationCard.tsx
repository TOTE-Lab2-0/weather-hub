import { Link } from "react-router-dom";
import useWeather from "../../hooks/useWeather";

type SavedLocationCardProps = {
  _id: string;
  locationName: string;
  lat: number;
  lng: number;
  onDelete: (id: string) => void
};

const SavedLocationCard = ({ _id, locationName, lat, lng, onDelete }: SavedLocationCardProps) => {
  const { weatherData, isLoading, error } = useWeather(lat, lng)

  return (
    <>
      {error ? <p>Unable to load weather</p> : 
        <div className="bg-white border-t-4 border-t-[#09b8d4] rounded-lg shadow-md p-4 flex items-center justify-between mb-4">
        {isLoading || !weatherData ? 
         <div className='flex items-center justify-center h-16 w-full'>
           <div className="animate-spin rounded-full h-6 w-6 border-4 border-gray-200 border-t-[#09b8d4]"></div>
         </div>
        :
         <>
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-1">{locationName}, {weatherData.city.principalSubdivision}</h2>
            <p className="text-2xl font-bold text-slate-900 mb-1">{Math.round(weatherData.weather.current.temperature_2m)}°F</p>
            <p className="text-slate-500 text-sm">H: {Math.round(weatherData.weather.daily.temperature_2m_max[0])}° L: {Math.round(weatherData.weather.daily.temperature_2m_min[0])}°</p>
          </div>
          <div className="flex items-center gap-2">
            <Link to={`/locations/${_id}`} className="px-4 py-2 rounded-lg bg-[#09b8d4] text-white text-sm font-semibold hover:bg-[#09b8d4]/80">Details</Link>
            <button className="px-3 py-2 rounded-lg border border-slate-300 text-slate-400 text-sm hover:bg-slate-100" onClick={() => onDelete(_id)}>🗑</button>
          </div>
        </>
        }
        </div>
      }
    </>
  );
};

export default SavedLocationCard;
