import { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

const BookingBar = () => {
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);

    const checkInRef = useRef<any>(null);
  const checkOutRef = useRef<any>(null);

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

  return (
    <div className="relative -mt-16 z-20 ml-70">
      {/* Top Gold Bar */}
      <div className="w-[1300px] h-4 bg-[#DC9E38]"></div>

      {/* Booking Bar */}
      <div className="w-[1300px] bg-[#403D36] py-8 flex justify-center px-4">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-5 gap-7 text-white items-center">
{/* CHECK IN */}
<div className="flex flex-col gap-2 border-r border-white pr-4">
  <label className="text-sm mb-1 ml-1">Check In</label>
  <div className="flex items-center  bg-black/20 px-3 py-2 rounded">
    <DatePicker
  selected={checkIn}
  onChange={(date) => setCheckIn(date)}
  placeholderText="DD/MM/YYYY"
  className="bg-transparent outline-none text-white w-full placeholder-white"
  dateFormat="dd/MM/yyyy"
  minDate={new Date()}             
  ref={checkInRef}
/>
<img
  src="/calender.png"
  className="w-5 h-5 ml-2 cursor-pointer"
  onClick={() => checkInRef.current.setOpen(true)} 
/>

  </div>
</div>

{/* CHECK OUT */}
<div className="flex flex-col gap-2 border-r border-white pr-4">
  <label className="text-sm mb-1 ml-1">Check Out</label>
  <div className="flex items-center bg-black/20 px-3 py-2 rounded">
    <DatePicker
  selected={checkOut}
  onChange={(date) => setCheckOut(date)}
  placeholderText="DD/MM/YYYY"
  className="bg-transparent outline-none text-white w-full placeholder-white"
  dateFormat="dd/MM/yyyy"
  minDate={checkIn || new Date()} 
  ref={checkOutRef}
/>
<img
  src="/calender.png"
  className="w-5 h-5 ml-2 cursor-pointer"
  onClick={() => checkOutRef.current.setOpen(true)} 
/>

  </div>
</div>

{/* ROOMS */}
<div className="flex flex-col border-r gap-2 border-white pr-4">
  <label className="text-sm mb-1 ml-1">Rooms</label>
  <Select
    options={roomOptions}
    placeholder="00 ROOMS"
    classNamePrefix="select"
    styles={{
      control: (base) => ({
        ...base,
        backgroundColor: "rgba(0,0,0,0.2)",
        border: "none",
        boxShadow: "none",
        padding: "4px 6px",
      }),
      singleValue: (base) => ({
        ...base,
        color: "white",
      }),
      placeholder: (base) => ({
        ...base,
        color: "white",
      }),
      menu: (base) => ({
        ...base,
        color: "black",
      }),
    }}
  />
</div>

{/* GUESTS */}
<div className="flex flex-col border-r gap-2 border-white pr-4">
  <label className="text-sm mb-1 ml-1">Guests</label>
  <Select
    options={guestOptions}
    placeholder="People"
    classNamePrefix="select"
    styles={{
      control: (base) => ({
        ...base,
        backgroundColor: "rgba(0,0,0,0.2)",
        border: "none",
        boxShadow: "none",
        padding: "4px 6px",
      }),
      singleValue: (base) => ({
        ...base,
        color: "white",
      }),
      placeholder: (base) => ({
        ...base,
        color: "white",
      }),
      menu: (base) => ({
        ...base,
        color: "black",
      }),
    }}
  />
</div>

          {/* SEARCH BUTTON */}
          <div className="flex items-end">
            <button className="w-full bg-[#DC9E38] text-white py-3 rounded font-semibold">
              Search
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BookingBar;
