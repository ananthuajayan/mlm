import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Otp = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const referral_id = location.state?.referral_id || {};
  console.log(referral_id);

  const notify = (message) => {
    toast(message);
  };

  const [formData, setFormData] = useState("");

  const verifyMobile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://lunarsenterprises.com:3004/mlm/verify/question",
        {
          mobile: formData,
          referral_id: referral_id
        }
      );
      console.log(response);
      if(response.data.result === true){
        navigate("/new_password",{ state: { referral_id: referral_id } });
      }
      else{
        notify("invalid mobile number")
            }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid forget">
      <form className="form" onSubmit={verifyMobile}>
        <Form.Label htmlFor="otp">Enter your mobile number</Form.Label>
        <Form.Control
          type="number"
          id="otp"
          placeholder="Enter your mobile number"
          value={formData}
          onChange={(e) => setFormData(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default Otp;
