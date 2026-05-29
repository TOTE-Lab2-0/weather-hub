import { useState, useEffect } from "react";
import NavBar from "../components/shared/NavBar";
import SearchBar from "../components/dashboard/SearchBar";
import SavedLocationCard from "../components/dashboard/SavedLocationCard";

type User = {
  id: string;
  name: string;
  email: string;
};

type DashboardProps = {
  logout: () => void;
  openModal: (mode: "login" | "signup") => void;
  user: User;
};

type SavedLocation = {
  _id: string;
  locationName: string;
  lat: number;
  lng: number;
};

const Dashboard = ({ logout, openModal, user }: DashboardProps) => {
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSavedLocations = async () => {
 
      setIsLoading(true);
      try {
        const response = await fetch("/api/locations", {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error("Something went wrong. Please try again");
        }

        setSavedLocations(data.saved_locations);
      } catch (err) {
        console.error("Saved locations fetch failed", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSavedLocations();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/locations/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      })

      if (!res.ok) {
        throw new Error('Card delete failed')
      }

      setSavedLocations(prev => prev.filter(loc => loc._id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <NavBar logout={logout} openModal={openModal} user={user} />

      <main className="min-h-screen bg-[#EEF4F8]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <p className="text-sm font-semibold tracking-widest text-slate-500 mb-4">
            YOUR LOCATIONS
          </p>

          <h1 className="text-4xl font-bold text-slate-900 mb-10">
            My Locations
          </h1>

          <SearchBar />

          {isLoading && <p>Loading saved locations...</p>}

          {!isLoading && savedLocations.length === 0 && (
            <div className="bg-white border-t-4 border-t-[#09b8d4] rounded-lg shadow-md px-8 py-12 text-center max-w-3xl">
              <p className="text-3xl mb-4">📍</p>
              <p className="text-slate-700 font-semibold mb-2">No saved locations yet</p>
              <p className="text-slate-400 text-sm">Search for a city above to get started.</p>
            </div>
          )}

          {savedLocations.map((location) => (
            <SavedLocationCard
              key={location._id}
              _id={location._id}
              locationName={location.locationName}
              lat={location.lat}
              lng={location.lng}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default Dashboard;
