 
 const Navbar = () => {
 return(
    <>
 {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white text-black w-full shadow-md">
        {/* Logo */}
        <div className="h-14 w-auto flex items-center ml-20">
          <img
            src="/logo.png"
            alt="StayEase Logo"
            className="h-full w-auto object-contain transform scale-[3.6]"
          />
        </div>

        {/* Navigation Links + Book Online */}
        <div className="flex items-center space-x-6 ml-auto">
          <ul className="hidden md:flex space-x-8 text-lg">
            <li className="hover:text-[#DC9E38] cursor-pointer">Home</li>
            <li className="hover:text-[#DC9E38] cursor-pointer">About Us</li>
            <li className="hover:text-[#DC9E38] cursor-pointer">Rooms & Suites</li>
            <li className="hover:text-[#DC9E38] cursor-pointer">Facilities</li>
            <li className="hover:text-[#DC9E38] cursor-pointer">Our Location</li>
            <li className="hover:text-[#DC9E38] cursor-pointer">Contact</li>
          </ul>

          <button
            className="hidden md:block border border-black text-black px-6 py-2 rounded-md font-semibold hover:border-[#DC9E38] hover:bg-[#DC9E38] hover:text-white transition"
          >
            Book Online
          </button>
        </div>
      </nav>
      </>
 )
 }

      export default Navbar;