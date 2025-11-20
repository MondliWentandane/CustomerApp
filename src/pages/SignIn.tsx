
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
const SignIn = () => {
  return (
    <>
    <Navbar />
    <div className="w-full flex justify-center py-16 bg-white px-4 md:px-8">
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between bg-white px-6 py-8 rounded gap-6">

        {/* Left Image */}
        <div className="hidden md:block shrink-0">
          <img src="/left icon.png" alt="Left Icon" className="w-32 h-32 object-contain" />
        </div>

        {/* Form */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-center mb-2 text-black">Sign In</h2>
          <p className="text-center text-gray-600 mb-6">
            Please sign in to continue booking...
          </p>

          <label className="block text-black mb-1">Email Address:</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 border rounded mb-4 outline-none text-black"
          />

          <label className="block text-black mb-1">Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-3 border rounded mb-6 outline-none text-black"
          />
          <Link to="/home">
          <button className="w-full bg-[#DC9E38] text-black py-3 rounded font-semibold">
            Sign In
          </button>
          </Link>

          <p className="text-center mt-4 text-black">
            Don't have an account?{" "}
            <Link to="/signup">
            <span className="text-[#DC9E38] font-semibold cursor-pointer">Sign up</span>
            </Link>
          </p>

          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="mx-4 text-gray-500">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <button className="w-full py-3 border rounded flex items-center justify-center gap-3 text-black">
            Sign in with Google
          </button>
        </div>

        {/* Right Image */}
        <div className="hidden md:block shrink-0">
          <img src="/right  icon.png" alt="Right Icon" className="w-32 h-32 object-contain" />
        </div>

      </div>
    </div>
    </>
  );
};

export default SignIn;
