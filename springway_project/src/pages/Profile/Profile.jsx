import React, { useEffect, useState, useContext } from "react";
import "./Profile.scss";
import { userContext } from "../../context/Auth";
import axios from "axios";
import moment from 'moment';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const { user } = useContext(userContext);

  useEffect(() => {
    const profileFetch = async () => {
      if (!user || !user.data) {
        console.error("User data is not available");
        return;
      }

      try {
        const response = await axios.get(
          "https://lunarsenterprises.com:3004/mlm/check/status",
          {
            headers: {
              user_id: user.data.user_id,
              api_key: user.data.user_api_key,
            },
          }
        );
        console.log(response.data.data);
        setProfile(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    profileFetch();
  }, [user]);

  if (!profile) {
    return <div className="no-profile">
      <p style={{color:"white",fontSize:"18px"}}>    
          your profile is not been created yet , kindly create the profile
      </p>
      <a href="/my_profile">
      <button id="button">Create Profile</button>
      </a>
    </div>; // Add a loading state while the profile is being fetched
  }

  const newDate = profile.dob ? moment(profile.dob).format('DD-MM-YYYY') : "";

  return (
    <div className="container-fluid profile-id">
      <h1>ID CARD</h1>
      <div className="id-card">
        <div className="id-border">
          <div className="logo">
            <img src="./images/main_logo.png" alt="logo" id="idLogo" />
            <h5>Springway</h5>
          </div>

          <div className="profile-image">
            <img
              src={`https://lunarsenterprises.com:3004/${profile.image}`}
              alt="Profile"
            />
          </div>
          <div className="profile-details">
            <h6>
              Name: <span>{profile.account_name || ""}</span>
            </h6>
            <h6>
              Referral-ID: <span>{profile.u_referal_id || ""}</span>
            </h6>
            <h6>
              Date of Birth: <span>{newDate || ""}</span>
            </h6>
            <h6>
              Address: <span>{profile.address || ""}</span>
            </h6>
          </div>
        </div>
      </div>
      <button>Download Pdf</button>
    </div>
  );
};

export default Profile;
