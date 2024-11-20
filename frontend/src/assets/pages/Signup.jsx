import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from "react-icons/fa";
import axios from 'axios';

const Signup = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        role: '', // Add role to the state
    });

    const handleInputChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!data.role) {
            alert("Please select a role");
            return;
        }
        try {
            const response = await axios.post('http://localhost:2000/userSignup', data);
            sessionStorage.setItem('userRole', data.role); // Store the role in session storage
            navigate("/homePage");
            alert("Welcome to the site!");
        } catch (err) {
            console.log(err);
            alert("Something went wrong");
        }
    };

    return (
        <div>
            <div className="w-full h-[100vh] flex justify-evenly items-center bg-[#ffffff]">
                <div className="mainbox w-[60%] h-[80vh] rounded-[10px] flex overflow-hidden">
                    <div className="firstbox w-[50%] h-full flex justify-evenly items-center">
                        <div className="text w-[80%] h-[220px] text-center flex flex-col justify-evenly items-center text-white">
                            <h1 className="text-[35px] tracking-[2px] font-bold">
                                Welcome Back!
                            </h1>
                            <p className="text-[15px] tracking-[0.5px]">
                                To keep connected with us, please login with your personal info
                            </p>
                            <Link to="/" className="border text-[13px] font-bold w-[50%] h-[35px] rounded-[15px] flex justify-center items-center">
                                <button>LOG IN</button>
                            </Link>
                        </div>
                    </div>
                    <div className="secondbox w-[50%] h-full bg-white">
                        <form onSubmit={handleSubmit} className="text2 flex flex-col justify-evenly items-center h-full py-[30px]">
                            <h1 className="text-[35px] font-bold mt-[20px]">Create Account</h1>
                            <div className="icon flex justify-evenly w-[50%]">
                                <div className="w-[40px] h-[40px] flex justify-center items-center border rounded-[50%] hover:bg-[#00000036] cursor-pointer transition ease-in-out delay-200">
                                    <FaFacebookF />
                                </div>
                                <div className="w-[40px] h-[40px] flex justify-center items-center border rounded-[50%] hover:bg-[#00000036] cursor-pointer transition ease-in-out delay-200">
                                    <FaGooglePlusG />
                                </div>
                                <div className="w-[40px] h-[40px] flex justify-center items-center border rounded-[50%] hover:bg-[#00000036] cursor-pointer transition ease-in-out delay-200">
                                    <FaLinkedinIn />
                                </div>
                            </div>
                            <p className="text-[14px] text-[#4d4d4d]">
                                or use your email for registration
                            </p>
                            <input
                                type="text" name="name" value={data.name}
                                className="w-[270px] h-[35px] border bg-[#EEEEEE] ps-[15px] outline-none"
                                placeholder="Name"
                                onChange={handleInputChange}
                            />
                            <input
                                type="email" name="email" value={data.email}
                                className="w-[270px] h-[35px] border bg-[#EEEEEE] ps-[15px] outline-none"
                                placeholder="Email"
                                onChange={handleInputChange}
                            />
                            <input
                                type="password" name="password" value={data.password}
                                className="w-[270px] h-[35px] border bg-[#EEEEEE] ps-[15px] outline-none"
                                placeholder="Password"
                                onChange={handleInputChange}
                            />
                            <select
                                name="role" value={data.role}
                                className="w-[270px] h-[35px] border bg-[#EEEEEE] ps-[15px] outline-none"
                                onChange={handleInputChange}
                            >
                                <option value="">Select Role</option>
                                <option value="teacher">Teacher</option>
                                <option value="student">Student</option>
                            </select>
                            <button type="submit"
                                className="w-[50%] h-[40px] rounded-[25px] text-white text-[15px] font-semibold bg-blue-900 hover:bg-blue-700 border transition-[1s]"
                            >
                                Sign Up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
