import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../api";
const HelpRequestForm = () => {
  const navigate = useNavigate();

  const [formdata, setformdata] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    urgency: "",
  });

  const [message, setmessage] = useState("");

  const handlechange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    // console.log("Token:", localStorage.getItem("token"));
    // console.log("Formdata:", formdata);
    try {

      const token = localStorage.getItem("token"); // if your backend requires auth

      await axios.post(
        `${API_URL}/api/requests`,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setmessage("Help request submitted successfully!");
    setformdata({
      title: "",
      description: "",
      category: "Other",
      location: "",
      urgency: "Medium",
    });

    setTimeout(() => {
      setmessage("");
    }, 3000);


      navigate("/my-requests"); // redirect after success
    } catch (err) {
      setmessage(err.response?.data?.msg || "Error occurred while submitting request");
    }
  };

  return (
    <div className="min-h-screen bg-black py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-semibold">Create Help Request</h1>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <form onSubmit={handlesubmit}>
                  {/* Title */}
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      value={formdata.title}
                      onChange={handlechange}
                      placeholder=" "
                      required
                      className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-yellow-500 peer"
                    />
                    <label
                      htmlFor="title"
                      className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                      peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 
                      peer-focus:-translate-y-6 peer-focus:scale-75"
                    >
                      Request Title
                    </label>
                  </div>

                  {/* Description */}
                  <div className="relative z-0 w-full mb-6 group">
                    <textarea
                      name="description"
                      id="description"
                      value={formdata.description}
                      onChange={handlechange}
                      placeholder=" "
                      required
                      rows="3"
                      className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 
                      border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-yellow-500 peer"
                    />
                    <label
                      htmlFor="description"
                      className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                      peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 
                      peer-focus:-translate-y-6 peer-focus:scale-75"
                    >
                      Description
                    </label>
                  </div>

                  {/* Category */}
                  <div className="relative z-0 w-full mb-6 group">
                    <select
                      name="category"
                      id="category"
                      value={formdata.category}
                      onChange={handlechange}
                      required
                      className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 
                      border-gray-300 focus:outline-none focus:ring-0 focus:border-yellow-500"
                    >
                      <option value="">Select Category</option>
                      <option value="Food">Food</option>
                      <option value="Medical">Medical</option>
                      <option value="Education">Education</option>
                      <option value="Shelter">Shelter</option>
                      <option value="Financial">Financial</option>
                      <option value="Other">Other</option>
                    </select>
                    <label
                      htmlFor="category"
                      className="absolute text-gray-500 -top-6 text-sm"
                    >
                      Category
                    </label>
                  </div>

                  {/* Location */}
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="location"
                      id="location"
                      value={formdata.location}
                      onChange={handlechange}
                      placeholder=" "
                      required
                      className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 
                      border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-yellow-500 peer"
                    />
                    <label
                      htmlFor="location"
                      className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                      peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 
                      peer-focus:-translate-y-6 peer-focus:scale-75"
                    >
                      Location
                    </label>
                  </div>

                  {/* Urgency */}
                  <div className="relative z-0 w-full mb-6 group">
                    <select
                      name="urgency"
                      id="urgency"
                      value={formdata.urgency}
                      onChange={handlechange}
                      required
                      className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 
                      border-gray-300 focus:outline-none focus:ring-0 focus:border-yellow-500"
                    >
                      <option value="">Select Urgency</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                    <label
                      htmlFor="urgency"
                      className="absolute text-gray-500 -top-6 text-sm"
                    >
                      Urgency
                    </label>
                  </div>

                  {/* Submit */}
                  <div className="relative">
                    <button
                      type="submit"
                      className="bg-yellow-200 text-black rounded-md px-4 py-2 w-full"
                    >
                      Submit Request
                    </button>
                  </div>

                  {/* Error / Success Message */}
                  {message && <p className="text-red-500 text-sm">{message}</p>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpRequestForm;
