import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userService } from "../services/userService";
import type { User } from "../services/userService";
import { bookingService } from "../services/bookingService";
import type { Booking } from "../services/bookingService";
import { authService } from "../services/authService";

const ProfilePage = () => {
  const [liked, setLiked] = useState(true);
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingsError, setBookingsError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await userService.getProfile();
        setUser(userData);
      } catch (err: any) {
        // Fallback to localStorage user if API fails
        const localUser = authService.getCurrentUser();
        if (localUser) {
          setUser(localUser);
        } else {
          // If no user data at all, redirect to sign in
          console.error("Error fetching user profile:", err);
          if (err.response?.status === 401 || err.response?.status === 400) {
            // Invalid token or bad request - clear auth and redirect
            authService.logout();
            navigate("/signin");
            return;
          }
        }
      }

      // Fetch bookings separately
      try {
        const userBookings = await bookingService.getUserBookings();
        // Ensure bookings is always an array
        if (Array.isArray(userBookings)) {
          setBookings(userBookings);
          setBookingsError("");
        } else {
          console.warn("Bookings data is not an array:", userBookings);
          setBookings([]);
          setBookingsError("Bookings data format is invalid");
        }
      } catch (err: any) {
        console.error("Error fetching bookings:", err);
        setBookings([]);
        setBookingsError(err.response?.data?.message || "Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    if (authService.isAuthenticated()) {
      fetchData();
    } else {
      navigate("/signin");
    }
  }, [navigate]);

  const handleLogout = async () => {
    await authService.logout();
    navigate("/signin");
  };

  if (loading) {
    return (
      <div className="w-full bg-gray-50 mt-20 min-h-screen">
        <Navbar />
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
          <p className="text-center">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-full bg-gray-50 mt-20 min-h-screen">
        <Navbar />
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
          <p className="text-center text-red-600">Failed to load profile. Please sign in again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 mt-20 min-h-screen">
      <Navbar />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">

        {/* USER INFO */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <img
            src={user.profileImage || "/user.png"}
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border border-gray-400 object-cover"
            alt="User"
          />

          <div className="flex-1">
            <h2 className="text-xl sm:text-xl md:text-2xl font-semibold">{user.fullName}</h2>
            <p className="text-gray-600 text-sm sm:text-base">{user.email}</p>
            <p className="text-gray-600 text-sm sm:text-base">{user.phone}</p>
          </div>

          <button
            onClick={() => navigate("/edit-profile")}
            className="w-full sm:w-auto px-4 sm:px-5 py-2 bg-[#DC9E38] text-black rounded-lg hover:bg-[#c78e2d] text-sm sm:text-base"
          >
            Edit
          </button>
        </div>

        {/* LINE */}
        <div className="my-10 border-b border-gray-300"></div>

        {/* MY BOOKINGS */}
        <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">My Bookings</h3>

        {bookingsError && (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl mb-4 sm:mb-6">
            <p className="text-yellow-800 text-sm">⚠️ {bookingsError}</p>
          </div>
        )}

        {!bookingsError && bookings.length === 0 ? (
          <div className="p-4 bg-white rounded-xl shadow-md mb-4 sm:mb-6">
            <p className="text-gray-600 text-sm">No bookings found.</p>
          </div>
        ) : (
          Array.isArray(bookings) && bookings.map((booking) => (
            <div key={booking.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 sm:p-5 bg-white rounded-xl shadow-md mb-4 sm:mb-6">
              <img
                src="/royal.png"
                className="w-full sm:w-32 md:w-40 h-[150px] sm:h-24 md:h-28 rounded-lg object-cover"
                alt={booking.roomName}
              />

              <div className="flex flex-col flex-1 w-full sm:w-auto">
                <h4 className="text-base sm:text-lg font-semibold">{booking.roomName}</h4>
                <p className="text-gray-600 text-xs sm:text-sm">
                  {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                </p>
                <p className="text-gray-600 text-xs sm:text-sm">
                  <span className="font-semibold">Status:</span> {booking.status}
                </p>
              </div>

              <button
                onClick={() => navigate(`/confirmation?bookingId=${booking.id}`)}
                className="w-full sm:w-auto px-4 py-2 bg-[#DC9E38] text-black rounded-lg hover:bg-[#c78e2d] text-sm sm:text-base"
              >
                View Receipt
              </button>
            </div>
          ))
        )}

        {/* LINE */}
        <div className="my-10 border-b border-gray-300"></div>

        {/* MY FAVORITES */}
        <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">My Favorites</h3>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 sm:p-5 bg-white rounded-xl shadow-md mb-4 sm:mb-6">

          {/* Room Image */}
          <img
            src="/SUPERIOR.png"
            className="w-full sm:w-32 md:w-40 h-[150px] sm:h-24 md:h-28 rounded-lg object-cover"
            alt="Superior Room"
          />

          {/* Room Info */}
          <div className="flex flex-col flex-1 w-full sm:w-auto">
            <h4 className="text-base sm:text-lg font-semibold">Superior Room</h4>

            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <img src="/star.png" className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>4.9</span>
            </div>

            <p className="text-gray-600 text-xs sm:text-sm">
              56 Railway Street, Annadale
            </p>
          </div>

          {/* Heart Icon */}
          <button
            onClick={() => setLiked(!liked)}
            className="text-xl sm:text-2xl cursor-pointer self-start sm:self-center"
          >
            <FaHeart className={liked ? "text-red-500" : "text-gray-400"} />
          </button>

          {/* View Details Button */}
          <button
            onClick={() => navigate("/booking/superior")}
            className="w-full sm:w-auto px-4 py-2 bg-[#DC9E38] text-black rounded-lg hover:bg-[#c78e2d] text-sm sm:text-base"
          >
            View More Details
          </button>
        </div>

        {/* LINE */}
        <div className="my-10 border-b border-gray-300"></div>

        {/* LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          className="w-full sm:w-auto max-w-xs py-2 sm:py-3 bg-[#DC9E38] ml-0 sm:ml-auto text-black rounded-lg hover:bg-[#c78e2d] text-sm sm:text-base"
        >
          Logout
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default ProfilePage;
