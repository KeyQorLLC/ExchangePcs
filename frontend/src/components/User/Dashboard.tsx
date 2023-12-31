import { useState } from "react";
import CardDisplay from "../Card/CardDisplay";
import PostPopup from "./PostPopup";
import { useNavigate } from "react-router-dom";

interface DashboardPageProps {
  setRole: (role: string) => void;
}

const UserDashboard: React.FC<DashboardPageProps> = ({ setRole }) => {
  const [isPostPopupOpen, setPostPopupOpen] = useState(false);
  const navigate = useNavigate();

  const openPostPopup = () => {
    setPostPopupOpen(true);
  };

  const closePostPopup = () => {
    setPostPopupOpen(false);
  };

  const handleLogout = () => {
    setRole("");
    navigate("/");
  };

  return (
    <>
      <div className="h-screen bg-gradient-to-r from-kpopPink to-white">
        <CardDisplay />
        <button
          onClick={openPostPopup}
          className="absolute bottom-20 right-4 px-6 py-3 text-xl bg-kpopBlue text-white rounded-md shadow-md hover:bg-kpopYellow"
        >
          Post
        </button>

        <button
          onClick={handleLogout}
          className="absolute bottom-4 right-4 px-6 py-3 text-xl bg-kpopBlue text-white rounded-md shadow-md hover:bg-kpopYellow"
        >
          Logout
        </button>
      </div>
      {isPostPopupOpen ? (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <PostPopup onClose={closePostPopup} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default UserDashboard;
