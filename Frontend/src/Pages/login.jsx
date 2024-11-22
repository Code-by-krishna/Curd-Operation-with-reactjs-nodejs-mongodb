import React, { useState } from "react";
import Input from "../Components/input";
import Button from "../Components/Button";
import { useNavigate } from "react-router-dom";
import loginSchema from "../Schema/login";
import axios from "axios";

const Login = () => {
  const Navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const [data, setData] = useState({
    Email: "",
    Password: "",
  });
  console.log(data);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     
      await loginSchema.validate(data, { abortEarly: false });
      setErrors({});

      const response = await axios.post("http://localhost:3000/auth/login", data);

      setPopupMessage(response.data.msg);
      setPopupType("success");
      setShowPopup(true);

    } catch (error) {
      if (error.name === "ValidationError") {
        const errorMessages = {};
        error.inner.forEach((err) => {
          errorMessages[err.path] = err.message;
        });
        setErrors(errorMessages);
      } else if (error.response) {
        setPopupMessage(error.response.data.msg || "An error occurred.");
        setPopupType("error");
        setShowPopup(true);
      } else {
        setPopupMessage("An unexpected error occurred. Please try again.");
        setPopupType("error");
        setShowPopup(true);
      }
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupMessage("");
    setPopupType("");
    if (popupType === "success") {
      Navigate("/activeUser");
    }
  };

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="w-[25%] h-[60%] bg-blue-200 flex justify-center items-center border border-black rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-semibold mb-3 flex justify-center">Login</h1>
          <Input
            Label="Email"
            Type="email"
            Value={data.Email}
            Id="email"
            Placeholder="Enter your email.."
            onChange={(e) => setData({ ...data, Email: e.target.value })}
          />
          <span className="text-red-600 mb-2">{errors.Email}</span>
          <Input
            Label="Password"
            Type="password"
            Value={data.Password}
            Id="password"
            Placeholder="Enter your password.."
            onChange={(e) => setData({ ...data, Password: e.target.value })}
          />
          <span className="text-red-600 mb-2">{errors.Password}</span>
          <Button Label="Login" Type="submit" />
          <div className="my-3">
            Don't have an account?{" "}
            <span
              className="text-blue-800 underline cursor-pointer"
              onClick={() => Navigate("/signup")}
            >
              Signup
            </span>
          </div>
        </form>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className={`p-6 rounded-lg shadow-md w-[30%] bg-white ${
              popupType === "success" ? "border-green-500" : "border-red-500"
            } border-l-4`}
          >
            <h3
              className={`text-lg font-semibold ${
                popupType === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {popupType === "success" ? "Success" : "Error"}
            </h3>
            <p className="mt-2">{popupMessage}</p>
            <button
              className="mt-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
