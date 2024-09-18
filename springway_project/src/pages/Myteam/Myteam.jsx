import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";
import "./Myteam.scss";
import axios from "axios";
import { IoMdArrowRoundBack } from "react-icons/io";

const Myprofile = () => {
  const location = useLocation();
  const [team, setTeam] = useState([]);
  const data = location.state?.data || {};
  const [fetchId, setFetchId] = useState(data.user_id);
  const [arrowVisible, setArrowVisible] = useState(false);
  const [backId, setBackId] = useState([]);
  const [filterMember, setFilterMember] = useState("All");

  const smartBoys = async (id, filter) => {
    console.log(id, filter);
    try {
      const response = await axios.post(
        "https://lunarsenterprises.com:3004/mlm/admin/teamlist",
        {
          u_level: filter,
        },
        {
          headers: {
            user_id: id,
          },
        }
      );
      if (Array.isArray(response.data.data)) {
        setTeam(response.data.data);
        console.log(response.data.data);
      } else {
        setTeam([]);
        console.log("Data format is incorrect");
      }
    } catch (error) {
      console.log(error);
      setTeam([]);
    }
  };

  const upDown = () => {
    console.log("welcome to manus multi speciality hospital");
    setBackId((prevBackId) => {
      const updatedBackId = [...prevBackId];
      const lastId = updatedBackId.pop();
      if (updatedBackId.length === 0) {
        setArrowVisible(false);
      }
      smartBoys(lastId, filterMember);
      return updatedBackId;
    });
  };

  const functionRecall = (member) => {
    console.log(member.u_master_id);
    setFetchId(member.u_id);
    setArrowVisible(true);
    setBackId((prevBackId) => [...prevBackId, member.u_master_id]);
  };

  useEffect(() => {
    smartBoys(fetchId, filterMember);
  }, [fetchId, filterMember]);

  const handleFilter = (e) => {
    const newFilter = e.target.value;
    setFilterMember(newFilter);
    smartBoys(fetchId, newFilter);
    console.log(newFilter);
  };

  return (
    <div className="container-fluid myprofile py-5">
      {arrowVisible && backId.length > 0 && (
        <IoMdArrowRoundBack
          color="white"
          size={30}
          style={{ position: "fixed", left: "30px", top: "100px", cursor: "pointer" }}
          onClick={upDown}
        />
      )}

      <h4 className="text-white">My Team</h4>
      <div className="select mt-3">
        <select className="form-select shadow" name="" id="" onChange={handleFilter} value={filterMember}>
          <option value="All">All</option>
          <option value="1">Level 1</option>
          <option value="2">Level 2</option>
          <option value="3">Level 3</option>
          <option value="4">Level 4</option>
        </select>
      </div>
      <div className="table-responsive mt-4 py-4 px-4">
        <table className="table table-light table-hover shadow">
          <thead>
            <tr>
              <th scope="col" style={{ whiteSpace: "nowrap" }}>
                Sl no
              </th>
              <th scope="col">Name</th>
              <th scope="col">Phone Number</th>
              <th scope="col" style={{ whiteSpace: "nowrap" }}>
                User Id
              </th>
              <th scope="col">Mother Id</th>
              <th scope="col">Status</th>
              <th scope="col">View</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(team) && team.length > 0 ? (
              team.map((member, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{member.u_first_name}</td>
                  <td>{member.u_mobile}</td>
                  <td>{member.u_referal_id}</td>
                  <td>{member.master_referral_id}</td>
                  <td>{member.u_status}</td>
                  <td>
                    <span className="btn btn-primary" onClick={() => functionRecall(member)}>
                      View
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Myprofile;
