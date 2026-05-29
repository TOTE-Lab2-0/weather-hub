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

const Dashboard = ({ logout, openModal, user }: DashboardProps) => {
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
          <SavedLocationCard />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
