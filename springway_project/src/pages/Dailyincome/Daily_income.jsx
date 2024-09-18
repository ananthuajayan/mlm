import React from 'react';
import './Daily_income.scss';
import { useLocation } from "react-router-dom";
import moment from "moment";

const Daily_income = () => {
  const location = useLocation();
  const data = location.state?.data || [];
  console.log(data, "hello");

  return (
    <div className="container-fluid myprofile py-5">
      <h4 className="text-white">My Income</h4>
      <div className="table-responsive mt-4">
        <table className="table table-light table-hover shadow">
          <thead>
            <tr>
              <th scope="col">Sl no</th>
              <th scope="col">Income Received</th>
              <th scope="col">Date</th>
              <th scope="col">Income Type</th>
            </tr>
          </thead>
          <tbody>
            {
              data.length > 0 ? (
                data.map((details, index) => (
                  <tr key={index + 1}>
                    <th scope="row">{index + 1}</th>
                    <td>{details.i_income}</td>
                    <td>{moment(details.i_date).format("DD MMM YYYY")}</td>
                    <td>{details.i_role}</td>
                  </tr>
                ))
              ):(
                
                <tr>
                  <td>
                    No data available
                  </td>
                </tr>
              )
             
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Daily_income;
