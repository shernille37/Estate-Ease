import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useLoginMutation } from "../slices/authApiSlice";
import { toast } from "react-toastify";
import { PropagateLoader } from "react-spinners";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (userInfo) navigate("/");
  }, [userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res.data }));
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex justify-center mt-15">
      <div className="bg-white p-6 rounded-lg shadow-2xl w-full md:w-1/2">
        <h3 className="text-3xl font-bold mb-6 text-center">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="body"
            >
              Password:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            {isLoading ? (
              <PropagateLoader color="#3b82f6" size={20} />
            ) : (
              "Login"
            )}
          </button>
        </form>
        <div>
          <p className="text-sm">Don't have an account yet?</p>
          <Link
            to="/register"
            className="text-sm hover:bg-blue-700 hover:text-white p-1.5 rounded-md"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
