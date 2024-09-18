import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import "./Header.scss";
import { IoMdClose } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { userContext } from "../../context/Auth";
import axios from "axios";
import { CgProfile } from "react-icons/cg";

const Header = () => {
  const { user } = useContext(userContext);
  const location = useLocation();
  const navigate = useNavigate();
  const isRegisterPage =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/forgot" ||
    location.pathname === "/register" ||
    location.pathname === "/otp";
  const [isChecked, setIsChecked] = useState(false);
  const [referralId, setReferralId] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [userApiKey, setUserApiKey] = useState("");

  useEffect(() => {
    // Retrieve stored values from localStorage
    const storedReferralId = localStorage.getItem("referral_id");
    const storedUserName = localStorage.getItem("user_name");
    const storedUserId = localStorage.getItem("user_id");
    const storedUserApiKey = localStorage.getItem("user_api_key");

    if (storedReferralId) setReferralId(storedReferralId);
    if (storedUserName) setUserName(storedUserName);
    if (storedUserId) setUserId(storedUserId);
    if (storedUserApiKey) setUserApiKey(storedUserApiKey);

    // Store values in localStorage when user data changes
    if (user && user.data) {
      const { user_referral_id, user_name, user_id, user_api_key } = user.data;
      localStorage.setItem("referral_id", user_referral_id);
      localStorage.setItem("user_name", user_name);
      localStorage.setItem("user_id", user_id);
      localStorage.setItem("user_api_key", user_api_key);
      setReferralId(user_referral_id);
      setUserName(user_name);
      setUserId(user_id);
      setUserApiKey(user_api_key);
    }
  }, [user]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleMenuClose = () => {
    setIsChecked(false);
  };

  const logOut = async () => {
    try {
      const response = await axios.post(
        "https://lunarsenterprises.com:3004/mlm/user/logout",
        {},
        {
          headers: {
            user_id: userId,
            api_key: userApiKey,
          },
        }
      );
      if (response.data.result === true) {
        localStorage.removeItem("referral_id");
        localStorage.removeItem("user_name");
        localStorage.removeItem("user_id");
        localStorage.removeItem("user_api_key");
        setIsChecked(false)
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-fluid header">
      <input
        type="checkbox"
        checked={isChecked}
        id="checkbox"
        onChange={handleCheckboxChange}
        style={{ display: "none" }}
      />

      {!isRegisterPage && (
        <>
          <img
            src="/images/ham.png"
            alt="hamburger icon"
            className="ham"
            id="hams"
            onClick={handleCheckboxChange}
          />
          <div
            className="user-info"
            style={{
             
            }}
          >
            <h5>User Id: {referralId}</h5>
            <h5>User Name: {userName}</h5>
          </div>
        </>
      )}

      <img src="/images/main_logo.png" alt="logo" className="logo" />

      {!isRegisterPage && (
        <NavLink id="logout" onClick={logOut} className="logout">
          <CiLogout size={25} />
          <h5>Logout</h5>
        </NavLink>
      )}

      <ul className={isChecked ? "show" : ""}>
        <IoMdClose className="IoMdClose" size={30} onClick={handleMenuClose} />
        <NavLink to="/home" onClick={handleMenuClose}>
          <li>Home</li>
        </NavLink>
        <NavLink to="/profile" onClick={handleMenuClose}>
          <li>Profile</li>
        </NavLink>
        <NavLink to="/about" onClick={handleMenuClose}>
          <li>About Us</li>
        </NavLink>
        <NavLink to="/privacy" onClick={handleMenuClose}>
          <li>Privacy Policy</li>
        </NavLink>
        <NavLink to="#" >
          <li>Legal Documents</li>
        </NavLink>
        <NavLink to="#" >
          <li>Change Password</li>
        </NavLink>
        <a
          href="https://chat.whatsapp.com/HxI0Iy8PcZyAu8dy85ycmg"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleMenuClose}
          style={{marginBottom:"50px"}}
        >
          <li>Help</li>
        </a>
        <div className="userDetails">
          <CgProfile size={40} />
          <div className="login-details">
            <h5>Referral Id: {referralId}</h5>
            <h5>User Name: {userName}</h5>
            <h5 onClick={logOut} id="log">Log Out</h5>
          </div>
        </div>
      </ul>
    </div>
  );
};

export default Header;
