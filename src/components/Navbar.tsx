
import { HashLink as Link } from 'react-router-hash-link';


const Navbar = () => {

  return (
    <nav className="fixed top-0 left-0 z-50 flex items-center justify-between px-8 py-4 bg-white text-black w-full shadow-md">
      {/* Logo */}
      <div className="h-14 w-auto flex items-center ml-20">
        <img
          src="/logo.png"
          alt="StayEase Logo"
          className="h-full w-auto object-contain transform scale-[3.6]"
        />
      </div>

      {/* Links */}
      <div className="flex items-center space-x-6 ml-auto">
        <ul className="hidden md:flex space-x-8 text-center text-lg">
          <li className="flex flex-col items-center hover:text-[#DC9E38] cursor-pointer">
            <Link smooth to="/#hero">
              <img src="/home.png" className="w-5 h-5 mb-2 ml-3" />
              Home
            </Link>
          </li>

          <li className="flex flex-col items-center hover:text-[#DC9E38] cursor-pointer">
             <Link smooth to="/#about">
              <img src="/about us.png" className="w-6 h-6 mb-1 ml-7" />
              About Us
            </Link>
          </li>

          <li className="flex flex-col items-center hover:text-[#DC9E38] cursor-pointer">
            <a href="/home">
              <img src="/room-suite.png" className="w-6 h-6 mb-1 ml-13" />
              Rooms & Suites
            </a>
          </li>

          <li className="flex flex-col items-center hover:text-[#DC9E38] cursor-pointer">
            <Link smooth to="/#facilities">
              <img src="/facilities.png" className="w-6 h-6 mb-1 ml-5" />
              Facilities
            </Link>
          </li>

          <li className="flex flex-col items-center hover:text-[#DC9E38] cursor-pointer">
            <Link smooth to="/#location">
              <img src="/location.png" className="w-6 h-6 mb-1 ml-6" />
               Location
            </Link>
          </li>

          <li className="flex flex-col items-center hover:text-[#DC9E38] cursor-pointer">
            <Link smooth to="/#footer">
              <img src="/contact.png" className="w-6 h-6 mb-1 ml-6" />
              Contact
            </Link>
          </li>

          <li className="flex flex-col items-center hover:text-[#DC9E38] cursor-pointer">
            <a href="/profile">
              <img src="/user.png" className="w-6 h-6 mb-1 ml-3" />
              Profile
            </a>
          </li>
        </ul>

        <button className="hidden md:block border border-black text-black px-6 py-2 rounded-md font-semibold hover:border-[#DC9E38] hover:bg-[#DC9E38] hover:text-white transition">
          Book Online
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
