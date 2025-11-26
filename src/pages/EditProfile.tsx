import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const EditProfile = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("Sithomola Musiki");
  const [email, setEmail] = useState("musiki@gmail.com");
  const [phone, setPhone] = useState("0790518213");
  const [image, setImage] = useState("/user.png");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
    }
  };

  const handleSave = () => {
    alert("Profile updated successfully!");
    navigate("/profile");
  };

  return (
    <div className="w-full bg-gray-50 mt-20 min-h-screen">
      <Navbar />

      <div className="max-w-[600px] mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12 bg-white shadow-lg rounded-xl">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Edit Profile</h2>

        {/* IMAGE */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={image}
            className="w-32 h-32 rounded-full border border-gray-400 object-cover"
            alt="Profile"
          />
          <label className="mt-3 cursor-pointer text-[#DC9E38]">
            Change Photo
            <input type="file" className="hidden" onChange={handleImageChange} />
          </label>
        </div>

        {/* INPUTS */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-[#DC9E38]"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-[#DC9E38]"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPhone(e.target.value)
              }
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-[#DC9E38]"
            />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mt-6 sm:mt-8">
          <button
            onClick={() => navigate("/profile")}
            className="w-full sm:w-auto px-4 sm:px-5 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 text-sm sm:text-base"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="w-full sm:w-auto px-4 sm:px-5 py-2 bg-[#DC9E38] text-black rounded-lg hover:bg-[#c78e2d] text-sm sm:text-base"
          >
            Save Changes
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EditProfile;
