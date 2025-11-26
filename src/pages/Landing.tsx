import BookingBar from "../components/BookingBar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Landing = () => {
  return (
    <div className="w-full">

      {/* NAVBAR */}
      <Navbar />     

      {/* HERO SECTION */}
      <div
        id="hero"
        className="w-full h-screen bg-cover bg-center relative pt-0"
        style={{ backgroundImage: "url('/Modern Luxury Interior copy.png')" }}
      >
        <div className="h-full w-full flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-4xl font-medium text-white">
            Bringing Luxury & Simplicity
          </h2>
          <h2 className="text-4xl font-medium text-white mt-2">
            In The Hotel Market
          </h2>

          <p className="mt-6 text-white">
            Discover stays made easy with StayEase.<br />
            &nbsp;&nbsp;&nbsp;Tap the button below and explore<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;what is waiting for you.
          </p>

          <Link to="/signup">
            <button className="mt-8 bg-[#DC9E38] px-8 py-3 rounded-md text-lg font-semibold text-white hover:bg-[#c38c2f] transition">
              Discover More
            </button>
          </Link>
        </div>
      </div>

      {/* BOOKING BAR */}
      <div id="booking">
        <BookingBar />
      </div>

      {/* ABOUT SECTION */}
      <div id="about" className=" w-full flex flex-col md:flex-row mt-20">

        {/* LEFT IMAGE */}
        <div className="w-full md:w-1/2">
          <img
            src="/Elegant Hotel Reception in Warm Tones.png"
            alt="Hotel Reception"
            className="w-[500px] h-auto ml-30"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-full md:w-1/2 bg-white p-10 flex flex-col justify-center">

          <h3 className="text-[#DC9E38] text-lg font-semibold tracking-wide">
            StayEase Luxury Hotel
          </h3>

          <h2 className="text-3xl font-medium mt-2 text-black">
            The best affordable luxury hotel.
          </h2>

          <p className="text-black mt-4 leading-relaxed text-[15px]">
            StayEase is the best luxury hotel in South Africa, offering an unmatched blend of elegance, comfort, and world-class
            hospitality. It brings 5-star services to guests in a convenient and beautifully simple way—
            designed to make every moment unforgettable.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-10 mt-8">
            <div>
              <h3 className="text-[#DC9E38] text-3xl font-bold">250+</h3>
              <p className="text-black text-sm mt-1">Luxury rooms</p>
            </div>

            <div>
              <h3 className="text-[#DC9E38] text-3xl font-bold">4.3</h3>
              <p className="text-black text-sm mt-1">Customer ratings</p>
            </div>

            <div>
              <h3 className="text-[#DC9E38] text-3xl font-bold">120k+</h3>
              <p className="text-black text-sm mt-1">Happy customers</p>
            </div>

          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="w-full flex items-center justify-center my-16">
        <div className="h-0.5 w-1/4 bg-[#DC9E38]"></div>
        <img src="/logo 2.png" alt="Divider Logo" className="mx-6 h-16 w-auto" />
        <div className="h-0.5 w-1/4 bg-[#DC9E38]"></div>
      </div>

      {/* ROOMS SECTION */}
      <div id="rooms">

        <div className="text-center mt-20 mb-12 px-4">
          <h2 className="text-3xl md:text-4xl font-semibold text-black">
            StayEase's Rooms & Suites
          </h2>

          <p className="mt-4 text-[15px] md:text-lg text-gray-700 leading-relaxed">
            Explore our range of luxurious rooms and suites tailored to suit <br />
            &nbsp;&nbsp;&nbsp; every guest's needs.
          </p>
        </div>

        <div className="w-full flex justify-center">
          <div className="max-w-6xl w-full overflow-x-auto snap-x snap-mandatory py-10 px-6 bg-white">
            <div className="flex space-x-6">

              {/* CARD 1 */}
              <div className="snap-start bg-white rounded-lg shadow-md min-w-[350px] overflow-hidden relative">
                <img src="/SUPERIOR.png" className="w-full h-[400px] object-cover" />
                <span className="absolute top-2 right-2 bg-[#DC9E38] text-black px-3 py-1 text-sm rounded">
                  R500/night
                </span>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold">Superior Rooms</h3>
                  <p className="text-sm text-gray-700 mt-1">A step above standard, but below deluxe.</p>
                  <button className="mt-4 w-full bg-[#CCBEB1] text-black py-2 rounded-md">Book Now</button>
                </div>
              </div>

              {/* CARD 2 */}
              <div className="snap-start bg-white rounded-lg shadow-md min-w-[350px] overflow-hidden relative">
                <img src="/delux.png" className="w-full h-[400px] object-cover" />
                <span className="absolute top-2 right-2 bg-[#DC9E38] text-black px-3 py-1 text-sm rounded">
                  R1500/night
                </span>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold">Deluxe Rooms</h3>
                  <p className="text-sm text-gray-700 mt-1">Better furniture, bigger space, nicer view</p>
                  <button className="mt-4 w-full bg-[#CCBEB1] text-black py-2 rounded-md">Book Now</button>
                </div>
              </div>

              {/* CARD 3 */}
              <div className="snap-start bg-white rounded-lg shadow-md min-w-[350px] overflow-hidden relative">
                <img src="/executive.png" className="w-full h-[400px] object-cover" />
                <span className="absolute top-2 right-2 bg-[#DC9E38] text-black px-3 py-1 text-sm rounded">
                  R2000/night
                </span>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold">Executive Rooms</h3>
                  <p className="text-sm text-gray-700 mt-1">
                    For business travelers. Includes a work desk, lounge access.
                  </p>
                  <button className="mt-4 w-full bg-[#CCBEB1] text-black py-2 rounded-md">Book Now</button>
                </div>
              </div>

              {/* CARD 4 */}
              <div className="snap-start bg-white rounded-lg shadow-md min-w-[350px] overflow-hidden relative">
                <img src="/junior.png" className="w-full h-[400px] object-cover" />
                <span className="absolute top-2 right-2 bg-[#DC9E38] text-black px-3 py-1 text-sm rounded">
                  R3000/night
                </span>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold">Junior Suites</h3>
                  <p className="text-sm text-gray-700 mt-1">Larger room with a small living area</p>
                  <button className="mt-4 w-full bg-[#CCBEB1] text-black py-2 rounded-md">Book Now</button>
                </div>
              </div>

              {/* CARD 5 */}
              <div className="snap-start bg-white rounded-lg shadow-md min-w-[350px] overflow-hidden relative">
                <img src="/royal.png" className="w-full h-[400px] object-cover" />
                <span className="absolute top-2 right-2 bg-[#DC9E38] text-black px-3 py-1 text-sm rounded">
                  R4500/night
                </span>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold">Royal Suites</h3>
                  <p className="text-sm text-gray-700 mt-1">
                    Includes 2 rooms, private office, dining area.
                  </p>
                  <button className="mt-4 w-full bg-[#CCBEB1] text-black py-2 rounded-md">Book Now</button>
                </div>
              </div>

              {/* CARD 6 */}
              <div className="snap-start bg-white rounded-lg shadow-md min-w-[350px] overflow-hidden relative">
                <img src="/family.png" className="w-full h-[400px] object-cover" />
                <span className="absolute top-2 right-2 bg-[#DC9E38] text-black px-3 py-1 text-sm rounded">
                  R6000/night
                </span>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold">Family Rooms</h3>
                  <p className="text-sm text-gray-700 mt-1">
                    Perfect for families with children. Designed for groups.
                  </p>
                  <button className="mt-4 w-full bg-[#CCBEB1] text-black py-2 rounded-md">Book Now</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* FACILITIES SECTION */}
      <div id="facilities" className="w-[1500px] h-[600px] bg-[#403D36] py-16 ml-50 mt-50">

        <h2 className="text-white text-3xl font-semibold text-center">
          Hotel Facilities
        </h2>

        <p className="text-white text-center mt-2 text-lg">
          Unwind, indulge and enjoy premium amenities at your fingertips
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <img src="/bed.png" className="w-14 h-14 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-black">Room Services</h3>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <img src="/gym.png" className="w-16 h-14 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-black">Fitness Gym</h3>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <img src="/key.png" className="w-14 h-14 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-black">Smart Key</h3>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <img src="/swim.png" className="w-14 h-14 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-black">Swimming Pool</h3>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <img src="/wifi.png" className="w-14 h-14 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-black">Wi-Fi Internet</h3>
          </div>

        </div>
      </div>

      {/* FLOATING IMAGE ROW */}
      <div className="flex justify-center relative z-30 px-4 mt-[-200px]">
        <div className="flex space-x-6">
          <img src="/Tranquil Breakfast Scene.png" className="w-100 h-100 object-cover rounded-lg shadow-lg" />
          <img src="/hotel gym 2.png" className="w-100 h-100 object-cover rounded-lg shadow-lg" />
          <img src="/pool.png" className="w-100 h-100 object-cover rounded-lg shadow-lg" />
        </div>
      </div>

      {/* GALLERY SECTION */}
      <div id="gallery" className="w-full bg-white py-16 px-6">

        <h2 className="text-3xl font-semibold text-center text-black">
          Gallery
        </h2>

        {/* FIRST ROW */}
        <div className="flex justify-center mt-10 space-x-10">
          <img src="/hotel view 1.png" className="w-80 h-60 rounded-lg object-cover shadow" />
          <img src="/indoor pool.png" className="w-80 h-60 rounded-lg object-cover shadow" />
          <img src="/outdoor pool.png" className="w-80 h-60 rounded-lg object-cover shadow" />
          <img src="/walk way.png" className="w-80 h-60 rounded-lg object-cover shadow" />
          <img src="/ocean.png" className="w-80 h-60 rounded-lg object-cover shadow" />
        </div>

        {/* SECOND ROW */}
        <div className="flex justify-center mt-10 space-x-10">
          <img src="/hotel view 1.png" className="w-80 h-60 rounded-lg object-cover shadow" />
          <img src="/indoor pool.png" className="w-80 h-60 rounded-lg object-cover shadow" />
          <img src="/outdoor pool.png" className="w-80 h-60 rounded-lg object-cover shadow" />
          <img src="/walk way.png" className="w-80 h-60 rounded-lg object-cover shadow" />
          <img src="/ocean.png" className="w-80 h-60 rounded-lg object-cover shadow" />
        </div>

      </div>

      {/* LOCATION SECTION */}
      <div id="location" className="w-full bg-white py-20 px-6 text-center">

        <h2 className="text-3xl font-semibold text-black">
          Find Your Way To StayEase
        </h2>

        <p className="text-black mt-3 text-lg">
          Get instant directions from your current location<br />
          to our hotel
        </p>

        <div className="flex justify-center mt-10">
          <iframe
            src="https://www.google.com/maps?q=YOUR-HOTEL-ADDRESS&output=embed"
            className="w-[800px] h-[450px] rounded-lg shadow-lg border"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <a
          href="https://www.google.com/maps/dir/?api=1&destination=YOUR-HOTEL-ADDRESS"
          target="_blank"
          className="mt-8 inline-block bg-[#DC9E38] text-white px-8 py-3 rounded-md text-lg font-semibold"
        >
          Get Location
        </a>
      </div>

      {/* FOOTER */}
      <Footer />

    </div>
  );
};

export default Landing;
