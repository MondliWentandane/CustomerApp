import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Signup from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
