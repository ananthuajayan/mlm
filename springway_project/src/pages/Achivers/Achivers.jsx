import React from 'react';
import "./Achivers.scss";

const Achivers = () => {
  return (
    <div className="container-fluid myprofile py-5">

    <h4 className="text-white">Todays Achivers</h4>

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
              Refferal Id
            </th>
            <th scope="col">Mother Id</th>
            <th scope="col">Level</th>
          </tr>
        </thead>
        <tbody>
            <tr>
                <td>hello</td>
                <td>hello</td>
                <td>hello</td>
                <td>hello</td>
                <td>hello</td>
                <td>hello</td>
            </tr>
        </tbody>
       
      </table>
  </div>
  </div>
  );
}

export default Achivers;
