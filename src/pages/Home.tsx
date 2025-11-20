import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
    <Navbar />
    <div className="w-full bg-gray-50">

      {/* Rooms & Suites Section */}
      <section className="w-full bg-white py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            StayEase's Rooms & Suites
          </h2>
          <p className="text-gray-700 mt-4 text-lg md:text-xl max-w-2xl mx-auto">
            Explore our range of luxurious rooms and suites tailored to suit every guest's needs.
          </p>
        </div>

        {/* Superior Room Card */}
        <div className="flex flex-col md:flex-row items-center gap-8 max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="shrink-0">
            <img
              src="/SUPERIOR.png"
              alt="Superior Room"
              className="w-full md:w-96 h-64 md:h-80 object-cover"
            />
          </div>
          <div className="flex-1 p-6 text-black">
            <h3 className="text-2xl font-semibold mb-2">Superior Rooms</h3>
            <div className="flex flex-col md:flex-row text-gray-600 mb-4 gap-2 md:gap-6">
              <span>City View</span>
              <span>|</span>
              <span>King Bed / 2 Single Beds</span>
            </div>
            <p className="mb-6">
              Experience comfort and elegance in our Superior Room, thoughtfully designed for relaxation. 
              A simple, peaceful retreat for guests seeking tranquility.
            </p>
            <button className="bg-[#DC9E38] text-black px-6 py-3 rounded font-semibold hover:bg-[#c38c2f] transition">
              View More Details
            </button>
          </div>
        </div>
      </section>

      {/* You can add other sections here: Deluxe Rooms, Executive Rooms, etc. */}

    </div>
    </>
  );
};

export default Home;
