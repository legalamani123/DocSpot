import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/common/Home";
import Login from "./components/common/Login";
import Register from "./components/common/Register";
import UserHome from "./components/user/UserHome";
import AdminHome from "./components/admin/AdminHome";
import UserAppointments from "./components/user/UserAppointments";
import { useEffect, useState } from "react";


function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(!!localStorage.getItem("userData"));
  const [userType, setUserType] = useState(() => {
    const user = localStorage.getItem("userData");
    return user ? JSON.parse(user).type : null;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const user = localStorage.getItem("userData");
      if (user) {
        setUserLoggedIn(true);
        setUserType(JSON.parse(user).type);
      } else {
        setUserLoggedIn(false);
        setUserType(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {userLoggedIn && userType === "admin" && (
          <Route path="/adminhome" element={<AdminHome />} />
        )}
        {userLoggedIn && userType === "user" && (
          <>
            <Route path="/userhome" element={<UserHome />} />
            <Route path="/userhome/userappointments/:doctorId" element={<UserAppointments />} />
          </>
        )}
      </Routes>
    </Router>
  );
}
export default App;