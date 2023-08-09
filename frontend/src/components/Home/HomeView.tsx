import React, { useState } from "react";
import LoginPopup from "../Auth/LoginPopup";
import RegisterPopup from "../Auth/RegisterPopup";

interface HomeViewProps {
  setRole: (role: string) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ setRole }) => {
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setRegisterPopupOpen] = useState(false);

  const handleLoginClick = () => {
    setLoginPopupOpen(true);
  };

  const handleRegisterClick = () => {
    setRegisterPopupOpen(true);
  };

  const closeLoginPopup = () => {
    setLoginPopupOpen(false);
  };

  const closeRegisterPopup = () => {
    setRegisterPopupOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-kpopPink to-kpopPurple">
      <div className="text-4xl mb-4">
        <img
          src="../public/starbook.png"
          alt="Yellow Star"
          className="w-[200px] h-[200px]"
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <button
          className="px-6 py-3 text-xl bg-kpopPink text-white rounded-md shadow-md hover:bg-kpopYellow transition duration-300"
          onClick={handleLoginClick}
        >
          Login
        </button>
        <button
          className="px-6 py-3 text-xl bg-kpopPink text-white rounded-md shadow-md hover:bg-kpopYellow transition duration-300"
          onClick={handleRegisterClick}
        >
          Register
        </button>
      </div>
      {isLoginPopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <LoginPopup onClose={closeLoginPopup} setRole={setRole} />
        </div>
      )}
      {isRegisterPopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <RegisterPopup onClose={closeRegisterPopup} />
        </div>
      )}
    </div>
  );
};

export default HomeView;
