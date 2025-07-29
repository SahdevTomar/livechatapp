import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "..";

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const navigate = useNavigate();

  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/register`, user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }

    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  };

  return (
    <div className="min-w-96 max-w-md mx-auto mt-10">
      <div className="w-full p-8 rounded-xl shadow-2xl bg-base-200">
        <h1 className="text-4xl font-bold text-center mb-6">Create Account</h1>
        <form onSubmit={onSubmitHandler}>
          {/* Full Name */}
          <div className="mb-4">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              className="input input-bordered w-full"
              type="text"
              placeholder="John Doe"
            />
          </div>

          {/* Username */}
          <div className="mb-4">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="input input-bordered w-full"
              type="text"
              placeholder="johndoe123"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="input input-bordered w-full"
              type="password"
              placeholder="********"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              value={user.confirmPassword}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
              className="input input-bordered w-full"
              type="password"
              placeholder="********"
            />
          </div>

          {/* Gender Buttons */}
          <div className="mb-6">
            <label className="label">
              <span className="label-text">Select Gender</span>
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                className={`btn ${
                  user.gender === "male" ? "btn-info" : "btn-outline"
                }`}
                onClick={() => handleCheckbox("male")}
              >
                Male
              </button>
              <button
                type="button"
                className={`btn ${
                  user.gender === "female" ? "btn-info" : "btn-outline"
                }`}
                onClick={() => handleCheckbox("female")}
              >
                Female
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary btn-block shadow-lg hover:scale-105 transition-transform duration-200"
          >
            🚀 Sign Up Now
          </button>

          {/* Already have account */}
          <p className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
