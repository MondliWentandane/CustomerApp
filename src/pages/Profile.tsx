import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [liked, setLiked] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="w-full bg-gray-50 mt-20 min-h-screen">
      <Navbar />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">

        {/* USER INFO */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <img
            src="/user.png"
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border border-gray-400 object-cover"
            alt="User"
          />

          <div className="flex-1">
            <h2 className="text-xl sm:text-xl md:text-2xl font-semibold">Sithomola Musiki</h2>
            <p className="text-gray-600 text-sm sm:text-base">musiki@gmail.com</p>
            <p className="text-gray-600 text-sm sm:text-base">0790518213</p>
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

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 sm:p-5 bg-white rounded-xl shadow-md mb-4 sm:mb-6">
          <img
            src="/royal.png"
            className="w-full sm:w-32 md:w-40 h-[150px] sm:h-24 md:h-28 rounded-lg object-cover"
            alt="Royal Suite"
          />

          <div className="flex flex-col flex-1 w-full sm:w-auto">
            <h4 className="text-base sm:text-lg font-semibold">Royal Suite</h4>
            <p className="text-gray-600 text-xs sm:text-sm">21 Nov - 23 Nov</p>
            <p className="text-gray-600 text-xs sm:text-sm">
              <span className="font-semibold">Status:</span> Upcoming
            </p>
          </div>

          <button
            onClick={() => navigate("/receipt/royal-suite")}
            className="w-full sm:w-auto px-4 py-2 bg-[#DC9E38] text-black rounded-lg hover:bg-[#c78e2d] text-sm sm:text-base"
          >
            View Receipt
          </button>
        </div>

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
          onClick={() => navigate("/signin")}
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
