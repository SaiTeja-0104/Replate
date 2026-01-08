import { useState, useContext, useEffect } from "react";
import { FaUserCircle, FaEnvelope, FaMapMarkerAlt, FaEdit } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-hot-toast";
import { UserContext } from "../context/UserContext";

const ProfilePage = ({ role }) => {
  const { userData, backendUrl, token, setUserData } = useContext(UserContext);

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  const [user, setUser] = useState(userData);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userData?.name || "",
    location: userData?.location || "",
    mobile: userData?.mobile || "",
  });

  const joined = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const res = await axios.post(
        `${backendUrl}/user/profile/update`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        toast.success("Profile updated successfully!");
        setUser(res.data.data);
        setUserData?.(res.data.data);
        setEditing(false);
      } else {
        toast.error("Failed to update profile.");
      }
    } catch (err) {
      toast.error(err.response?.data || err.message);
    }
  };

  return (
    <div
      className={`min-h-screen ${
        role === "donor" ? "bg-[#fdfbf9]" : "bg-[#F4FDF0]"
      } flex justify-center items-center py-8 px-4 sm:py-0`}
    >
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header Banner */}
        <div
          className={`bg-gradient-to-r ${
            role === "donor"
              ? "from-orange-300 to-pink-200"
              : "from-green-300 to-blue-200"
          } h-32 relative`}
        >
          <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-10">
            <FaUserCircle
              className={`text-8xl text-white ${
                role === "donor" ? "bg-orange-300" : "bg-green-400"
              } rounded-full border-4 border-white shadow-lg`}
            />
          </div>
        </div>

        {/* Profile Details */}
        <div className="mt-16 px-6 sm:px-8 pb-8 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            {user?.name}
          </h2>
          <p className="text-sm text-gray-500 capitalize">{role}</p>

          {/* Info Cards */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Email */}
            <div className="flex flex-col items-center gap-3 p-4 bg-gray-50 rounded-xl shadow-sm text-center">
              <FaEnvelope className="text-green-500 text-xl" />
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="font-medium text-gray-800">{user?.email}</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex flex-col items-center gap-3 p-4 bg-gray-50 rounded-xl shadow-sm text-center">
              <FaMapMarkerAlt className="text-green-500 text-xl" />
              <div>
                <p className="text-xs text-gray-500">Location</p>
                <p className="font-medium text-gray-800">{user?.location}</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex flex-col items-center gap-3 p-4 bg-gray-50 rounded-xl shadow-sm text-center">
              <FaUserCircle className="text-green-500 text-xl" />
              <div>
                <p className="text-xs text-gray-500">Phone</p>
                <p className="font-medium text-gray-800">{user?.mobile}</p>
              </div>
            </div>

            {/* Joined */}
            <div className="flex flex-col items-center gap-3 p-4 bg-gray-50 rounded-xl shadow-sm text-center">
              <FaEdit className="text-green-500 text-xl" />
              <div>
                <p className="text-xs text-gray-500">Joined</p>
                <p className="font-medium text-gray-800">{joined}</p>
              </div>
            </div>
          </div>

          {/* Edit Button / Form */}
          <div className="mt-8">
            {!editing ? (
              <button
                onClick={() => {
                  setFormData({
                    name: user?.name || "",
                    location: user?.location || "",
                    mobile: user?.mobile || "",
                  });
                  setEditing(true);
                }}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition-all shadow-md"
              >
                Edit Profile
              </button>
            ) : (
              <div className="space-y-4 mt-6 text-center">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none text-center"
                />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter your location"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none text-center"
                />
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none text-center"
                />

                <div className="flex justify-center gap-3 mt-4">
                  <button
                    onClick={() => setEditing(false)}
                    className="px-5 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-sm"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;