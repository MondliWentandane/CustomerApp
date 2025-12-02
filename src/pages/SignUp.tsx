import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { authService } from "../services/authService";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await authService.signUp(formData);
      navigate("/home");
    } catch (err: any) {
      console.error("Sign up error:", err);
      
      // Better error messages
      if (err.response?.status === 404) {
        setError("Sign up route not found. Please check if the backend is deployed correctly.");
      } else if (err.response?.status === 500) {
        const errorData = err.response?.data;
        if (errorData?.error === 'Database error' || errorData?.error === 'Signup failed') {
          if (errorData?.details?.includes('Tenant or user not found')) {
            setError("Database connection issue. Please verify Supabase credentials are correct in Render.");
          } else {
            setError("Database connection error. Please contact support or try again later.");
          }
        } else {
          setError("Server error. Please try again later.");
        }
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Failed to sign up. Please check your connection and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
       <div className="w-full flex justify-center py-8 sm:py-12 md:py-16 bg-white mt-20 px-4 md:px-8">
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between bg-white px-4 sm:px-6 py-6 sm:py-8 rounded gap-4 sm:gap-6">

        {/* Left Image */}
        <div className="hidden md:block shrink-0">
          <img src="/left icon.png" alt="Left Icon" className="w-24 md:w-28 lg:w-32 h-24 md:h-28 lg:h-32 object-cover" />
        </div>

        {/* Form */}
        <div className="flex-1 w-full max-w-md">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-2 text-black">Create Your Account</h2>
          <p className="text-center text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
            Please sign up or click sign in to continue booking...
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label className="block text-black mb-1">Full Name:</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded mb-4 outline-none text-black"
            />

            <label className="block text-black mb-1">Email Address:</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded mb-4 outline-none text-black"
            />

            <label className="block text-black mb-1">Phone Number:</label>
            <input
              type="text"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded mb-4 outline-none text-black"
            />

            <label className="block text-black mb-1">Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-4 py-3 border rounded mb-6 outline-none text-black"
            />

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#DC9E38] text-black py-3 rounded font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center mt-4 text-black">
            Already have an account?{" "}
            <Link to="/signin">
            <span className="text-[#DC9E38] font-semibold cursor-pointer">Sign in</span>
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
          <img src="/right  icon.png" alt="Right Icon" className="w-24 md:w-28 lg:w-32 h-24 md:h-28 lg:h-32 object-cover" />
        </div>

      </div>
    </div>
    </div>
  );
};

export default SignUp;
