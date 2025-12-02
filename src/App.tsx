import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Signup from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import ProfilePage from "./pages/Profile";
import Payment from "./pages/Payment";
import ConfirmationPage from "./pages/Confirmation";
import EditProfile from "./pages/EditProfile";
import PayPalCallback from "./pages/PayPalCallback";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/booking/:roomName" element={<Booking />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment/callback" element={<PayPalCallback />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Routes>
    </>
  );
}

export default App;
