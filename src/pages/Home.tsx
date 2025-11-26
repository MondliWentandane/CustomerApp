import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Home = () => {
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

          {/* ================== SUPERIOR ROOM ================== */}
          <div className="
            max-w-[1500px] mx-auto bg-white shadow-2xl rounded-2xl
            overflow-hidden flex flex-col md:flex-row items-center
            max-h-auto md:max-h-[500px] gap-4 sm:gap-6 md:gap-2 px-4 sm:px-6 md:px-0
          ">
            <div className="w-full md:w-[800px] flex justify-center md:justify-start">
              <img
                src="/SUPERIOR.png"
                alt="Superior Room"
                className="w-full max-w-[400px] sm:max-w-[450px] md:max-w-[500px] lg:max-w-[550px] h-auto md:h-[500px] lg:h-[600px] object-cover rounded-xl"
              />
            </div>

            <div className="flex-1 text-black px-4 sm:px-6 md:px-0">
              <h3 className="text-2xl sm:text-2xl md:text-3xl mb-3 sm:mb-4">Superior Rooms</h3>
              <div className="flex flex-col md:flex-row text-gray-700 text-sm sm:text-base md:text-lg mb-4 sm:mb-5 md:mb-6 gap-2 sm:gap-3 md:gap-8">
                <span>City View</span>
                <span className="hidden md:block">|</span>
                <span>King Bed / 2 Single Beds</span>
              </div>

              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6 sm:mb-8 md:mb-10 max-w-[500px]">
                Experience comfort and elegance in our Superior Room, thoughtfully designed for relaxation and peace.
              </p>

              <Link to="/booking/superior"> 
              <button className="bg-[#DC9E38] text-black px-8 sm:px-12 md:px-50 py-2 sm:py-2.5 md:py-3 rounded font-semibold text-sm sm:text-base hover:bg-[#c38c2f] transition w-full sm:w-auto">
                View More Details
              </button>
              </Link>
            </div>
          </div>


          {/* ================== DELUXE ROOMS ================== */}
          <div className="
            max-w-[1500px] mx-auto bg-white shadow-2xl rounded-2xl
            overflow-hidden flex flex-col md:flex-row items-center
            max-h-auto md:max-h-[500px] gap-4 sm:gap-6 md:gap-2 mt-10 sm:mt-16 md:mt-20 px-4 sm:px-6 md:px-0
          ">
            <div className="w-full md:w-[800px] flex justify-center md:justify-start">
              <img
                src="/delux.png"
                alt="Deluxe Room"
                className="w-full max-w-[400px] sm:max-w-[450px] md:max-w-[500px] lg:max-w-[550px] h-auto md:h-[500px] lg:h-[600px] object-cover rounded-xl"
              />
            </div>

            <div className="flex-1 text-black px-4 sm:px-6 md:px-0">
              <h3 className="text-2xl sm:text-2xl md:text-3xl mb-3 sm:mb-4">Deluxe Rooms</h3>
              <div className="flex flex-col md:flex-row text-gray-700 text-sm sm:text-base md:text-lg mb-4 sm:mb-5 md:mb-6 gap-2 sm:gap-3 md:gap-8">
                <span>City View</span>
                <span className="hidden md:block">|</span>
                <span>King Bed / 2 Single Beds</span>
              </div>

              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6 sm:mb-8 md:mb-10 max-w-[500px]">
                Our Deluxe Room offers an elevated sense of luxury with its spacious layout and premium finishes.
              </p>

              <Link to="/booking/deluxe">
                <button className="bg-[#DC9E38] text-black px-8 sm:px-12 md:px-50 py-2 sm:py-2.5 md:py-3 rounded font-semibold text-sm sm:text-base hover:bg-[#c38c2f] transition w-full sm:w-auto">
                  View More Details
                </button>
              </Link>
            </div>
          </div>


          {/* ================== EXECUTIVE ROOMS ================== */}
          <div className="
            max-w-[1500px] mx-auto bg-white shadow-2xl rounded-2xl
            overflow-hidden flex flex-col md:flex-row items-center
            max-h-auto md:max-h-[500px] gap-4 sm:gap-6 md:gap-2 mt-10 sm:mt-16 md:mt-20 px-4 sm:px-6 md:px-0
          ">
            <div className="w-full md:w-[800px] flex justify-center md:justify-start">
              <img
                src="/executive.png"
                alt="Executive Room"
                className="w-full max-w-[400px] sm:max-w-[450px] md:max-w-[500px] lg:max-w-[550px] h-auto md:h-[500px] lg:h-[600px] object-cover rounded-xl"
              />
            </div>

            <div className="flex-1 text-black px-4 sm:px-6 md:px-0">
              <h3 className="text-2xl sm:text-2xl md:text-3xl mb-3 sm:mb-4">Executive Rooms</h3>
              <div className="flex flex-col md:flex-row text-gray-700 text-sm sm:text-base md:text-lg mb-4 sm:mb-5 md:mb-6 gap-2 sm:gap-3 md:gap-8">
                <span>City View</span>
                <span className="hidden md:block">|</span>
                <span>King Bed / 2 Single Beds</span>
              </div>

              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6 sm:mb-8 md:mb-10 max-w-[500px]">
                Crafted for both business and leisure, the Executive Room offers comfort with a professional touch.
              </p>

              <Link to="/booking/executive-suites">
                <button className="bg-[#DC9E38] text-black px-8 sm:px-12 md:px-50 py-2 sm:py-2.5 md:py-3 rounded font-semibold text-sm sm:text-base hover:bg-[#c38c2f] transition w-full sm:w-auto">
                  View More Details
                </button>
              </Link>
            </div>
          </div>


          {/* ================== JUNIOR SUITES ================== */}
          <div className="
            max-w-[1500px] mx-auto bg-white shadow-2xl rounded-2xl
            overflow-hidden flex flex-col md:flex-row items-center
            max-h-auto md:max-h-[500px] gap-4 sm:gap-6 md:gap-2 mt-10 sm:mt-16 md:mt-20 px-4 sm:px-6 md:px-0
          ">
            <div className="w-full md:w-[800px] flex justify-center md:justify-start">
              <img
                src="/junior.png"
                alt="Junior Suite"
                className="w-full max-w-[400px] sm:max-w-[450px] md:max-w-[500px] lg:max-w-[550px] h-auto md:h-[500px] lg:h-[600px] object-cover rounded-xl"
              />
            </div>

            <div className="flex-1 text-black px-4 sm:px-6 md:px-0">
              <h3 className="text-2xl sm:text-2xl md:text-3xl mb-3 sm:mb-4">Junior Suites</h3>
              <div className="flex flex-col md:flex-row text-gray-700 text-sm sm:text-base md:text-lg mb-4 sm:mb-5 md:mb-6 gap-2 sm:gap-3 md:gap-8">
                <span>City View</span>
                <span className="hidden md:block">|</span>
                <span>King Bed / 2 Single Beds</span>
              </div>

              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6 sm:mb-8 md:mb-10 max-w-[500px]">
                Step into refined luxury with our Junior Suite, offering a semi-separate living space.
              </p>

              <Link to="/booking/junior-suites">
                <button className="bg-[#DC9E38] text-black px-8 sm:px-12 md:px-50 py-2 sm:py-2.5 md:py-3 rounded font-semibold text-sm sm:text-base hover:bg-[#c38c2f] transition w-full sm:w-auto">
                  View More Details
                </button>
              </Link>
            </div>
          </div>


          {/* ================== ROYAL SUITES ================== */}
          <div className="
            max-w-[1500px] mx-auto bg-white shadow-2xl rounded-2xl
            overflow-hidden flex flex-col md:flex-row items-center
            max-h-auto md:max-h-[500px] gap-4 sm:gap-6 md:gap-2 mt-10 sm:mt-16 md:mt-20 px-4 sm:px-6 md:px-0
          ">
            <div className="w-full md:w-[800px] flex justify-center md:justify-start">
              <img
                src="/royal.png"
                alt="Royal Suite"
                className="w-full max-w-[400px] sm:max-w-[450px] md:max-w-[500px] lg:max-w-[550px] h-auto md:h-[500px] lg:h-[600px] object-cover rounded-xl"
              />
            </div>

            <div className="flex-1 text-black px-4 sm:px-6 md:px-0">
              <h3 className="text-2xl sm:text-2xl md:text-3xl mb-3 sm:mb-4">Royal Suites</h3>
              <div className="flex flex-col md:flex-row text-gray-700 text-sm sm:text-base md:text-lg mb-4 sm:mb-5 md:mb-6 gap-2 sm:gap-3 md:gap-8">
                <span>City View</span>
                <span className="hidden md:block">|</span>
                <span>King Bed / 2 Single Beds</span>
              </div>

              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6 sm:mb-8 md:mb-10 max-w-[500px]">
                The Royal Suite offers expansive elegance with exclusive amenities and luxurious décor.
              </p>

              <Link to="/booking/royal-suites">
                <button className="bg-[#DC9E38] text-black px-8 sm:px-12 md:px-50 py-2 sm:py-2.5 md:py-3 rounded font-semibold text-sm sm:text-base hover:bg-[#c38c2f] transition w-full sm:w-auto">
                  View More Details
                </button>
              </Link>
            </div>
          </div>


          {/* ================== FAMILY ROOMS ================== */}
          <div className="
            max-w-[1500px] mx-auto bg-white shadow-2xl rounded-2xl
            overflow-hidden flex flex-col md:flex-row items-center
            max-h-auto md:max-h-[500px] gap-4 sm:gap-6 md:gap-2 mt-10 sm:mt-16 md:mt-20 px-4 sm:px-6 md:px-0
          ">
            <div className="w-full md:w-[800px] flex justify-center md:justify-start">
              <img
                src="/family.png"
                alt="Family Room"
                className="w-full max-w-[400px] sm:max-w-[450px] md:max-w-[500px] lg:max-w-[550px] h-auto md:h-[500px] lg:h-[600px] object-cover rounded-xl"
              />
            </div>

            <div className="flex-1 text-black px-4 sm:px-6 md:px-0">
              <h3 className="text-2xl sm:text-2xl md:text-3xl mb-3 sm:mb-4">Family Rooms</h3>
              <div className="flex flex-col md:flex-row text-gray-700 text-sm sm:text-base md:text-lg mb-4 sm:mb-5 md:mb-6 gap-2 sm:gap-3 md:gap-8">
                <span>City View</span>
                <span className="hidden md:block">|</span>
                <span>King Bed / 2 Single Beds</span>
              </div>

              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6 sm:mb-8 md:mb-10 max-w-[500px]">
                The Family Room provides generous space, comfort, and kid-friendly amenities for memorable stays.
              </p>

              <Link to="/booking/family-rooms">
                <button className="bg-[#DC9E38] text-black px-8 sm:px-12 md:px-50 py-2 sm:py-2.5 md:py-3 rounded font-semibold text-sm sm:text-base hover:bg-[#c38c2f] transition w-full sm:w-auto">
                  View More Details
                </button>
              </Link>
            </div>
          </div>

        </section>
      </div>
    </>
  );
};

export default Home;
