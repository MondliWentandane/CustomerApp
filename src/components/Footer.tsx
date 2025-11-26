const Footer = () => {
  return (
    <footer id="footer"  className="w-full">
      {/* Top small gold bar */}
      <div className="w-full h-10 bg-[#DC9E38]"></div>

      {/* Main footer block */}
      <div className="w-full bg-[#403D36] text-white py-12 px-6 ">
        <div className=" mx-auto gap-60 flex ml-20">

          {/* Column 1*/}
        
          <div className="flex flex-col w-[400px] h-[500px] mt-9 bg-[#4C4942]">
            {/* Logo */}
            <div className="flex items-center space-x-4 mb-10 mt-9 ml-9">
              <img src="/logo 2.png" alt="StayEase Logo" className="h-16 w-auto" />
              <div className="flex flex-col">
                <span className=" text-xl ">StayEase</span>
                <span className="text-sm">Luxury Hotel</span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col space-y-6 ml-9 mt-2 ">
                <p>Contact Info: </p>
              <div className="flex items-center space-x-2 ml-2">
                <img src="/phone.png" alt="Call" className="w-5 h-5 "/>
                <span>+2712345865</span>
              </div>
              <div className="flex items-center space-x-2">
                <img src="/email.jpg" alt="Email" className="w-10 h-10 "/>
                <span>stayEase@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <img src="/pin.png" alt="Location" className="w-10 h-10 "/>
                <span>56 Railway St Annadale</span>
              </div>
            </div>
            <div className="flex gap-8 mt-16 ml-12">
                <div className="rounded-full bg-[#DC9E38] w-[70px]">
           <img src="/facebook-removebg-preview.png" alt="facebook" className="w-12 ml-2 mt-3 h-12 object-cover "/>
          </div>
          <div className="rounded-full bg-[#DC9E38] w-[70px]">
           <img src="/instagram-removebg-preview.png" alt="facebook" className="w-12 h-12 ml-3 mt-2 object-cover "/>
           </div>
           <div className="rounded-full bg-[#DC9E38] w-[70px]">
           <img src="/twitter-removebg-preview.png" alt="facebook" className="w-14 h-12 ml-3 mt-2 object-cover "/>
            </div>
            </div>
          </div>

          {/* Column 2: Terms */}
          <div className="flex flex-col space-y-2 mt-6 md:mt-40">
            <span className="font-semibold text-lg mb-2">Terms</span>
            <span className="hover:text-[#DC9E38] cursor-pointer">Terms of Service</span>
            <span className="hover:text-[#DC9E38] cursor-pointer">Privacy Policy</span>
          </div>

          {/* Column 3: Social Media */}
          <div className="flex flex-col space-y-2 mt-6 md:mt-40">
            <span className="font-semibold text-lg mb-2">Social Media</span>
            <span className="hover:text-[#DC9E38] cursor-pointer">Facebook</span>
            <span className="hover:text-[#DC9E38] cursor-pointer">Instagram</span>
            <span className="hover:text-[#DC9E38] cursor-pointer">Twitter/X</span>
            <span className="hover:text-[#DC9E38] cursor-pointer">LinkedIn</span>
            <span className="hover:text-[#DC9E38] cursor-pointer">TikTok</span>
          </div>

          {/* Column 4: Locations */}
          <div className="flex flex-col space-y-2 mt-6 md:mt-40">
            <span className="font-semibold text-lg mb-2">Location</span>
            <span>Limpopo</span>
            <span>Mpumalanga</span>
            <span>Gauteng</span>
            <span>Western Cape</span>
            <span>Kwa-Zulu Natal</span>
          </div>

        </div>

{/* Message Input Section */}
<div className="max-w-3xl mx-auto my-4 mt-[-150px] mr-90">
  <p className="mb-2 text-white">Message:</p>
  <div className="flex">
    <input
      type="text"
      placeholder="Enter Your Comment"
      className="flex-1 px-4 py-4 rounded-l border border-gray-300 focus:outline-none bg-white placeholder-black text-black"
    />
    <button className="bg-[#DC9E38] text-white px-16 py-2 rounded-r font-semibold">
      Send
    </button>
  </div>
</div>



     
        {/* Bottom Bar */}
        <div className="mt-8 text-center">
          © 2025, StayEase. All Rights Reserved.{" "}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="ml-4 text-[#DC9E38] font-bold"
          >
            Back to top ^
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
