
import { HashLink as Link } from 'react-router-hash-link';


const Navbar = () => {

  return (
    <nav className="fixed top-0 left-0 z-50 flex items-center justify-between px-2 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 bg-white text-black w-full shadow-md">
      {/* Logo */}
      <div className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto flex items-center ml-2 sm:ml-4 md:ml-8 lg:ml-20">
        <img
          src="/logo.png"
          alt="StayEase Logo"
          className="h-full w-auto object-contain transform scale-[1.5] sm:scale-[2] md:scale-[2.5] lg:scale-[3.6]"
        />
      </div>

      {/* Links */}
      <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-6 ml-auto">
        <ul className="hidden md:flex space-x-4 lg:space-x-6 xl:space-x-8 text-center text-xs md:text-sm lg:text-sm">
          <li className="hover:text-[#DC9E38] cursor-pointer">
            <Link smooth to="/#hero">
              Home
            </Link>
          </li>

          <li className="hover:text-[#DC9E38] cursor-pointer">
             <Link smooth to="/#about">
              About Us
            </Link>
          </li>

          <li className="hover:text-[#DC9E38] cursor-pointer">
            <a href="/home">
              Rooms & Suites
            </a>
          </li>

          <li className="hover:text-[#DC9E38] cursor-pointer">
            <Link smooth to="/#facilities">
              Facilities
            </Link>
          </li>

          <li className="hover:text-[#DC9E38] cursor-pointer">
            <Link smooth to="/#location">
               Location
            </Link>
          </li>

          <li className="hover:text-[#DC9E38] cursor-pointer">
            <Link smooth to="/#footer">
              Contact
            </Link>
          </li>

          <li className="hover:text-[#DC9E38] cursor-pointer">
            <a href="/profile">
              Profile
            </a>
          </li>
        </ul>

        <button className="hidden md:block border border-black text-black px-3 md:px-4 lg:px-6 py-1 md:py-1.5 lg:py-2 rounded-md text-xs md:text-sm lg:text-base font-semibold hover:border-[#DC9E38] hover:bg-[#DC9E38] hover:text-white transition">
          Book Online
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
