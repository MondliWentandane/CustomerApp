import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { roomService } from "../services/roomService";
import type { Room } from "../services/roomService";
import { checkBackendHealth } from "../utils/backendHealth";

const Home = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [backendStatus, setBackendStatus] = useState<string>("");

  useEffect(() => {
    const fetchRooms = async () => {
      // Check backend health first
      const health = await checkBackendHealth();
      setBackendStatus(health.message);

      if (!health.isHealthy) {
        setError(health.message);
        setLoading(false);
        return; // Will use fallback rooms
      }

      try {
        // Fetch rooms for hotel_id 2 (StayEase Luxury Hotel) to avoid duplicates
        // If you want to show all hotels' rooms, we'll use unique keys instead
        const data = await roomService.getAllRooms(2); // Filter by hotel_id 2
        if (data && data.length > 0) {
          setRooms(data);
          setError(""); // Clear any previous errors
          setBackendStatus("✅ Connected to backend");
        } else {
          setError("No rooms found in database. Using default rooms.");
        }
      } catch (err: any) {
        const errorMessage = err.response?.status === 502 
          ? "Backend server is not responding (502). Check if Render backend is accessible: https://backend-89ej.onrender.com"
          : err.response?.status === 404
          ? "Rooms endpoint not found (404). Ensure /api/rooms route exists in your backend."
          : err.response?.status === 503
          ? "Backend service unavailable (503). Backend may be restarting."
          : err.response?.data?.message || "Failed to load rooms from server. Check if backend is running.";
        
        setError(errorMessage);
        console.error("Error fetching rooms:", err);
        // Fallback to hardcoded rooms - the displayRooms logic will handle this
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  // Fallback room data if API fails or returns empty
  const fallbackRooms = [
    { slug: "superior", title: "Superior Rooms", image: "/SUPERIOR.png" },
    { slug: "deluxe", title: "Deluxe Rooms", image: "/delux.png" },
    { slug: "executive-suites", title: "Executive Rooms", image: "/executive.png" },
    { slug: "junior-suites", title: "Junior Suites", image: "/junior.png" },
    { slug: "royal-suites", title: "Royal Suites", image: "/royal.png" },
    { slug: "family-rooms", title: "Family Rooms", image: "/family.png" },
  ];

  const displayRooms = rooms.length > 0 ? rooms : fallbackRooms;

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="w-full flex justify-center items-center min-h-screen mt-20">
          <p className="text-xl">Loading rooms...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

    
      <div className="w-full bg-gray-50 mt-20">

        {/* Rooms & Suites Section */}
        <section className="w-full bg-white py-10 sm:py-16 md:py-20 px-4 sm:px-6">

          {/* TITLE */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-black">StayEase's Rooms & Suites</h2>
            <p className="text-gray-700 mt-3 sm:mt-4 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
              Explore our range of luxurious rooms and suites tailored to suit every guest's needs.
            </p>
          </div>

          {error && (
            <div className="max-w-[1500px] mx-auto px-4 mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
              <p className="font-semibold">⚠️ Backend Connection Issue</p>
              <p className="text-sm mt-1">{error}</p>
              <p className="text-sm mt-2 font-medium">Status: {backendStatus || 'Checking...'}</p>
              <p className="text-sm mt-1">Showing default rooms. The app will work, but data is not from the database.</p>
              <div className="mt-3 p-2 bg-yellow-50 rounded text-xs">
                <p className="font-semibold">To fix this:</p>
                <ol className="list-decimal list-inside mt-1 space-y-1">
                  <li>Check if Render backend is accessible: <code className="bg-yellow-200 px-1 rounded">https://backend-89ej.onrender.com</code></li>
                  <li>Test backend directly: <code className="bg-yellow-200 px-1 rounded">https://backend-89ej.onrender.com/api/rooms</code></li>
                  <li>Check Render deployment logs for errors</li>
                  <li>Verify /api/rooms route exists in your backend</li>
                  <li>Ensure CORS is configured to allow requests from http://localhost:5174</li>
                </ol>
              </div>
            </div>
          )}

          {displayRooms.map((room, index) => {
            const roomSlug = 'slug' in room ? room.slug : room.id;
            const roomTitle = 'title' in room ? room.title : room.name;
            const roomImage = 'image' in room ? room.image : (room.images?.main || '/SUPERIOR.png');
            const roomDescription = 'description' in room ? room.description : `Experience comfort and elegance in our ${roomTitle}, thoughtfully designed for relaxation and peace.`;
            const roomView = 'view' in room ? room.view : room.features?.find(f => f.toLowerCase().includes('view')) || 'City View';
            const roomBed = 'bedType' in room ? room.bedType : room.features?.find(f => f.toLowerCase().includes('bed')) || 'King Bed / 2 Single Beds';

            // Use room ID as key for uniqueness (room IDs are unique across all hotels)
            const uniqueKey = 'id' in room && room.id ? `room-${room.id}` : `room-${roomSlug}-${index}`;

            return (
              <div
                key={uniqueKey}
                className={`
                  max-w-[1500px] mx-auto bg-white shadow-2xl rounded-2xl
                  overflow-hidden flex flex-col md:flex-row items-center
                  max-h-auto md:max-h-[500px] gap-4 sm:gap-6 md:gap-2 px-4 sm:px-6 md:px-0
                  ${index > 0 ? 'mt-10 sm:mt-16 md:mt-20' : ''}
                `}
              >
                <div className="w-full md:w-[800px] flex justify-center md:justify-start">
                  <img
                    src={roomImage}
                    alt={roomTitle}
                    className="w-full max-w-[400px] sm:max-w-[450px] md:max-w-[500px] lg:max-w-[550px] h-auto md:h-[500px] lg:h-[600px] object-cover rounded-xl"
                  />
                </div>

                <div className="flex-1 text-black px-4 sm:px-6 md:px-0">
                  <h3 className="text-2xl sm:text-2xl md:text-3xl mb-3 sm:mb-4">{roomTitle}</h3>
                  <div className="flex flex-col md:flex-row text-gray-700 text-sm sm:text-base md:text-lg mb-4 sm:mb-5 md:mb-6 gap-2 sm:gap-3 md:gap-8">
                    <span>{roomView}</span>
                    <span className="hidden md:block">|</span>
                    <span>{roomBed}</span>
                  </div>

                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6 sm:mb-8 md:mb-10 max-w-[500px]">
                    {roomDescription}
                  </p>

                  <Link to={`/booking/${roomSlug}`}> 
                  <button className="bg-[#DC9E38] text-black px-8 lg:py-3 lg:px-32 sm:px-12 md:px-50 py-2 sm:py-2.5 md:py-3 rounded font-semibold text-sm sm:text-base hover:bg-[#c38c2f] transition w-full sm:w-auto">
                    View More Details
                  </button>
                  </Link>
                </div>
              </div>
            );
          })}

        </section>
      </div>
    </>
  );
};

export default Home;
