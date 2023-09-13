import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeView from "./components/Home/HomeView";
import AdminDashboard from "./components/Admin/Dashboard";
import { useState } from "react";
import UserDashboard from "./components/User/Dashboard";

const App: React.FC = () => {
  const [role, setRole] = useState("");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserDashboard />} />
          <Route
            path="/admin"
            element={
              role === "" ? (
                <HomeView setRole={setRole} />
              ) : role === "Admin" ? (
                <AdminDashboard setRole={setRole} />
              ) : (
                <HomeView setRole={setRole} />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
