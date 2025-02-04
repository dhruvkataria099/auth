import axios from "axios";
import React, { useContext, useState, } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserCon } from "./UserContext";

const Login = () => {
  const { switchToggle } = useContext(UserCon);
  const nav = useNavigate()
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const handleChange = (e) => {
    try {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const Sub = async () => {
    try {
      const res = await axios.post('http://localhost:8080/login',formData)
      console.log(res.data.success);
      
      if (res.data.success) {
        switchToggle()
        nav('protectedpage');
      }
      
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Login
        </h2>
        <form onSubmit={Sub}>
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">
              Username or Email
            </label>
            <input
              type="text"
              name="usernameOrEmail"
              value={formData.usernameOrEmail}
              onChange={(e) => handleChange(e)}
              className="w-full border-gray-300 border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your username or email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-600 font-medium mb-2">
              Password
            </label>
            <input
              type="text"
              name="password"
              value={formData.password}
              onChange={(e) => handleChange(e)}
              className="w-full border-gray-300 border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="button"
            onClick={Sub}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Not a user?{" "}
          <Link to={"/register"} className="text-blue-500 hover:underline">
            Click Me
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
