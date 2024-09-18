import React, { useState } from 'react';
import "./Myprofile.scss";
import Form from "react-bootstrap/Form";
import { useLocation } from "react-router-dom";
import axios from "axios";
import moment from 'moment';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

const Myprofile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state?.data || {};
  const status = location.state?.status || {};
  console.log(status,data)
  
  const newDate = status.data ? moment(status.data.dob).format('YYYY-MM-DD') : "";
  
  const initialFormData = {
    first_name: data.user_name,
    dob: newDate || "",
    address: "",
    state: "",
    district: "",
    pincode: "",
    contact_number: data.user_mobile,
    alternative_number: "",
    bank_name: "",
    account_name: "",
    account_number: "",
    ifsc_code: "",
    branch_name: "",
    image: ""
  };

  if (status.result === false) {
    Object.assign(initialFormData, status.data);
    initialFormData.image = `https://lunarsenterprises.com:3004/${status.data.image}`;
  }

  const [formData, setFormData] = useState(initialFormData);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(status.result === false ? initialFormData.image : null);

  const notify = (message) => {
    toast(message);
  };

  const onHandleChange = (e) => {
    const { id, value } = e.target;
    console.log(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      if (image) {
        formDataToSend.append('image', image);
      }

      const response = await axios.post(
        "https://lunarsenterprises.com:3004/mlm/myprofile",
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            user_id: data.user_id,
            api_key: data.user_api_key
          }
        }
      );

      if (response.data.result === true) {
        notify(response.data.message);
        navigate("/home")
      }
    } catch (error) {
      console.log(error);
    }
  };

  const imageFixer = imagePreview || "https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg";

  return (
    <div className="container-fluid pro">
      <form onSubmit={handleSubmit}>
        <h4>My Profile</h4>

        <div className='pro-image'>
          <Form.Control
            className='control'
            type="file"
            name="image"
            onChange={handleImage}
          />
          <div className='image-holder'>
            <img src={imageFixer} alt="Preview" style={{ maxWidth: "200px", maxHeight: "200px" }} />
          </div>
        </div>

        <Form.Label htmlFor="first_name">User Name</Form.Label>
        <Form.Control
          type="text"
          id="first_name"
          value={formData.first_name}
          onChange={onHandleChange}
        />

        <Form.Label htmlFor="dob">Date of birth</Form.Label>
        <Form.Control
          type="date"
          id="dob"
          value={formData.dob}
          onChange={onHandleChange}
        />

        <Form.Label htmlFor="address">Address</Form.Label>
        <Form.Control
          type="text"
          id="address"
          value={formData.address}
          onChange={onHandleChange}
        />

        <Form.Label htmlFor="state">State</Form.Label>
        <Form.Control
          type="text"
          id="state"
          value={formData.state}
          onChange={onHandleChange}
        />

        <Form.Label htmlFor="district">District</Form.Label>
        <Form.Control
          type="text"
          id="district"
          value={formData.district}
          onChange={onHandleChange}
        />

        <Form.Label htmlFor="pincode">Pincode</Form.Label>
        <Form.Control
          type="text"
          id="pincode"
          value={formData.pincode}
          onChange={onHandleChange}
        />

        <Form.Label htmlFor="contact_number">Contact number</Form.Label>
        <Form.Control
          type="text"
          id="contact_number"
          value={formData.contact_number}
          onChange={onHandleChange}
        />

        <Form.Label htmlFor="alternative_number">Alternative number</Form.Label>
        <Form.Control
          type="text"
          id="alternative_number"
          value={formData.alternative_number}
          onChange={onHandleChange}
        />

        <h4 style={{ marginTop: "20px" }}>Add Account</h4>

        <Form.Label htmlFor="bank_name">Bank Name</Form.Label>
        <Form.Control
          type="text"
          id="bank_name"
          value={formData.bank_name}
          onChange={onHandleChange}
        />

        <Form.Label htmlFor="account_name">Accountant Name</Form.Label>
        <Form.Control
          type="text"
          id="account_name"
          value={formData.account_name}
          onChange={onHandleChange}
        />

        <Form.Label htmlFor="account_number">Account number</Form.Label>
        <Form.Control
          type="text"
          id="account_number"
          value={formData.account_number}
          onChange={onHandleChange}
        />

        <Form.Label htmlFor="ifsc_code">IFSC Code</Form.Label>
        <Form.Control
          type="text"
          id="ifsc_code"
          value={formData.ifsc_code}
          onChange={onHandleChange}
        />

        <Form.Label htmlFor="branch_name">Branch Name</Form.Label>
        <Form.Control
          type="text"
          id="branch_name"
          value={formData.branch_name}
          onChange={onHandleChange}
        />

        <button type="submit" disabled={status.result === false}>Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Myprofile;
