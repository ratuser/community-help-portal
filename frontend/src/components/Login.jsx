import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


export default function Login() {
  const navigate = useNavigate();

  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });
  const [message, setmessage] = useState("");

  const handlechange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const { email, password } = formdata;
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // Save token and user info
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      setmessage(err.response?.data?.msg || "Error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-black py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-semibold">Login</h1>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <form onSubmit={handlesubmit}>
                  {/* Email */}
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      autoComplete="off"
                      type="text"
                      name="email"
                      id="email"
                      value={formdata.email}
                      onChange={handlechange}
                      placeholder=" "
                      required
                      className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-yellow-500 peer"
                    />
                    <label
                  htmlFor="email"
                  className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75"
                    >
                  Email Address
                </label>
                  </div>

                  {/* Password */}
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      autoComplete="off"
                      type="password"
                      name="password"
                      id="password"
                      value={formdata.password}
                      onChange={handlechange}
                      placeholder=" "
                      required
                      className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-yellow-500 peer"
                    />
                    <label
                    htmlFor="password"
                    className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75"
                  >
                    Password
                  </label>
                  </div>

                  {/* Submit */}
                  <div className="relative">
                    <button
                      type="submit"
                      className="bg-yellow-200 text-black rounded-md px-4 py-2 w-full"
                    >
                      Login
                    </button>
                  </div>

                  {/* Error / Success Message */}
                  {message && <p className="text-red-500 text-sm">{message}</p>}
                </form>

                {/* Register link */}
                <div className="relative text-center">
                  <p className="text-sm text-gray-600">
                    First time user?{" "}
                    <Link
                      to="/register"
                      className="text-yellow-500 font-semibold hover:underline"
                    >
                      Register here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
