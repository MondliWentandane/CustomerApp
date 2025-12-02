import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RoomActions from "../components/RoomActions";
import { Link } from "react-router-dom";
import { roomService } from "../services/roomService";
import type { Room } from "../services/roomService";
import { bookingService } from "../services/bookingService";
import { authService } from "../services/authService";

interface RoomDetails {
  title: string;
  descriptionTemplate: string;
  mainImage: string;
  thumbnailTop: string; 
  thumbnailBottomLeft: string; 
  thumbnailBottomRight: string; 
}

type RoomSlug = 
    | 'superior' 
    | 'deluxe' 
    | 'junior-suites' 
    | 'executive-suites' 
    | 'royal-suites' 
    | 'family-rooms';

type RoomDataMap = Record<RoomSlug, RoomDetails>;


interface BookingParams extends Record<string, string | undefined> {
  roomName: string; 
}


const ROOM_DATA: RoomDataMap = {
  superior: {
    title: 'Superior Room',
    descriptionTemplate: 'Experience comfort and elegance in our **{roomName}**, thoughtfully designed for relaxation and simplicity for guests seeking a peaceful retreat.',
    mainImage: '/SUPERIOR.png',
    thumbnailTop: '/SUP3.png', 
    thumbnailBottomLeft: '/SUP1.png',
    thumbnailBottomRight: '/SUP2.png', 
  },
  deluxe: {
    title: 'Deluxe Room',
    descriptionTemplate: 'Our **{roomName}** offers an elevated sense of luxury with its spacious layout and premium finishes, perfect for extended stays.',
    mainImage: '/delux.png',
    thumbnailTop: '/deluxe1.png',
    thumbnailBottomLeft: '/deluxe2.png',
    thumbnailBottomRight: '/deluxe3.png',
  },
  'junior-suites': {
    title: 'Junior Suites',
    descriptionTemplate: 'Step into refined luxury with our **{roomName}**, offering a semi-separate living space and enhanced amenities for a truly comfortable stay.',
    mainImage: '/junior.png',
    thumbnailTop: '/JUNIOR1.png',
    thumbnailBottomLeft: '/JUNIOR2.png',
    thumbnailBottomRight: '/JUNIOR3.png',
  },
  'executive-suites': {
    title: 'Executive Suites',
    descriptionTemplate: 'Crafted for both business and leisure, the **{roomName}** offers comfort with a professional touch and exclusive access to executive lounge privileges.',
    mainImage: '/executive.png',
    thumbnailTop: '/executive1.png',
    thumbnailBottomLeft: '/executive2.png',
    thumbnailBottomRight: '/executive3.png',
  },
  'royal-suites': {
    title: 'Royal Suites',
    descriptionTemplate: 'The **{roomName}** offers expansive elegance with exclusive amenities and luxurious décor, representing the ultimate in lavish accommodation.',
    mainImage: '/royal.png',
    thumbnailTop: '/ROYAL3.png',
    thumbnailBottomLeft: '/ROYAL2.png',
    thumbnailBottomRight: '/Royal1.png',
  },
  'family-rooms': {
    title: 'Family Rooms',
    descriptionTemplate: 'The **{roomName}** provides generous space, comfort, and kid-friendly amenities for memorable stays with the whole family.',
    mainImage: '/family.png',
    thumbnailTop: '/family1.png',
    thumbnailBottomLeft: '/family2.png',
    thumbnailBottomRight: '/family3.png',
  },
};


const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const { roomName: urlRoomName } = useParams<BookingParams>();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [selectedRooms, setSelectedRooms] = useState(1);
  const [selectedGuests, setSelectedGuests] = useState(1);
  const [bookingLoading, setBookingLoading] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const roomOptions = [
    { value: 1, label: "1 Room" },
    { value: 2, label: "2 Rooms" },
    { value: 3, label: "3 Rooms" },
  ];

  const guestOptions = [
    { value: 1, label: "1 Person" },
    { value: 2, label: "2 People" },
    { value: 3, label: "3 People" },
  ];

  useEffect(() => {
    const fetchRoom = async () => {
      if (!urlRoomName) return;
      
      try {
        const roomData = await roomService.getRoomBySlug(urlRoomName);
        setRoom(roomData);
      } catch (err: any) {
        // Fallback to hardcoded data
        const normalizedRoomName = urlRoomName.toLowerCase().replace(/\s+/g, '-') as RoomSlug;
        if (normalizedRoomName in ROOM_DATA) {
          const fallbackRoom = ROOM_DATA[normalizedRoomName];
          // Convert to Room format
          setRoom({
            id: normalizedRoomName,
            name: fallbackRoom.title,
            slug: normalizedRoomName,
            description: fallbackRoom.descriptionTemplate.replace('**{roomName}**', fallbackRoom.title),
            pricePerNight: 1000,
            images: {
              main: fallbackRoom.mainImage,
              thumbnails: [fallbackRoom.thumbnailTop, fallbackRoom.thumbnailBottomLeft, fallbackRoom.thumbnailBottomRight],
            },
            features: ['Wi-Fi', 'King Bed', 'Bath-tub'],
            amenities: [],
            maxGuests: 3,
            maxRooms: 3,
          });
        }
        console.error("Error fetching room:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [urlRoomName]);

  const handleBookNow = async () => {
    if (!room || !checkIn || !checkOut) {
      alert("Please fill in all booking details");
      return;
    }

    if (!authService.isAuthenticated()) {
      navigate("/signin");
      return;
    }

    setBookingLoading(true);
    try {
      const booking = await bookingService.createBooking({
        roomId: room.id,
        checkIn,
        checkOut,
        numberOfRooms: selectedRooms,
        numberOfGuests: selectedGuests,
        hotelId: room.hotelId, // Include hotel_id if available
      });
      
      // Store booking in sessionStorage for payment page
      sessionStorage.setItem('currentBooking', JSON.stringify(booking.booking));
      navigate("/payment");
    } catch (err: any) {
      console.error("Booking error:", err);
      const errorMessage = err.response?.data?.message 
        || err.response?.data?.error 
        || err.message 
        || "Failed to create booking. Please try again.";
      alert(errorMessage);
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-xl">Loading room details...</p>
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="w-full bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <h1 className="text-3xl font-bold text-red-600">
            Room Not Found: "{urlRoomName}"
          </h1>
        </div>
      </div>
    );
  }

  const currentRoom = {
    title: room.name,
    mainImage: room.images.main,
    thumbnailTop: room.images.thumbnails[0] || room.images.main,
    thumbnailBottomLeft: room.images.thumbnails[1] || room.images.main,
    thumbnailBottomRight: room.images.thumbnails[2] || room.images.main,
    description: room.description,
  };


  return (
    <div className="w-full bg-gray-50">
      <Navbar />

      <div className="w-full max-w-[1400px] ml-0 md:ml-8 lg:ml-16 xl:ml-30 mt-20 py-8 sm:py-12 md:py-16 lg:py-20 flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-12 px-4 sm:px-6">
        <RoomActions /> 

       
        <div className="flex flex-col lg:flex-row flex-[2.5] gap-4 sm:gap-6">
          
          {/* Main Image */}
          <div className="flex flex-col gap-3 sm:gap-4 w-full lg:w-[55%]">
            <img
          
              src={currentRoom.mainImage}
              alt={currentRoom.title}
              className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-xl shadow-lg"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex flex-col gap-3 sm:gap-4 w-full lg:w-[45%]">
            
            <img
              src={currentRoom.thumbnailTop}
              alt={`${currentRoom.title} View 3`}
              className="w-full h-[120px] sm:h-[140px] md:h-[160px] lg:h-60 object-cover rounded-lg shadow-md"
            />
            <div className="flex gap-2 sm:gap-3 md:gap-4">
              
              <img
                src={currentRoom.thumbnailBottomLeft}
                alt={`${currentRoom.title} View 1`}
                className="w-1/2 h-[120px] sm:h-[140px] md:h-[180px] lg:h-[245px] object-cover rounded-lg shadow-md"
              />
              
              <img
                src={currentRoom.thumbnailBottomRight}
                alt={`${currentRoom.title} View 2`}
                className="w-1/2 h-[120px] sm:h-[140px] md:h-[180px] lg:h-[245px] object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="flex flex-[1.2] ml-0 lg:ml-10 flex-col gap-6 sm:gap-8">
          {/* Check-in */}
          <div className="flex flex-col w-full">
            <label className="text-sm font-medium mb-1">Check In</label>
            <input
              type="date"
              value={checkIn}
              min={today}
              onChange={(e) => {
                setCheckIn(e.target.value);
                if (checkOut && e.target.value >= checkOut) setCheckOut("");
              }}
              className="w-full px-5 py-4 border rounded-lg outline-none text-black"
            />
          </div>

          {/* Check-out */}
          <div className="flex flex-col w-full">
            <label className="text-sm font-medium mb-1">Check Out</label>
            <input
              type="date"
              value={checkOut}
              min={checkIn || today}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full px-5 py-4 border rounded-lg outline-none text-black"
            />
          </div>

          {/* Rooms & Guests */}
          <div className="flex gap-6 w-full">
            <div className="flex-1">
              <label className="text-sm font-semibold mb-1 block">Rooms</label>
              <Select
                options={roomOptions}
                placeholder="00 Rooms"
                classNamePrefix="select"
                className="w-full bg-black/10 rounded-lg"
                onChange={(option) => setSelectedRooms(option?.value || 1)}
                defaultValue={roomOptions[0]}
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-semibold mb-1 block">People</label>
              <Select
                options={guestOptions}
                placeholder="00 Guests"
                classNamePrefix="select"
                className="w-full bg-black/10 rounded-lg"
                onChange={(option) => setSelectedGuests(option?.value || 1)}
                defaultValue={guestOptions[0]}
              />
            </div>
          </div>

          {/* Book Now */}
          <button 
            onClick={handleBookNow}
            disabled={bookingLoading || !checkIn || !checkOut}
            className="w-full mt-6 bg-[#DC9E38] text-black py-4 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {bookingLoading ? "Processing..." : "Book Now"}
          </button>
        </div>
      </div>

      {/* Room Title & Features */}
      <div className="max-w-[1400px] mx-auto -mt-4 sm:-mt-6 md:-mt-8 lg:-mt-10 px-4 sm:px-6">
        {/* ROOM TITLE */}
        <p className="text-2xl sm:text-2xl md:text-3xl font-medium text-black mb-2">{currentRoom.title}</p>
        <p className="text-gray-700 text-xs sm:text-sm mb-4 sm:mb-6">
          56 Railway Street, Annadale
        </p>

        <p className="font-medium mb-2 sm:mb-3 text-sm sm:text-base">Room Features</p>
        <div className="flex gap-4 sm:gap-5 md:gap-6">
          {room.features.slice(0, 3).map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              <img 
                src={feature.toLowerCase().includes('wifi') ? "/wifi.png" : 
                     feature.toLowerCase().includes('bed') ? "/bed.png" : 
                     feature.toLowerCase().includes('bath') ? "/bathtub.png" : "/wifi.png"} 
                className="w-10 h-10 mb-1" 
                alt={feature}
              />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Description / Policy / Ratings Section */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {/* Description */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-[#DC9E38] drop-shadow-lg">
            Description
          </h3>
          {/* DYNAMIC DESCRIPTION */}
          <p 
            className="text-gray-700 text-sm"
            dangerouslySetInnerHTML={{ __html: currentRoom.description.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
          />
        </div>

        {/* Policy */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Policy</h3>
          <ul className="text-gray-700 text-sm list-disc ml-4 space-y-1">
            <li>Each reservation includes a maximum of 3 rooms per booking.</li>
            <li>Each room accommodates up to 3 people.</li>
            <li>Additional rooms or guests must be booked through a separate reservation.</li>
          </ul>
        </div>

        {/* Star Ratings*/}
        <div>
          <h3 className="text-lg font-semibold mb-2">Star Ratings</h3>
          <div className="flex items-center gap-2 mb-2">
            <img src="/star.png" className="w-5 h-5" />
            <span className="text-gray-700">4.8</span>
          </div>
          <div className="space-y-2">
            <div className="w-full bg-gray-300 h-2 rounded">
              <div className="bg-[#DC9E38] h-2 rounded" style={{ width: "100%" }}></div>
            </div>
            <div className="w-full bg-gray-300 h-2 rounded">
              <div className="bg-[#DC9E38] h-2 rounded" style={{ width: "85%" }}></div>
            </div>
            <div className="w-full bg-gray-300 h-2 rounded">
              <div className="bg-[#DC9E38] h-2 rounded" style={{ width: "70%" }}></div>
            </div>
            <div className="w-full bg-gray-300 h-2 rounded">
              <div className="bg-[#DC9E38] h-2 rounded" style={{ width: "50%" }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16 text-center">
        <iframe
          src="https://www.google.com/maps?q=YOUR-HOTEL-ADDRESS&output=embed"
          className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[450px] rounded-lg shadow-lg border"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <Footer /> 
    </div>
  );
};

export default BookingPage;