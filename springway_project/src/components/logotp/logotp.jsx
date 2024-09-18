import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import {useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Otp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const input = location.state?.input || "";
    console.log(input.email);

    const [verification, setVerification] = useState({
        "email": input.email,
        "code": ""
    });
    console.log(verification);

    const onHandleChange = (e) => {
        const { id, value } = e.target;
        console.log(value);
        setVerification((prevFormData) => ({
            ...prevFormData,
            [id]: value,
        }));
    };

    const notify = (message) => {
        toast(message);
      };

    const otpVerification = async (e) => {
        e.preventDefault(); 
        try {
            const response = await axios.post(
                "https://lunarsenterprises.com:3004/mlm/user-verification",
                verification
            );
            console.log(response);
            if (response.data.result === true) {
                navigate("/post_login",{state:{input:input}});
            }
            else{
                notify(response.data.message)
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container-fluid register">
            <form action="" className='form' onSubmit={otpVerification}>
                <Form.Label htmlFor="otp">Enter Your OTP</Form.Label>
                <Form.Control type="text" id='code' onChange={onHandleChange} name='code' />
                <button type="submit">Enter</button>
            </form>
            <ToastContainer/>
        </div>
    );
}

export default Otp;
