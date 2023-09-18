import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeView from "./components/Home/HomeView";
import AdminDashboard from "./components/Admin/Dashboard";
import { useEffect, useState } from "react";
import UserDashboard from "./components/User/Dashboard";
import Userpage from "./components/User/Userpage";

const App: React.FC = () => {
  const [role, setRole] = useState("");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              (sessionStorage.getItem("KeyqorRole") || role) === "" ? (
                <HomeView setRole={setRole} />
              ) : (sessionStorage.getItem("KeyqorRole") || role) === "Admin" ? (
                <AdminDashboard setRole={setRole} />
              ) : (
                <UserDashboard setRole={setRole} />
              )
            }
          />
          <Route path="/user/:userid" element={<Userpage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
