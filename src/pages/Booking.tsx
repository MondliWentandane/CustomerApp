import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RoomActions from "../components/RoomActions";
import { Link } from "react-router-dom";

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
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const roomOptions = [
    { value: 1, label: "1 Room" },
    { value: 2, label: "2 Rooms" },
    { value: 3, label: "3 Rooms" },
  ];

  const guestOptions = [
    { value: "1 Person", label: "1 Person" },
    { value: "2 People", label: "2 People" },
    { value: "3 People", label: "3 People" },
  ];

  const { roomName: urlRoomName } = useParams<BookingParams>();
  
  const normalizedRoomName: RoomSlug | undefined = urlRoomName 
    ? (urlRoomName.toLowerCase().replace(/\s+/g, '-') as RoomSlug) 
    : undefined;

  const isRoomFound = normalizedRoomName && normalizedRoomName in ROOM_DATA;
  const fallbackData = ROOM_DATA.superior;
  
  const currentRoom: RoomDetails = isRoomFound 
    ? ROOM_DATA[normalizedRoomName as RoomSlug] 
    : fallbackData;
  

  const [mainImage, setMainImage] = useState<string>(currentRoom.mainImage);


  useEffect(() => {

    setMainImage(currentRoom.mainImage); 
  }, [currentRoom]);


  const description = currentRoom.descriptionTemplate.replace(
    '**{roomName}**',
    `**${currentRoom.title}**`
  );
  
  if (urlRoomName && !isRoomFound) {
      return (
          <div className="flex items-center justify-center min-h-screen bg-gray-100">
              <h1 className="text-3xl font-bold text-red-600">
                  Room Not Found: "{urlRoomName}"
              </h1>
          </div>
      );
  }


  return (
    <div className="w-full bg-gray-50">
      <Navbar />

      <div className="w-full max-w-[1400px] ml-30 mt-20 py-20 flex gap-12 px-6">
        <RoomActions /> 

       
        <div className="flex flex-[2.5] gap-6">
          
          {/* Main Image */}
          <div className="flex flex-col gap-4 w-[55%]">
            <img
          
              src={currentRoom.mainImage}
              alt={currentRoom.title}
              className="w-full h-[500px] object-cover rounded-xl shadow-lg"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex flex-col gap-4 w-[65%]">
            
            <img
              src={currentRoom.thumbnailTop}
              alt={`${currentRoom.title} View 3`}
              className="w-[700px] h-60 object-cover rounded-lg shadow-md"
            />
            <div className="flex gap-2">
              
              <img
                src={currentRoom.thumbnailBottomLeft}
                alt={`${currentRoom.title} View 1`}
                className="w-1/2 h-[245px] object-cover rounded-lg shadow-md"
              />
              
              <img
                src={currentRoom.thumbnailBottomRight}
                alt={`${currentRoom.title} View 2`}
                className="w-1/2 h-[245px] object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="flex flex-[1.2] ml-10 flex-col gap-8">
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
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-semibold mb-1 block">People</label>
              <Select
                options={guestOptions}
                placeholder="00 Guests"
                classNamePrefix="select"
                className="w-full bg-black/10 rounded-lg"
              />
            </div>
          </div>

          {/* Book Now */}
          <Link to="/payment">
          <button className="w-full mt-6 bg-[#DC9E38] text-black py-4 rounded-lg font-semibold">
            Book Now
          </button>
          </Link>
        </div>
      </div>

      {/* Room Title & Features */}
      <div className="max-w-[1400px] mx-auto -mt-10 px-6">
        {/* ROOM TITLE */}
        <p className="text-3xl font-medium text-black mb-2">{currentRoom.title}</p>
        <p className="text-gray-700 text-sm mb-6">
          56 Railway Street, Annadale
        </p>

        <p className="font-medium mb-3">Room Features</p>
        <div className="flex gap-6">
          <div className="flex flex-col items-center">
            <img src="/wifi.png" className="w-10 h-10 mb-1" />
            <span className="text-sm">Wi-Fi</span>
          </div>
          <div className="flex flex-col items-center">
            <img src="/bed.png" className="w-10 h-10 mb-1" />
            <span className="text-sm">King Bed</span>
          </div>
          <div className="flex flex-col items-center">
            <img src="/bathtub.png" className="w-10 h-10 mb-1" />
            <span className="text-sm">Bath-tub</span>
          </div>
        </div>
      </div>

      {/* Description / Policy / Ratings Section */}
      <div className="max-w-[1400px] mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Description */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-[#DC9E38] drop-shadow-lg">
            Description
          </h3>
          {/* DYNAMIC DESCRIPTION */}
          <p 
            className="text-gray-700 text-sm"
            dangerouslySetInnerHTML={{ __html: description.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
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
      <div className="max-w-[1400px] mx-auto px-6 py-16 text-center">
        <iframe
          src="https://www.google.com/maps?q=YOUR-HOTEL-ADDRESS&output=embed"
          className="w-full h-[450px] rounded-lg shadow-lg border"
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