import CardDisplay from "../Card/CardDisplay";

interface DashboardPageProps {
  setRole: (role: string) => void;
}

const UserDashboard: React.FC<DashboardPageProps> = ({ setRole }) => {
  const handleLogout = () => {
    setRole("");
  };
  return (
    <>
      <div className="bg-gradient-to-r from-kpopPink to-white">
        <CardDisplay />
        <button
          onClick={handleLogout}
          className="absolute bottom-4 right-4 px-6 py-3 text-xl bg-kpopBlue text-white rounded-md shadow-md hover:bg-kpopYellow"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default UserDashboard;
