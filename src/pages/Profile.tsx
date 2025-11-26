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

      <div className="max-w-[1200px] mx-auto px-6 py-16">

        {/* USER INFO */}
        <div className="flex items-center gap-6">
          <img
            src="/user.png"
            className="w-28 h-28 rounded-full border border-gray-400 object-cover"
            alt="User"
          />

          <div>
            <h2 className="text-2xl font-semibold">Sithomola Musiki</h2>
            <p className="text-gray-600">musiki@gmail.com</p>
            <p className="text-gray-600">0790518213</p>
          </div>

          <button
            onClick={() => navigate("/edit-profile")}
            className="ml-auto px-5 py-2 w-50 bg-[#DC9E38] text-black rounded-lg hover:bg-[#c78e2d]"
          >
            Edit
          </button>
        </div>

        {/* LINE */}
        <div className="my-10 border-b border-gray-300"></div>

        {/* MY BOOKINGS */}
        <h3 className="text-xl font-semibold mb-4">My Bookings</h3>

        <div className="flex items-center gap-6 p-5 bg-white rounded-xl shadow-md mb-6">
          <img
            src="/royal.png"
            className="w-40 h-28 rounded-lg object-cover"
            alt="Royal Suite"
          />

          <div className="flex flex-col flex-1">
            <h4 className="text-lg font-semibold">Royal Suite</h4>
            <p className="text-gray-600 text-sm">21 Nov - 23 Nov</p>
            <p className="text-gray-600 text-sm">
              <span className="font-semibold">Status:</span> Upcoming
            </p>
          </div>

          <button
            onClick={() => navigate("/receipt/royal-suite")}
            className="px-4 py-2 bg-[#DC9E38] w-50 text-black rounded-lg hover:bg-[#c78e2d]"
          >
            View Receipt
          </button>
        </div>

        {/* LINE */}
        <div className="my-10 border-b border-gray-300"></div>

        {/* MY FAVORITES */}
        <h3 className="text-xl font-semibold mb-4">My Favorites</h3>

        <div className="flex items-center gap-6 p-5 bg-white rounded-xl shadow-md mb-6">

          {/* Room Image */}
          <img
            src="/SUPERIOR.png"
            className="w-40 h-28 rounded-lg object-cover"
            alt="Superior Room"
          />

          {/* Room Info */}
          <div className="flex flex-col flex-1">
            <h4 className="text-lg font-semibold">Superior Room</h4>

            <div className="flex items-center gap-2 text-sm">
              <img src="/star.png" className="w-4 h-4" />
              <span>4.9</span>
            </div>

            <p className="text-gray-600 text-sm">
              56 Railway Street, Annadale
            </p>
          </div>

          {/* Heart Icon */}
          <button
            onClick={() => setLiked(!liked)}
            className="text-2xl cursor-pointer mr-4"
          >
            <FaHeart className={liked ? "text-red-500" : "text-gray-400"} />
          </button>

          {/* View Details Button */}
          <button
            onClick={() => navigate("/booking/superior")}
            className="px-4 py-2 bg-[#DC9E38] text-black rounded-lg hover:bg-[#c78e2d]"
          >
            View More Details
          </button>
        </div>

        {/* LINE */}
        <div className="my-10 border-b border-gray-300"></div>

        {/* LOGOUT BUTTON */}
        <button
          onClick={() => navigate("/signin")}
          className="w-2xs py-3 bg-[#DC9E38] ml-100 text-black rounded-lg hover:bg-[#c78e2d]"
        >
          Logout
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default ProfilePage;
