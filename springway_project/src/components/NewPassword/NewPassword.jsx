import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from 'axios';

const NewPassword = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    // Get referral_id from the previous page
    const referral_id = location.state?.referral_id || '';
    console.log(referral_id);
    

    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };

    const passwordReset = async (e) => {
      e.preventDefault();
      
      // You can add a check to ensure password and confirmPassword match
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      try {
        // Post the password reset request
        const response = await axios.post('https://lunarsenterprises.com:3004/mlm/user/changepassword', {
          referral_id:referral_id,
          password:password,
        });
        console.log(response);
        // If the response is successful, navigate to the home page or another page
        if (response.data.result === true) {
          navigate("/");
        } else {
          // Handle the error response if needed
          console.log(response.data.message);
        }
      } catch (error) {
        console.error('Error resetting password:', error);
      }
    };

    return (
      <div className="container-fluid forget">
          <form onSubmit={passwordReset} className='form'>
            <Form.Label htmlFor="newPassword">New Password</Form.Label>
            <Form.Control
              type={passwordVisible ? "text" : "password"}
              id="newPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Label htmlFor="confirmPassword">Confirm Password</Form.Label>
            <div className="password" style={{position:"relative"}}>
              <Form.Control
                type={passwordVisible ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div onClick={togglePasswordVisibility}>
                {passwordVisible ? (
                  <FaEyeSlash className="closedeye" style={{position:"absolute",right:"10px",bottom:"10px"}} />
                ) : (
                  <FaEye className="openeye" style={{position:"absolute",right:"10px",bottom:"10px"}} />
                )}
              </div>
            </div>
            
            <button type="submit">Enter</button>
          </form>
      </div>
    );
}

export default NewPassword;
