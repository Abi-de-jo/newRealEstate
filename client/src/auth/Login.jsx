import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
  
const Login = () => {
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

 
    try{
        const res = await axios.post("http://localhost:3000/api/agent/login",{
            email,password
        })

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
            <Link to="/register" className="text-blue-500 hover:underline text-sm block text-center">
              Don't you have an account?
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
