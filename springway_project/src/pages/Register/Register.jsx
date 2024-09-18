import { useState, useEffect } from "react";
import "./Register.scss";
import Form from "react-bootstrap/Form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [referralId, setReferralId] = useState('');

  const [input, setInput] = useState({
    first_name: "",
    mobile: "",
    email: "",
    password: "",
    confirm_password: "",
    referral_id: "" ,
  });
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const referralId = params.get('referral_id');
    if (referralId) {
      setReferralId(referralId);
    }
    console.log(referralId)
  }, [location]);

  useEffect(() => {
    setInput((prevInput) => ({
      ...prevInput,
      referral_id: referralId,
    }));
  }, [referralId]);

  const notify = (message) => {
    toast(message);
  };

  const onHandleChange = (e) => {
    const { id, value } = e.target;
    setInput((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     console.log(input);
    if (!input.first_name || !input.mobile || !input.email || !input.password || !input.referral_id || !input.confirm_password) {
      notify("Please enter all fields");
      console.log(input);
    } else if (input.password !== input.confirm_password) {
      notify("Passwords do not match");
    } else {
      try {
        const response = await axios.post(
          "https://lunarsenterprises.com:3004/mlm/user-registration",
          input
        );
        if (response.data.status === true) {
          navigate("/post_login", { state: { input: input, referral: response.data.referral_id } });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="container-fluid register">
      <form onSubmit={handleSubmit}>
        <h4>Create an Account</h4>

        <Form.Label htmlFor="referral_id">Refferal Id</Form.Label>
        <Form.Control
          type="text"
          id="referral_id"
          placeholder="Enter your referral ID number"
          value={input.referral_id}
          onChange={onHandleChange}
          name="referral_id"
          required
        />

        <Form.Label htmlFor="first_name">Name</Form.Label>
        <Form.Control
          type="text"
          id="first_name"
          name="first_name"
          placeholder="Enter your name"
          value={input.first_name}
          onChange={onHandleChange}
          required
        />

        <Form.Label htmlFor="email">Email</Form.Label>
        <Form.Control
          type="text"
          id="email"
          name="email"
          placeholder="Enter your email"
          value={input.email}
          onChange={onHandleChange}
          required
        />

        <Form.Label htmlFor="mobile">Contact Number</Form.Label>
        <Form.Control
          type="phone"
          id="mobile"
          name="mobile"
          placeholder="Enter your mobile"
          value={input.mobile}
          onChange={onHandleChange}
          required
        />

        <Form.Label htmlFor="password">Password</Form.Label>
        <div className="password">
          <Form.Control
            type={passwordVisible ? "text" : "password"}
            id="password"
            name="password"
            value={input.password}
            placeholder="Enter your password"
            onChange={onHandleChange}
            required
          />
          <div onClick={togglePasswordVisibility}>
            {passwordVisible ? (
              <FaEyeSlash className="closedeye" />
            ) : (
              <FaEye className="openeye" />
            )}
          </div>
        </div>

        <Form.Label htmlFor="confirm_password">Confirm Password</Form.Label>
        <Form.Control
          type="password"
          id="confirm_password"
          name="confirm_password"
          placeholder="Reconfirm your password"
          value={input.confirm_password}
          onChange={onHandleChange}
          required
        />

        <button type="submit" className="btn btn-primary">
          Create Account
        </button>

        <h5
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          Already have an account?
          <NavLink to="/">
            <span style={{ color: "white", }}>Log in</span>
          </NavLink>
        </h5>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;
