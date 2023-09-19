import React, { useState } from "react";

interface RegisterPopupProps {
  onClose: () => void;
  setRole: (role: string) => void;
}

interface RegisterInfo {
  _id: string;
  name: string;
  email: string;
  role: string;
  token: string;
}

const RegisterPopup: React.FC<RegisterPopupProps> = ({ onClose, setRole }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordsMatch(true);
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordsMatch(true);
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password === confirmPassword) {
      console.log("Email:", email);
      console.log("Password:", password);
      console.log("Confirm Password:", confirmPassword);
      try {
        const response = await fetch(`/api/user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        });
        if (response.status === 400) {
          console.log("User Exists");
        } else if (response.status === 201) {
          const responseData: RegisterInfo = await response.json();
          console.log(responseData);
          setRole(responseData.role);
        }
      } catch (error) {
        console.log("Network error:", error);
      }
    } else {
      setPasswordsMatch(false);
    }
  };

  return (
    <div className="bg-kpopPink p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold text-white mb-4">Register</h2>
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
          <label htmlFor="name" className="text-white block mb-1">
            Name:
          </label>
          <input
            type="text"
            id="email"
            className="w-full px-3 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-kpopBlue"
            value={name}
            onChange={handleNameChange}
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
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="text-white block mb-1">
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            className={`w-full px-3 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring ${
              passwordsMatch ? "focus:border-kpopBlue" : "focus:border-red-500"
            }`}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          {!passwordsMatch && (
            <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
          )}
        </div>
        <button
          type="submit"
          disabled={!passwordsMatch}
          className={`mt-4 px-4 py-2 bg-kpopPink text-white rounded-md ${
            passwordsMatch
              ? "hover:bg-kpopYellow"
              : "opacity-50 cursor-not-allowed"
          } transition duration-300`}
        >
          Register
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

export default RegisterPopup;
