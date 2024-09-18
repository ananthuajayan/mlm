import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Register from "./pages/Register/Register";
import Dailyincome from "./pages/Dailyincome/Daily_income";
import Login from "./pages/Login/Login";
import Myincome from "./pages/Myincome/Myincome";
import Myprofile from "./pages/Myprofile/Myprofile";
import Myrank from "./pages/Myrank/Myrank";
import Myteam from "./pages/Myteam/Myteam"; 
import Home from "./pages/Home/Home";
import Postlogin from "./pages/PostLogin/Postlogin";
import Forgot from "./pages/ForgotPassword/forgot";
import Otp from "./components/OTP/Otp";
import Newpassword from "./components/NewPassword/NewPassword";
import Logotp from "./components/logotp/logotp";
import About from "./pages/About/About";
import Privacy from "./pages/privacy/Privacy";
import Profile from "./pages/Profile/Profile";
import Auth from './context/Auth';
import Products from './pages/Myproducts/Myproducts';
import Achivers from './pages/Achivers/Achivers';

function App() {
  return (
    < >
   
    <userContext></userContext>
    <BrowserRouter>
    <Auth>
     <Header/>
     <Routes>
       <Route path='/' element={<Login/>}/>
       <Route path='/register' element={<Register/>}/>
       <Route path='/income' element={<Dailyincome/>}/>
       <Route path='/my_income' element={<Myincome/>}/>
       <Route path='/my_profile' element={<Myprofile/>}/>
       <Route path='/my_rank' element={<Myrank/>}/>
       <Route path='/my_team' element={<Myteam/>}/>
       <Route path='/home' element={<Home/>}/>
       <Route path='/post_login' element={<Postlogin/>}/>
       <Route path='/forgot' element={<Forgot/>}/>
       <Route path='/otp' element={<Otp/>}/>
       <Route path='/logotp' element={<Logotp/>}/>
       <Route path='/new_password' element={<Newpassword/>}/>
       <Route path='/about' element={<About/>}/>
       <Route path='/privacy' element={<Privacy/>}/>
       <Route path='/profile' element={<Profile/>}/>
       <Route path='/my-products' element={<Products/>}/>
       <Route path='/achivers' element={<Achivers/>}/>
     </Routes>
     </Auth>

     </BrowserRouter>
    </>
  );
}

export default App;
