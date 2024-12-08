import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [registerDetails, setRegisterDetails] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // React Router hook for navigation

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleRegisterChange = (e) => {
    const { id, value } = e.target;
    setRegisterDetails((prev) => ({ ...prev, [id]: value }));
  };

  const handleLoginChange = (e) => {
    const { id, value } = e.target;
    setLoginDetails((prev) => ({ ...prev, [id]: value }));
  };

  const createAdmin = async (email, username, password) => {
    try {
      const response = await axios.post(`https://new-real-estate-server.vercel.app/api/admin/register`, {
        email,
        username,
        password,
      });
      console.log("Admin created successfully:", response.data);
      return response.data;
    } catch (err) {
      console.error("Error during admin creation:", err.response?.data || err.message);
      throw err;
    }

  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password, confirmPassword } = registerDetails;

    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    try {
      await createAdmin(email, username, password);
      alert("Registration successful!");
      // Reset form
      setRegisterDetails({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      alert("Failed to register. Please try again.");
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
  
    const { email, password } = loginDetails;
  
    try {
      const response = await axios.post(`https://new-real-estate-server.vercel.app/api/admin/login`, {
        email,
        password,
      });
  
      console.log("Login successful:", response.data);
  
      
      localStorage.setItem("adminEmail", email);


      localStorage.removeItem("user")
      localStorage.removeItem("email")
       navigate("/admin");

    } catch (err) {
      console.error("Error during login:", err.response?.data || err.message);
      alert("Failed to login. Please check your credentials.");
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="relative w-96 h-[500px]">
        {/* Flip Card */}
        <div
          className={`absolute inset-0 transform transition-transform duration-500 ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          {/* Front Side - Register */}
          <div
            className={`absolute inset-0 bg-white p-8 shadow-lg rounded-xl ${
              isFlipped ? "hidden" : "block"
            }`}
          >
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
              Register
            </h2>
            <form onSubmit={handleRegisterSubmit}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={registerDetails.username}
                  onChange={handleRegisterChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={registerDetails.email}
                  onChange={handleRegisterChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={registerDetails.password}
                  onChange={handleRegisterChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={registerDetails.confirmPassword}
                  onChange={handleRegisterChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Confirm your password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Register
              </button>
            </form>
            <p className="text-sm text-center text-gray-600 mt-4">
              Already have an account?{" "}
              <button
                type="button"
                className="text-blue-500 hover:underline"
                onClick={handleFlip}
              >
                Login here
              </button>
            </p>
          </div>

          {/* Back Side - Login */}
          <div
            className={`absolute inset-0 bg-white p-8 shadow-lg rounded-xl ${
              isFlipped ? "block" : "hidden"
            }`}
          >
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
              Login
            </h2>
            <form onSubmit={handleLoginSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={loginDetails.email}
                  onChange={handleLoginChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={loginDetails.password}
                  onChange={handleLoginChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Login
              </button>
            </form>
            <p className="text-sm text-center text-gray-600 mt-4">
              New user?{" "}
              <button
                type="button"
                className="text-blue-500 hover:underline"
                onClick={handleFlip}
              >
                Register here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
