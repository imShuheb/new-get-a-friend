import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./components/Home";
import OnboardingForm from "./components/Auth/Onboarding";
import Pending from "./components/Auth/Pending";
import PrivateRoute from "./components/Admin/Private";
import Dashboard from "./components/Admin/Dashboard";
import Users from "./components/Admin/Dashboard/Users";
import Profile from "./components/Profile";
import UserPrivateRoute from "./components/Profile/UserPrivateRoute";
import AOS from 'aos';
import 'aos/dist/aos.css';
import AvailableList from "./components/AvailableList";
import LocationDetails from "./components/Profile/LocationDetails";
import Feedback from "./components/Profile/Feedback";
import AdminFeedback from "./components/Admin/Dashboard/Users/Adminfeedback";

function App() {
  const [user, setUser] = useState(() => {
    const rawUser = localStorage.getItem('user');
    return rawUser ? JSON.parse(rawUser) : null;
  });

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <React.Fragment>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
       
        {/* Auth Routes */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pending" element={<Pending />} />
        <Route path="/on-boarding" element={<OnboardingForm />} />
        <Route path="/Location-details" element={<LocationDetails/>}/>
        <Route path="/feedback" element={<Feedback/>}/>
        <Route path="/admin-feedback" element={<AdminFeedback/>}/>
        <Route path="/profile" element={<UserPrivateRoute element={<Profile />} user={user} />} />
        <Route path="/available-friends/:id?" element={<UserPrivateRoute element={<AvailableList />} user={user} />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<PrivateRoute element={<Dashboard />} isAdmin={user} />}>
          <Route path="users" element={<Users />} />
        </Route>

      </Routes>
    </React.Fragment>
  );
}

export default App;
