import React, { useState, useContext } from 'react';
import "./Login.scss";
import Form from "react-bootstrap/Form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { userContext } from '../../context/Auth'; 


const Login = () => {
  const { formData, setFormData, loginSubmit,ToastContainer } = useContext(userContext);
  const [passwordVisible, setPasswordVisible] = useState(false);  

  const onHandleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="container-fluid logins">
      <form onSubmit={loginSubmit}>
        <h4>Log In</h4>
        <div className="logo">
          <img src="./images/main_logo.png" alt="" />
        </div>

        <div className="log-inputs">
          <div>
            <Form.Label htmlFor="email">User Id</Form.Label>
            <Form.Control
              type="text"
              name="referral_id"
              onChange={onHandleChange}
              id="referral_id"
              value={formData.referral_id}
              placeholder="Enter your referral id"
            />
          </div>

          <div className="password">
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              type={passwordVisible ? "text" : "password"}
              id="password"
              name="password"
              onChange={onHandleChange}
              value={formData.password}
              placeholder="Enter your password"
            />
            <div onClick={togglePasswordVisibility}>
              {passwordVisible ? (
                <FaEyeSlash className="closedeyes" />
              ) : (
                <FaEye className="openeyes" />
              )}
            </div>
            <NavLink to="/forgot">
              <div className="forgot">Forgot password?</div>
            </NavLink>
          </div>
        </div>
        <button type="submit">Log in</button>

        <NavLink to="/register">
          <h6>Register an account</h6>
        </NavLink>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
