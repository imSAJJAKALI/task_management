import React, { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { signup } from "../redux/features/authSlice";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";

const Signup: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
  const dispatch = useDispatch<AppDispatch>()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const validationErrors: { name?: string; email?: string; password?: string } = {};
  
    // Name validation
    if (!name) {
      validationErrors.name = "Name is required";
    } else if (name.length < 3) {
      validationErrors.name = "Name must be at least 3 characters long";
    }
  
    // Email validation
    if (!email) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Please enter a valid email address";
    }
  
    // Password validation
    if (!password) {
      validationErrors.password = "Password is required";
    } else if (password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters";
    }
  
    setErrors(validationErrors);
  
    // If no errors, proceed with form submission logic
    if (Object.keys(validationErrors).length === 0) {
      const data = {
        name,
        email,
        password,
      };
  
      try {
        // Dispatch signup thunk
        await dispatch(signup(data));
        setName("");
        setEmail("");
        setPassword("");

      } catch (error) {
        // Error toast is already handled in the thunk
        console.error("Error during signup:", error);
      }
    }
  };
  

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full my-20 max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Sign-up</h2>
        <form onSubmit={handleSubmit} noValidate>
          {/* Name Input */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {!showPassword ? <LuEyeOff size={22} /> : <LuEye size={22} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
