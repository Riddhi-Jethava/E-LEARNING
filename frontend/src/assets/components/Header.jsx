import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const userRole = sessionStorage.getItem('userRole');
    const [searchTerm, setSearchTerm] = useState('');
    const courses = ['React', 'Node.js', 'JavaScript', 'Python', 'Java']; // Sample course list

    const handleSignout = () => {
        sessionStorage.clear();
    };

    // Filter courses based on search term
    const filteredCourses = courses.filter(course =>
        course.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <header className='bg-white shadow-lg p-4 flex justify-between items-center'>
                <div className="logo">
                    <a href="/" className='text-[18px] font-semibold'>E-Learning</a>
                </div>
                <nav className='w-[30%] flex justify-evenly'>
                    <a href="/">About</a>
                    <a href="/courses">Courses</a>
                    <a href="/new-tutorial">New Tutorial</a>
                    <a href="/testimonials">Testimonial</a>
                </nav>
                <div className='w-[230px] flex justify-between items-center'>
                    {userRole === 'teacher' && (
                        <a href="/addCourse" className='border py-1 px-5 rounded hover:bg-gray-400 hover:text-white'>
                            Add Course
                        </a>
                    )}
                    <button className='border py-1 px-5 rounded hover:bg-gray-400 hover:text-white'>
                        <Link to='/userSignup' onClick={handleSignout}>Sign Out</Link>
                    </button>
                </div>
            </header>
            <div className='flex justify-center w-[100%] p-3'>
                <input
                    type="text"
                    placeholder='Search for a course...'
                    className='border p-2 w-[50%] rounded'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className='flex flex-wrap justify-center mt-4'>
                {/* Render course boxes */}
                {filteredCourses.length > 0 ? (
                    filteredCourses.map((course, index) => (
                        <div key={index} className='p-4 m-2 border rounded w-[200px] text-center bg-gray-100 shadow-lg hover:bg-gray-900 hover:text-white'>
                            <p className='font-semibold'>{course}</p>
                        </div>
                    ))
                ) : (
                    searchTerm && (
                        <p className='text-center mt-4 text-red-500'>No courses found.</p>
                    )
                )}
            </div>
        </div>
    );
};

export default Header;
