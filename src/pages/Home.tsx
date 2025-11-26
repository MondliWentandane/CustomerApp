import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Navbar />

    
      <div className="w-full bg-gray-50 mt-20">

        {/* Rooms & Suites Section */}
        <section className="w-full bg-white py-20 px-6">

          {/* TITLE */}
          <div className="text-center mb-16">
            <h2 className="text-4xl text-black">StayEase's Rooms & Suites</h2>
            <p className="text-gray-700 mt-4 text-lg max-w-2xl mx-auto">
              Explore our range of luxurious rooms and suites tailored to suit every guest's needs.
            </p>
          </div>

          {/* ================== SUPERIOR ROOM ================== */}
          <div className="
            max-w-[1500px] mx-auto bg-white shadow-2xl rounded-2xl
            overflow-hidden flex flex-col md:flex-row items-center
            max-h-[500px] gap-2
          ">
            <div className="w-full md:w-[800px]">
              <img
                src="/SUPERIOR.png"
                alt="Superior Room"
                className="w-[550px] h-[600px] object-cover rounded-xl"
              />
            </div>

            <div className="flex-1 text-black">
              <h3 className="text-3xl mb-4">Superior Rooms</h3>
              <div className="flex flex-col md:flex-row text-gray-700 text-lg mb-6 gap-3 md:gap-8">
                <span>City View</span>
                <span className="hidden md:block">|</span>
                <span>King Bed / 2 Single Beds</span>
              </div>

              <p className="text-base text-gray-700 leading-relaxed mb-10 max-w-[500px]">
                Experience comfort and elegance in our Superior Room, thoughtfully designed for relaxation and peace.
              </p>

              <Link to="/booking/superior"> 
              <button className="bg-[#DC9E38] text-black px-50 py-3 rounded font-semibold hover:bg-[#c38c2f] transition">
                View More Details
              </button>
              </Link>
            </div>
          </div>


          {/* ================== DELUXE ROOMS ================== */}
          <div className="
            max-w-[1500px] mx-auto bg-white shadow-2xl rounded-2xl
            overflow-hidden flex flex-col md:flex-row items-center
            max-h-[500px] gap-2 mt-20
          ">
            <div className="w-full md:w-[800px]">
              <img
                src="/delux.png"
                alt="Deluxe Room"
                className="w-[550px] h-[600px] object-cover rounded-xl"
              />
            </div>

            <div className="flex-1 text-black">
              <h3 className="text-3xl mb-4">Deluxe Rooms</h3>
              <div className="flex flex-col md:flex-row text-gray-700 text-lg mb-6 gap-3 md:gap-8">
                <span>City View</span>
                <span className="hidden md:block">|</span>
                <span>King Bed / 2 Single Beds</span>
              </div>

              <p className="text-base text-gray-700 leading-relaxed mb-10 max-w-[500px]">
                Our Deluxe Room offers an elevated sense of luxury with its spacious layout and premium finishes.
              </p>

              <Link to="/booking/deluxe">
                <button className="bg-[#DC9E38] text-black px-50 py-3 rounded font-semibold hover:bg-[#c38c2f] transition">
                  View More Details
                </button>
              </Link>
            </div>
          </div>


          {/* ================== EXECUTIVE ROOMS ================== */}
          <div className="
            max-w-[1500px] mx-auto bg-white shadow-2xl rounded-2xl
            overflow-hidden flex flex-col md:flex-row items-center
            max-h-[500px] gap-2 mt-20
          ">
            <div className="w-full md:w-[800px]">
              <img
                src="/executive.png"
                alt="Executive Room"
                className="w-[550px] h-[600px] object-cover rounded-xl"
              />
            </div>

            <div className="flex-1 text-black">
              <h3 className="text-3xl mb-4">Executive Rooms</h3>
              <div className="flex flex-col md:flex-row text-gray-700 text-lg mb-6 gap-3 md:gap-8">
                <span>City View</span>
                <span className="hidden md:block">|</span>
                <span>King Bed / 2 Single Beds</span>
              </div>

              <p className="text-base text-gray-700 leading-relaxed mb-10 max-w-[500px]">
                Crafted for both business and leisure, the Executive Room offers comfort with a professional touch.
              </p>

              <Link to="/booking/executive-suites">
                <button className="bg-[#DC9E38] text-black px-50 py-3 rounded font-semibold hover:bg-[#c38c2f] transition">
                  View More Details
                </button>
              </Link>
            </div>
          </div>


          {/* ================== JUNIOR SUITES ================== */}
          <div className="
            max-w-[1500px] mx-auto bg-white shadow-2xl rounded-2xl
            overflow-hidden flex flex-col md:flex-row items-center
            max-h-[500px] gap-2 mt-20
          ">
            <div className="w-full md:w-[800px]">
              <img
                src="/junior.png"
                alt="Junior Suite"
                className="w-[550px] h-[600px] object-cover rounded-xl"
              />
            </div>

            <div className="flex-1 text-black">
              <h3 className="text-3xl mb-4">Junior Suites</h3>
              <div className="flex flex-col md:flex-row text-gray-700 text-lg mb-6 gap-3 md:gap-8">
                <span>City View</span>
                <span className="hidden md:block">|</span>
                <span>King Bed / 2 Single Beds</span>
              </div>

              <p className="text-base text-gray-700 leading-relaxed mb-10 max-w-[500px]">
                Step into refined luxury with our Junior Suite, offering a semi-separate living space.
              </p>

              <Link to="/booking/junior-suites">
                <button className="bg-[#DC9E38] text-black px-50 py-3 rounded font-semibold hover:bg-[#c38c2f] transition">
                  View More Details
                </button>
              </Link>
            </div>
          </div>


          {/* ================== ROYAL SUITES ================== */}
          <div className="
            max-w-[1500px] mx-auto bg-white shadow-2xl rounded-2xl
            overflow-hidden flex flex-col md:flex-row items-center
            max-h-[500px] gap-2 mt-20
          ">
            <div className="w-full md:w-[800px]">
              <img
                src="/royal.png"
                alt="Royal Suite"
                className="w-[550px] h-[600px] object-cover rounded-xl"
              />
            </div>

            <div className="flex-1 text-black">
              <h3 className="text-3xl mb-4">Royal Suites</h3>
              <div className="flex flex-col md:flex-row text-gray-700 text-lg mb-6 gap-3 md:gap-8">
                <span>City View</span>
                <span className="hidden md:block">|</span>
                <span>King Bed / 2 Single Beds</span>
              </div>

              <p className="text-base text-gray-700 leading-relaxed mb-10 max-w-[500px]">
                The Royal Suite offers expansive elegance with exclusive amenities and luxurious décor.
              </p>

              <Link to="/booking/royal-suites">
                <button className="bg-[#DC9E38] text-black px-50 py-3 rounded font-semibold hover:bg-[#c38c2f] transition">
                  View More Details
                </button>
              </Link>
            </div>
          </div>


          {/* ================== FAMILY ROOMS ================== */}
          <div className="
            max-w-[1500px] mx-auto bg-white shadow-2xl rounded-2xl
            overflow-hidden flex flex-col md:flex-row items-center
            max-h-[500px] gap-2 mt-20
          ">
            <div className="w-full md:w-[800px]">
              <img
                src="/family.png"
                alt="Family Room"
                className="w-[550px] h-[600px] object-cover rounded-xl"
              />
            </div>

            <div className="flex-1 text-black">
              <h3 className="text-3xl mb-4">Family Rooms</h3>
              <div className="flex flex-col md:flex-row text-gray-700 text-lg mb-6 gap-3 md:gap-8">
                <span>City View</span>
                <span className="hidden md:block">|</span>
                <span>King Bed / 2 Single Beds</span>
              </div>

              <p className="text-base text-gray-700 leading-relaxed mb-10 max-w-[500px]">
                The Family Room provides generous space, comfort, and kid-friendly amenities for memorable stays.
              </p>

              <Link to="/booking/family-rooms">
                <button className="bg-[#DC9E38] text-black px-50 py-3 rounded font-semibold hover:bg-[#c38c2f] transition">
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
