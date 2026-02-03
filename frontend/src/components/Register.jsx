import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (formdata.password !== formdata.confirmpassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const { name, email, password } = formdata;
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });
      setMessage(res.data.msg);
      setformdata({ name: "", email: "", password: "", confirmpassword: "" });
    } catch (err) {
      setMessage(err.response?.data?.msg || "Error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-black py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-3xl font-semibold">Register</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-6 text-gray-700 sm:text-lg sm:leading-7">
                <form onSubmit={handleSubmit}>
                
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="name"
                      name="name"
                      value={formdata.name}
                      onChange={handleChange}
                      type="text"
                      className="peer placeholder-transparent pt-5 h-12 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                      placeholder="Full Name"
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-0 top-1 text-gray-600 text-sm 
                        peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                        peer-focus:top-1 peer-focus:text-sm peer-focus:text-gray-600 transition-all"
                    >
                      Full Name
                    </label>
                  </div>

                 
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="email"
                      name="email"
                      value={formdata.email}
                      onChange={handleChange}
                      type="text"
                      className="peer placeholder-transparent pt-5 h-12 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                      placeholder="Email Address"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 top-1 text-gray-600 text-sm 
                        peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                        peer-focus:top-1 peer-focus:text-sm peer-focus:text-gray-600 transition-all"
                    >
                      Email Address
                    </label>
                  </div>

                 
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="password"
                      name="password"
                      type="password"
                      value={formdata.password}
                      onChange={handleChange}
                      className="peer placeholder-transparent pt-5 h-12 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                      placeholder="Password"
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 top-1 text-gray-600 text-sm 
                        peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                        peer-focus:top-1 peer-focus:text-sm peer-focus:text-gray-600 transition-all"
                    >
                      Password
                    </label>
                  </div>

                  
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="confirmpassword"
                      name="confirmpassword"
                      type="password"
                      value={formdata.confirmpassword}
                      onChange={handleChange}
                      className="peer placeholder-transparent pt-5 h-12 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                      placeholder="Confirm Password"
                    />
                    <label
                      htmlFor="confirmpassword"
                      className="absolute left-0 top-1 text-gray-600 text-sm 
                        peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                        peer-focus:top-1 peer-focus:text-sm peer-focus:text-gray-600 transition-all"
                    >
                      Confirm Password
                    </label>
                  </div>

                  
                  <div className="relative">
                    <button
                      type="submit"
                      className="bg-yellow-200 text-black rounded-md px-4 py-2 mt-8 w-full"
                    >
                      Register
                    </button>
                  </div>
                </form>

                
                <div className="relative text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-yellow-500 font-semibold hover:underline"
                    >
                      Login here
                    </Link>
                  </p>
                </div>

                
                {message && (
                  <div className="text-center text-red-500 font-semibold">
                    {message}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
