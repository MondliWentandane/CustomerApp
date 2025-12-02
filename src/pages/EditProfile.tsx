import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { userService } from "../services/userService";
import type { User } from "../services/userService";
import { authService } from "../services/authService";

const EditProfile = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("/user.png");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await userService.getProfile();
        setName(userData.fullName || "");
        setEmail(userData.email || "");
        setPhone(userData.phone || "");
        setImage(userData.profileImage || "/user.png");
      } catch (err: any) {
        // Fallback to localStorage user
        const localUser = authService.getCurrentUser();
        if (localUser) {
          setName(localUser.fullName || "");
          setEmail(localUser.email || "");
          setPhone(localUser.phone || "");
        }
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    if (authService.isAuthenticated()) {
      fetchProfile();
    } else {
      navigate("/signin");
    }
  }, [navigate]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const result = await userService.uploadProfileImage(file);
        setImage(result.imageUrl);
      } catch (err) {
        // Fallback to local preview
        const url = URL.createObjectURL(file);
        setImage(url);
      }
    }
  };

  const handleSave = async () => {
    setError("");
    setSaving(true);

    try {
      await userService.updateProfile({
        fullName: name,
        email: email,
        phone: phone,
        profileImage: image,
      });
      navigate("/profile");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full bg-gray-50 mt-20 min-h-screen">
        <Navbar />
        <div className="max-w-[600px] mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">
          <p className="text-center">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 mt-20 min-h-screen">
      <Navbar />

      <div className="max-w-[600px] mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12 bg-white shadow-lg rounded-xl">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Edit Profile</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

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
            disabled={saving}
            className="w-full sm:w-auto px-4 sm:px-5 py-2 bg-[#DC9E38] text-black rounded-lg hover:bg-[#c78e2d] text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EditProfile;
