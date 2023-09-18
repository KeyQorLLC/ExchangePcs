import React, { useState } from "react";

interface LoginPopupProps {
  onClose: () => void;
  setRole: (role: string) => void;
}

interface LoginInfo {
  _id: string;
  name: string;
  email: string;
  role: string;
  token: string;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ onClose, setRole }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        const responseData: LoginInfo = await response.json();
        setRole(responseData.role);
        sessionStorage.setItem("KeyqorUserId", responseData._id);
        sessionStorage.setItem("KeyqorUsername", responseData.name);
        sessionStorage.setItem("KeyqorRole", responseData.role);
        sessionStorage.setItem("KeyqorKey", responseData.token);
        onClose();
      } else if (response.status === 400) {
        setPasswordsMatch(false);
      }
    } catch (error) {
      console.log("Network error:", error);
    }
  };

  return (
    <div className="bg-kpopPink p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold text-white mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="text-white block mb-1">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-kpopBlue"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="text-white block mb-1">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-kpopBlue"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          {!passwordsMatch && (
            <p className="text-red-500 text-sm mt-1">Incorrect password</p>
          )}
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-kpopPink text-white rounded-md hover:bg-kpopYellow transition duration-300"
        >
          Login
        </button>
      </form>
      <button
        className="mt-4 px-4 py-2 bg-kpopPink text-white rounded-md hover:bg-kpopYellow transition duration-300"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};

export default LoginPopup;
