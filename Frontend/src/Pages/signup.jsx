import React, { useState } from "react";
import Input from "../Components/input";
import Button from "../Components/Button";
import { useNavigate } from "react-router-dom";
import signupSchema from "../Schema/signup";
import axios from "axios";

const Signup = () => {
  const Navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState(""); // "success" or "error"
  const [showPopup, setShowPopup] = useState(false);

  const [data, setData] = useState({
    Fullname: "",
    Email: "",
    Password: "",
    Pnumber: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signupSchema.validate(data, { abortEarly: false });

      setErrors({});
      const response = await axios.post("http://localhost:3000/auth/signup", data);

      setPopupMessage(response.data.msg);
      setPopupType("success");
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
        Navigate("/login");
      }, 2000);
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
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center items-center h-[100vh]">
        <div className="w-[25%] min-h-[80%] bg-blue-200 flex justify-center items-center border border-black rounded-lg shadow-lg">
          <div>
            <h1 className="text-2xl font-semibold my-3 flex justify-center">Sign up</h1>
            <Input
              Label="Fullname"
              Name="Fullname"
              Value={data.Fullname}
              Type="text"
              Id="name"
              Placeholder="Enter your name.."
              onChange={(e) => setData({ ...data, Fullname: e.target.value })}
            />
            <span className="text-red-600 mb-2">{errors.Fullname}</span>
            <Input
              Label="Email"
              Name="Email"
              Value={data.Email}
              Type="email"
              Id="email"
              Placeholder="Enter your email.."
              onChange={(e) => setData({ ...data, Email: e.target.value })}
            />
            <span className="text-red-600 mb-2">{errors.Email}</span>
            <Input
              Label="Password"
              Name="Password"
              Value={data.Password}
              Type="password"
              Id="password"
              Placeholder="Enter your password.."
              onChange={(e) => setData({ ...data, Password: e.target.value })}
            />
            <span className="text-red-600 mb-2">{errors.Password}</span>
            <Input
              Label="Contact number"
              Name="Pnumber"
              Value={data.Pnumber}
              Type="tel"
              Id="tel"
              Placeholder="Enter your phone number.."
              onChange={(e) => setData({ ...data, Pnumber: e.target.value })}
            />
            <span className="text-red-600 mb-2">{errors.Pnumber}</span>
            <Button Label="Signup" Type="submit" />
            <div className="my-3">
              Already have an account?{" "}
              <span
                className="text-blue-800 underline cursor-pointer"
                onClick={() => Navigate("/login")}
              >
                Login
              </span>
            </div>
          </div>
        </div>
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
    </form>
  );
};

export default Signup;
