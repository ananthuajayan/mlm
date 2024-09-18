import React, { useState, useContext, useEffect } from "react";
import "./Home.scss";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { CiCircleRemove } from "react-icons/ci";
import { userContext } from "../../context/Auth";

const Home = () => {
  const { user } = useContext(userContext);
  const [showMessage, setShowMessage] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Load data from location.state or fallback to localStorage
  const [data, setData] = useState(
    location.state?.data || JSON.parse(localStorage.getItem("data")) || {}
  );
  const [userStatus, setUserStatus] = useState(localStorage.getItem("userStatus") || "Inactive");

  useEffect(() => {
    if (location.state?.data) {
      localStorage.setItem("data", JSON.stringify(location.state.data));
      setData(location.state.data);
    }
  }, [location.state]);

  useEffect(() => {
    if (user?.data?.user_status) {
      localStorage.setItem("userStatus", user.data.user_status);
      setUserStatus(user.data.user_status);
    }
  }, [user]);

  const getReferralId = () => {
    setShowMessage(true);
  };

  const checkStatus = async () => {
    try {
      const response = await axios.get(
        "https://lunarsenterprises.com:3004/mlm/check/status",
        {
          headers: {
            user_id: data.user_id,
            api_key: data.user_api_key,
          },
        }
      );
      navigate("/my_profile", {
        state: { data: data, status: response.data },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const moveToMyTeam = () => {
    navigate("/my_team", { state: { data: data } });
  };

  const moveToIncome = () => {
    navigate("/my_income", {
      state: { data: data, API: data.user_referral_id },
    });
  };

  const moveToRank = () => {
    // Ensuring that userRank is safely passed and data is stored locally
    navigate("/my_rank", { state: { data: data, userRank: user?.data?.user_rank || '' } });
  };

  return (
    <div className="container-fluid home">
      <div className="home-details">
        <div className="active">
          <h4 className="zero-class">
            {userStatus === "active" ? "Active" : "Inactive"}
          </h4>
        </div>
        <div className="social-medias">
          <a href="https://chat.whatsapp.com/HxI0Iy8PcZyAu8dy85ycmg">
            <div className="social">
              <FaWhatsapp size={30} />
              <button>
                <span>Join</span> Whatsapp
              </button>
            </div>
          </a>
          <a href="https://t.me/+-P55tiEb6p8yYWVl">
            <div className="social">
              <FaTelegramPlane size={30} />
              <button>
                <span>Join</span> Telegram
              </button>
            </div>
          </a>
        </div>
        <div className="profile-links">
          <div className="social" onClick={getReferralId}>
            Referral Link
          </div>
          <div className="social" onClick={checkStatus}>
            My Profile
          </div>
          <div className="social" onClick={moveToMyTeam}>
            My Team
          </div>
          <div className="social" onClick={moveToIncome}>
            My Income
          </div>
          <div className="social" onClick={moveToRank}>
            My Rank
          </div>
          <NavLink to="#!" style={{PointerEvent:"none",opacity:"0.5", cursor: "not-allowed"}}>
            <div className="social">My Product</div>
          </NavLink>
          <NavLink to="#!" style={{PointerEvent:"none",opacity:"0.5", cursor: "not-allowed"}}>
            <div className="social">Today Achievers</div>
          </NavLink>
          <NavLink to="#!" style={{PointerEvent:"none",opacity:"0.5", cursor: "not-allowed"}}>
            <div className="social">My Project</div>
          </NavLink>
        </div>
      </div>

      {showMessage && (
        <div className="success-message">
          <CiCircleRemove
            size={30}
            color="black"
            className="close-icon"
            onClick={() => setShowMessage(false)}
            style={{ position: "absolute", right: "20px", top: "5px" }}
          />
          <h6>
            https://www.springwayhub.com/register/?referral_id=
            {data.user_referral_id}
          </h6>
        </div>
      )}
    </div>
  );
};

export default Home;
