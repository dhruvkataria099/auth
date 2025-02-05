import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../info";

const Register = () => {
  const nav = useNavigate()

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [toggle, setToggle] = useState(false);

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
        const res = await axios.post(`${BASE_URL}register`,formData)
        console.log(res.data.message);
        
        if (res.data.status == 200) {
          nav('/')
        }

        toast.error(res.data.message);
        
      console.log(formData);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Register</h2>
        <form onSubmit={Sub}>
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={(e) => handleChange(e)}
              className="w-full border-gray-300 border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => handleChange(e)}
              className="w-full border-gray-300 border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <div>
                <label className="block text-gray-600 font-medium mb-2">Password</label>
                <input
                type={toggle ? "text" : 'password'}
                name="password"
                value={formData.password}
                onChange={(e) => handleChange(e)}
                className="w-full border-gray-300 border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your password"
                />
                <span onClick={() => setToggle(!toggle)} >show</span>
            </div>
          </div>
          <button
            type="button"
            onClick={Sub}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-200"
          >
            Register
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Already a user?{" "}
          <Link to={"/"} className="text-blue-500 hover:underline">
            Click Me
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
