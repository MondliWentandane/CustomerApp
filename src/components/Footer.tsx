const Footer = () => {
  return (
    <footer id="footer"  className="w-full">
      {/* Top small gold bar */}
      <div className="w-full h-10 bg-[#DC9E38]"></div>

      {/* Main footer block */}
      <div className="w-full bg-[#403D36] text-white py-6 sm:py-8 md:py-10 lg:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto gap-4 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-20 flex flex-col md:flex-row">

          {/* Column 1*/}
        
          <div className="flex flex-col w-full sm:w-[300px] md:w-[350px] lg:w-[400px] h-auto sm:h-[450px] md:h-[500px] mt-4 sm:mt-6 md:mt-9 bg-[#4C4942]">
            {/* Logo */}
            <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 mb-6 sm:mb-8 md:mb-10 mt-4 sm:mt-6 md:mt-9 ml-4 sm:ml-6 md:ml-9">
              <img src="/logo 2.png" alt="StayEase Logo" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto" />
              <div className="flex flex-col">
                <span className="text-base sm:text-lg md:text-xl">StayEase</span>
                <span className="text-xs sm:text-sm">Luxury Hotel</span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col space-y-3 sm:space-y-4 md:space-y-6 ml-4 sm:ml-6 md:ml-9 mt-2">
                <p className="text-sm sm:text-base">Contact Info: </p>
              <div className="flex items-center space-x-2 ml-2">
                <img src="/phone.png" alt="Call" className="w-4 h-4 sm:w-5 sm:h-5"/>
                <span className="text-xs sm:text-sm md:text-base">+2712345865</span>
              </div>
              <div className="flex items-center space-x-2">
                <img src="/email.jpg" alt="Email" className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"/>
                <span className="text-xs sm:text-sm md:text-base break-all">stayEase@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <img src="/pin.png" alt="Location" className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"/>
                <span className="text-xs sm:text-sm md:text-base">56 Railway St Annadale</span>
              </div>
            </div>
            <div className="flex gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-12 md:mt-16 ml-6 sm:ml-9 md:ml-12">
                <div className="rounded-full bg-[#DC9E38] w-[50px] sm:w-[60px] md:w-[70px]">
           <img src="/facebook-removebg-preview.png" alt="facebook" className="w-8 sm:w-10 md:w-12 ml-1 sm:ml-2 mt-2 sm:mt-2.5 md:mt-3 h-8 sm:h-10 md:h-12 object-cover "/>
          </div>
          <div className="rounded-full bg-[#DC9E38] w-[50px] sm:w-[60px] md:w-[70px]">
           <img src="/instagram-removebg-preview.png" alt="facebook" className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 ml-1 sm:ml-2 md:ml-3 mt-1.5 sm:mt-2 md:mt-2 object-cover "/>
           </div>
           <div className="rounded-full bg-[#DC9E38] w-[50px] sm:w-[60px] md:w-[70px]">
           <img src="/twitter-removebg-preview.png" alt="facebook" className="w-10 sm:w-12 md:w-14 h-8 sm:h-10 md:h-12 ml-1 sm:ml-2 md:ml-3 mt-1.5 sm:mt-2 md:mt-2 object-cover "/>
            </div>
            </div>
          </div>

          {/* Column 2: Terms */}
          <div className="flex flex-col space-y-1 sm:space-y-2 mt-4 sm:mt-6 md:mt-20 lg:mt-32 xl:mt-40">
            <span className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">Terms</span>
            <span className="hover:text-[#DC9E38] cursor-pointer text-sm sm:text-base">Terms of Service</span>
            <span className="hover:text-[#DC9E38] cursor-pointer text-sm sm:text-base">Privacy Policy</span>
          </div>

          {/* Column 3: Social Media */}
          <div className="flex flex-col space-y-1 sm:space-y-2 mt-4 sm:mt-6 md:mt-20 lg:mt-32 xl:mt-40">
            <span className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">Social Media</span>
            <span className="hover:text-[#DC9E38] cursor-pointer text-sm sm:text-base">Facebook</span>
            <span className="hover:text-[#DC9E38] cursor-pointer text-sm sm:text-base">Instagram</span>
            <span className="hover:text-[#DC9E38] cursor-pointer text-sm sm:text-base">Twitter/X</span>
            <span className="hover:text-[#DC9E38] cursor-pointer text-sm sm:text-base">LinkedIn</span>
            <span className="hover:text-[#DC9E38] cursor-pointer text-sm sm:text-base">TikTok</span>
          </div>

          {/* Column 4: Locations */}
          <div className="flex flex-col space-y-1 sm:space-y-2 mt-4 sm:mt-6 md:mt-20 lg:mt-32 xl:mt-40">
            <span className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">Location</span>
            <span className="text-sm sm:text-base">Limpopo</span>
            <span className="text-sm sm:text-base">Mpumalanga</span>
            <span className="text-sm sm:text-base">Gauteng</span>
            <span className="text-sm sm:text-base">Western Cape</span>
            <span className="text-sm sm:text-base">Kwa-Zulu Natal</span>
          </div>

        </div>

{/* Message Input Section */}
<div className="max-w-3xl mx-auto my-4 sm:my-6 md:my-8 mt-[-100px] sm:mt-[-120px] md:mt-[-140px] lg:mt-[-150px] px-4 sm:px-6 mr-12">
  <p className="mb-2 text-white text-sm sm:text-base">Message:</p>
  <div className="flex flex-col sm:flex-row">
    <input
      type="text"
      placeholder="Enter Your Comment"
      className="flex-1 px-3 sm:px-4 py-3 sm:py-4 rounded sm:rounded-l sm:rounded-r-none border border-gray-300 focus:outline-none bg-white placeholder-black text-black text-sm sm:text-base"
    />
    <button className="bg-[#DC9E38] text-white px-8 sm:px-12 md:px-16 py-2 sm:py-3 rounded sm:rounded-r sm:rounded-l-none font-semibold text-sm sm:text-base mt-2 sm:mt-0">
      Send
    </button>
  </div>
</div>



     
        {/* Bottom Bar */}
        <div className="mt-4 sm:mt-6 md:mt-8 text-center text-xs sm:text-sm md:text-base px-4">
          © 2025, StayEase. All Rights Reserved.{" "}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="ml-2 sm:ml-4 text-[#DC9E38] font-bold"
          >
            Back to top ^
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
