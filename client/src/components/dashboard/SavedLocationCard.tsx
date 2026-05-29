import { Link } from "react-router-dom";

type SavedLocationCardProps = {
  _id: string;
  locationName: string;
  lat: number;
  lng: number;
};

const SavedLocationCard = ({
  _id,
  locationName,
  lat,
  lng,
}: SavedLocationCardProps) => {
  return (
    <div className="bg-white border-t-4 border-t-[#09b8d4] rounded-lg shadow-md p-8 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          {locationName}
        </h2>

        <p className="text-5xl font-bold text-slate-900 mb-3">62°F</p>

        <p className="text-slate-500 font-semibold">H: 71° L: 48°</p>
      </div>

      <div className="flex items-center gap-3">
        <Link
          to={`/locations/${_id}`}
          className="px-6 py-3 rounded-lg bg-[#09b8d4] text-white font-semibold hover:bg-[#09b8d4]/80"
        >
          Details
        </Link>

        <button className="px-4 py-3 rounded-lg border border-slate-300 text-slate-400 hover:bg-slate-100">
          🗑
        </button>
      </div>
    </div>
  );
};

export default SavedLocationCard;
