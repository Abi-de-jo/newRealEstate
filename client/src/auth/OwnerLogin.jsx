import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
  
const OwnerLogin = () => {
  const [selectedCode, setSelectedCode] = useState('+995'); // Default to Georgia

  const countryCodes = [
    { code: '+1', country: 'United States' },
    { code: '+44', country: 'United Kingdom' },
    { code: '+91', country: 'India' },
    { code: '+49', country: 'Germany' },
    { code: '+33', country: 'France' },
    { code: '+81', country: 'Japan' },
    { code: '+86', country: 'China' },
    { code: '+61', country: 'Australia' },
    { code: '+39', country: 'Italy' },
    { code: '+34', country: 'Spain' },
    { code: '+82', country: 'South Korea' },
    { code: '+55', country: 'Brazil' },
    { code: '+27', country: 'South Africa' },
    { code: '+7', country: 'Russia' },
    { code: '+965', country: 'Kuwait' },
    { code: '+971', country: 'United Arab Emirates' },
    { code: '+995', country: 'Georgia' },
    // Add more countries as needed
  ];


  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    const formData = new FormData(e.target);

     const email = formData.get("email");
    const password = formData.get("password");
    const mobile = formData.get("mobile");
    const Gov = formData.get("Gov");

    console.log( email, password);

    try{
        const res = await axios.post("https://new-real-estate-server.vercel.app/api/owner/login",{
            email,password,mobile,Gov
        })

        console.log(res.data)
        localStorage.setItem("user",JSON.stringify(res.data))
        navigate("/")
 
    }catch(err){
        console.log(err)
    }


 
 
  };

  return (
    <div className="wrapper flex items-center justify-center min-h-screen bg-gray-100">
      <div className="registerPage w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <div className="formContainer">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h1 className="text-2xl font-semibold text-center">Create an Account</h1>
           
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
            <div className="flex items-center space-x-2">
              <select
                value={selectedCode}
                onChange={(e) => setSelectedCode(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              >
                {countryCodes.map(({ code, country }) => (
                  <option key={code} value={code}>
                    {code} - {country}
                  </option>
                ))}
              </select>
              <input
                name="mobile"
                type="tel" // Use 'tel' for better mobile number input handling
                placeholder="ex: 5XX XXX XXX"
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            <input
              name="id"
              type="text"
              placeholder="Georgian Gov Id"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
            <button
              type="submit"
               className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none transition disabled:opacity-50"
            >
               Login
            </button>
            {error && <span className="error text-red-500 text-sm">{error}</span>}
            <Link to="/owner/register" className="text-blue-500 hover:underline text-sm block text-center">
              Don't you have an account?
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OwnerLogin;
