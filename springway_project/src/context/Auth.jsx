import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const userContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const deviceId = uuidv4();
  const [formData, setFormData] = useState({
    device_id: deviceId,
    device_os: "1",
    device_token: "1",
    referral_id: "",
    password: "",
    app_version: "1",
  });
  const [user, setUser] = useState()


  const notify = (message) => {
    toast(message);
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://lunarsenterprises.com:3004/mlm/user/login",
        formData
      );
      setUser(response);
      console.log(response)
      console.log(user);

      if (response.data.result === true) {
      
        navigate("/home", { state: { data: response.data } });
      } else {
        notify(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <userContext.Provider value={{ formData, setFormData, loginSubmit, ToastContainer,user }}>
      {children}
    </userContext.Provider>
  );
};

export default AuthProvider;
