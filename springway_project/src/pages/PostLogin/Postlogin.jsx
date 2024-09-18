import React from 'react';
import './Postlogin.scss';
import { NavLink,useLocation } from "react-router-dom";
import moment from 'moment';

const Postlogin = () => {
  const location = useLocation();
  const input = location.state?.input || "";
  const referral = location.state?.referral || "";
  console.log(input,moment().format("DD-MMM-YYYY hh:mm A"))
  console.log(referral);

  return (
    <div className='container-fluid register' id='register'>
      <div className="log-details">
        <div className="logo">
          <img src="./images/main_logo.png" alt="logo" />
          <h4>Welcome</h4>
           <h4>you are now part of springway family</h4>
        </div>
        <h4><span>Congratulations! Your Account Has Been Successfully Created</span></h4>

        <div className="register-details">
        <div className="sub-details">
          <h5>Name:</h5>
          <h5>{input.first_name}</h5>
        </div>
        <div className="sub-details">
          <h5>Referal Id:</h5>
          <h5>{referral}</h5>
        </div>
        <div className="sub-details">
          <h5>Password:</h5>
          <h5>{input.password}</h5>
        </div>
       
        <div className="sub-details">
          <h5>Date of Joining:</h5>
          <h5>{moment().format("DD-MMM-YYYY hh:mm A")}</h5>
        </div>
        <div className="sub-details">
          <h5>Email Id:</h5>
          <h5>{input.email}</h5>
        </div>
      </div>
      <NavLink to="/">
      <button>Log in</button>
      </NavLink>
      </div>
    </div>
  );
}

export default Postlogin;
