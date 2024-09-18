import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Forgot.scss';
import Form from "react-bootstrap/Form";
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Forgot = () => {
     const navigate = useNavigate();
     const [referalId,setReferalId] = useState()
     console.log(referalId);
     

    const notify = async (e) => {
        e.preventDefault()

        try {
           const response = await axios.post(
            "https://lunarsenterprises.com:3004/mlm/verify/referral_id",
            {
              referral_id: referalId
            }
           )
           console.log(response);
           console.log(referalId);
           if(response.data.result === true){
            navigate("/otp", { state: { referral_id: referalId } });
          }
           else{
            alert("Invalid Referral Id")
           }
           
        } catch (error) {
          console.log(error)
        }
       
    }

  return (
    <div className="container-fluid forget">
        <form className='form' onSubmit={notify}>
        <h2>Forgot Password</h2>
        <Form.Label htmlFor="email">Enter your registered id</Form.Label>
        <Form.Control type="text" id='email' value={referalId} onChange={(e)=>setReferalId(e.target.value)} />
        <button >Submit</button>
        </form>
    </div>
  );
}

export default Forgot;
