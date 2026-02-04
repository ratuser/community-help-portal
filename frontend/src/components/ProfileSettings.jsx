import { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../api";

const ProfileSettings = () => {
  const [formdata, setFormdata] = useState({
    name: "",
    phone: "",
    address: "",
    profilePic: "",
  });
  const [message, setMessage] = useState("");

  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/api/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormdata(res.data);
      } catch (err) {
        setMessage("Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(`${API_URL}/api/profile`, formdata, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormdata(res.data);
      setMessage("Profile updated successfully!");
    } catch (err) {
      setMessage("Error updating profile");
    }
  };

  return (
    <div className="min-h-screen bg-black py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-semibold">Profile Settings</h1>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <form onSubmit={handleSubmit}>
                  
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      autoComplete="off"
                      type="text"
                      name="name"
                      value={formdata.name}
                      onChange={handleChange}
                      placeholder=" "
                      required
                      className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-yellow-500 peer"
                    />
                    <label className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75">
                      Full Name
                    </label>
                  </div>

                  
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      autoComplete="off"
                      type="text"
                      name="phone"
                      value={formdata.phone || ""}
                      onChange={handleChange}
                      placeholder=" "
                      className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-yellow-500 peer"
                    />
                    <label className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75">
                      Phone
                    </label>
                  </div>

                  
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      autoComplete="off"
                      type="text"
                      name="address"
                      value={formdata.address || ""}
                      onChange={handleChange}
                      placeholder=" "
                      className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-yellow-500 peer"
                    />
                    <label className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75">
                      Address
                    </label>
                  </div>

                  
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      autoComplete="off"
                      type="text"
                      name="profilePic"
                      value={formdata.profilePic || ""}
                      onChange={handleChange}
                      placeholder=" "
                      className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-yellow-500 peer"
                    />
                    <label className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75">
                      Profile Picture URL
                    </label>
                  </div>

                  
                  <button
                    type="submit"
                    className="bg-yellow-200 text-black rounded-md px-4 py-2 w-full"
                  >
                    Update Profile
                  </button>

                  
                  {message && <p className="text-red-500 text-sm mt-2">{message}</p>}
                  
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
