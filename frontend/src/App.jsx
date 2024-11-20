import React, { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import HomePage from './assets/pages/HomePage'
import Login from './assets/pages/Login'
import Signup from './assets/pages/Signup'
import AOS from 'aos';
import 'aos/dist/aos.css';
import CourseData from './assets/pages/CourseData'
import Header from './assets/components/Header'
import EditCoursePage from './assets/pages/EditCoursePage'

const App = () => {
  const [token, setToken] = useState('')
  const [userRole, setuserRole] = useState('')

  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    AOS.init({
      duration: 500, // Animation duration in milliseconds
      easing: 'ease-in-out', // Animation easing function
      once: true, // Whether animation should happen only once
    });
  const tokenGet = sessionStorage.getItem('token')
  const userRole = sessionStorage.getItem('userRole')
    setToken(tokenGet)
    setuserRole(userRole)
    setLoading(false)
  }, []);
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/userSignup' element={<Signup />} />
          {
            token &&
            <>
              <Route path='/homePage' element={<HomePage />} />
              <Route path='/addCourse' element={<CourseData />} />
              <Route path="/editCourse/:id" element={<EditCoursePage />} />
              <Route path='*' element={<Navigate to='/homePage'/>} />
            </>
          }
        </Routes>
      </div>
    </Router>
  )
}

export default App
