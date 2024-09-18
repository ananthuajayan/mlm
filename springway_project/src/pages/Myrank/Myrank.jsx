import { useState, useEffect } from "react";
import "./Myrank.scss";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Myrank = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [rank, setRank] = useState([]);
  const [currentRank, setCurrentRank] = useState("");
  const data = location.state?.data || {};
  console.log(data.user_rank);

  const fetchRank = async () => {
    try {
      const response = await axios.get(
        "https://lunarsenterprises.com:3004/mlm/myrank",
        {
          headers: {
            user_id: data.user_id,
            api_key: data.user_api_key,
          },
        }
      );
      console.log("hello");
      if (Array.isArray(response.data.ranklist)) {
        setRank(response.data.ranklist);
      } else {
        setRank([]); 
      }
      setCurrentRank(response.data.myrank);
      console.log(response.data.ranklist);
    } catch (error) {
      console.log(error);
      setRank([]); 
    }
  };

  const toMyTeam = () => {
    navigate("/my_team", { state: { data: data } });
  };

  useEffect(() => {
    fetchRank();
  }, []);

  return (
    <div className="container-fluid home" id="home">
      <div className="home-details">
        <h4>My Rank: {currentRank}</h4>

        <div className="profile-links">
          {Array.isArray(rank) && rank.length > 0 ? (
            rank.map((rankItem, index) => (
              <div
                key={index}
                className={`${rankItem.rank === data.user_rank ? "post" : "social"}`}
              >
                {rankItem.rank}
              </div>
            ))
          ) : (
            <p>No rank data available</p>
          )}
          <button onClick={toMyTeam}>My Team Rank</button>

          <div className="ranks">
            <h6 style={{ color: "white" }}>Rank</h6>
            <h6>Direct 3 Referral Posting Trainer</h6>
            <h6>3 Trainers Posting Asst. Manager</h6>
            <h6>3 Asst. Managers Posting Manager</h6>
            <h6>3 Managers Posting Zonal Manager (ZM)</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Myrank;
