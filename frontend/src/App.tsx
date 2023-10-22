import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeView from "./components/Home/HomeView";
import AdminDashboard from "./components/Admin/Dashboard";
import { useState } from "react";
import UserDashboard from "./components/User/Dashboard";
import Userpage from "./components/User/Userpage";

const App: React.FC = () => {
  const [role, setRole] = useState("");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeView setRole={setRole} />} />
          <Route
            path="/dashboard"
            element={<UserDashboard setRole={setRole} />}
          />
          <Route path="/admin" element={<AdminDashboard setRole={setRole} />} />
          <Route path="/user/:userid" element={<Userpage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
