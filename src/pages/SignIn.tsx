
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { authService } from "../services/authService";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await authService.signIn({ email, password });
      navigate("/home");
    } catch (err: any) {
      console.error("Sign in error:", err);
      
      // Better error messages
      if (err.response?.status === 500) {
        const errorData = err.response?.data;
        if (errorData?.error === 'Database error') {
          setError("Database connection error. Please contact support or try again later.");
        } else {
          setError("Server error. Please try again later.");
        }
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Failed to sign in. Please check your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar />
    <div className="w-full flex justify-center mt-20 py-8 sm:py-12 md:py-16 bg-white px-4 md:px-8">
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between bg-white px-4 sm:px-6 py-6 sm:py-8 rounded gap-4 sm:gap-6">

        {/* Left Image */}
        <div className="hidden md:block shrink-0">
          <img src="/left icon.png" alt="Left Icon" className="w-24 md:w-28 lg:w-32 h-24 md:h-28 lg:h-32 object-contain" />
        </div>

        {/* Form */}
        <div className="flex-1 w-full max-w-md">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-2 text-black">Sign In</h2>
          <p className="text-center text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
            Please sign in to continue booking...
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label className="block text-black mb-1">Email Address:</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded mb-4 outline-none text-black"
            />

            <label className="block text-black mb-1">Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded mb-6 outline-none text-black"
            />
            
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#DC9E38] text-black py-3 rounded font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

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

          <button className="w-full py-3 border-2 border-[#DC9E38] rounded flex items-center justify-center gap-3 text-black">
            Sign up with Google
          </button>
        </div>

        {/* Right Image */}
        <div className="hidden md:block shrink-0">
          <img src="/right  icon.png" alt="Right Icon" className="w-24 md:w-28 lg:w-32 h-24 md:h-28 lg:h-32 object-contain" />
        </div>

      </div>
    </div>
    </>
  );
};

export default SignIn;
