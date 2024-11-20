import React, { useEffect, useState } from 'react'
import { FaFacebookF } from "react-icons/fa";
import { FaGooglePlusG } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import Aos from "aos";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })

  const handleInputChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })
  }

  const navigate = useNavigate()

  const handleRadioChange = (e) => {
    const userType = e.target.value;
    if (userType === "student") {
      navigate("/studentSignup");
    } else if (userType === "teacher") {
      navigate("/teacherSignup");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:2000/login', {
        email: loginData.email,
        password: loginData.password,
       
      }
      );
      console.log(response.data);
      sessionStorage.setItem('token', response.data.token)
      sessionStorage.setItem('userRole', response.data.userRole)
      navigate("/homePage")
      // alert("Welcome to the site!")
    } catch (err) {
      console.log(err);
      alert("Information is incorrect, try again")
    }
  }

  return (
    <div className="w-full h-[100vh] flex justify-evenly items-center bg-[#ffffff]">
      <form onSubmit={handleSubmit} className="mainbox w-[60%] h-[80vh] rounded-[10px] flex overflow-hidden">
        <div data-aos="fade-right"
          data-aos-offset="500"
          data-aos-easing="ease-in-sine" className="secondbox w-[50%] h-full bg-white ">
          <div className="text2 flex flex-col justify-evenly items-center h-full py-[30px]">
            <h1 className="text-[35px] font-bold mt-[20px]">Log in</h1>
            <div className="icon flex justify-evenly w-[50%]">
              <div className="w-[40px] h-[40px] flex justify-center items-center border border-[#000000a4] rounded-[50%] hover:bg-[#00000036] cursor-pointer transition ease-in-out delay-200">
                <FaFacebookF />
              </div>
              <div className="w-[40px] h-[40px] flex justify-center items-center border border-[#000000a4] rounded-[50%]  hover:bg-[#00000036] cursor-pointer transition ease-in-out delay-200">
                <FaGooglePlusG />
              </div>
              <div className="w-[40px] h-[40px] flex justify-center items-center border border-[#000000a4] rounded-[50%]  hover:bg-[#00000036] cursor-pointer transition ease-in-out delay-200">
                <FaLinkedinIn />
              </div>
            </div>
            <p className="text-[14px] text-[#4d4d4d]">
              or use your email for registration
            </p>
            <input name='email' value={loginData.email}
              className="w-[270px] h-[35px] border bg-[#EEEEEE] ps-[15px] outline-none"
              type="text" onChange={handleInputChange}
              placeholder="Enter Your Email"

            />
            <input name='password' value={loginData.password}
              className="w-[270px] h-[35px] border bg-[#EEEEEE] ps-[15px] outline-none"
              type="text" onChange={handleInputChange}
              placeholder="Enter Your Password"

            />
            <button type='submit'
              className="w-[50%] h-[40px] rounded-[25px] text-white text-[15px] font-semibold bg-blue-900 hover:bg-blue-700 border transition-[1s]"
            >
              Log In
            </button>
            <div>
              <div className='flex'>
                <input type="radio" name="gender" value={loginData.teacher} onChange={handleRadioChange} id="" /><a href="" className='text-blue-900 ms-2'>Signup as a Teacher</a>
              </div>
              <div className='flex'>
                <input type="radio" name="gender" value={loginData.student} onChange={handleRadioChange} id="" /><a href="" className='text-blue-900 ms-2'>Signup as a Student</a>
              </div>
            </div>

          </div>
        </div>
        <div data-aos="fade-left"
          data-aos-anchor="#example-anchor"
          data-aos-offset="500"
          data-aos-easing="ease-in-sine" className="firstbox w-[50%] h-full flex justify-evenly items-center">
          <div className="text w-[80%] h-[220px] text-[white] text-center flex flex-col justify-evenly items-center">
            <h1 className="text-[35px] tracking-[2px] font-bold">
              Hello, Friend!
            </h1>
            <p className="text-[15px] tracking-[0.5px]">
              Enter your personal details and start journey with us
            </p>
            <Link to="/userSignup" className="border text-[13px] font-bold w-[50%] h-[35px] rounded-[15px] flex justify-center items-center">
              <button className="text-center">
                SIGN UP
              </button>
            </Link>
          </div>
        </div>

      </form>
    </div>
  )
}

export default Login
