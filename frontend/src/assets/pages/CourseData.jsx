import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const CourseData = () => {
    const [addCourse, setAddCourse] = useState({
        image: '',
        name: '',
        description: '',
        duration: '',
        instructor: '',
    });
    const navigate = useNavigate();

    const handleInputChanges = (e) => {
        const { name, value } = e.target;
        setAddCourse((preCourse) => ({
            ...preCourse,
            [name]: value,
        }));
    };

    const handleImageInput = (e) => {
        setAddCourse({ ...addCourse,  image: typeof image === 'string' ? image : '' })
        console.log(e.target.value);
    }  

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Data to Send:', addCourse); // Log the data before sending

        try {
            const response = await axios.post('http://localhost:2000/courses', addCourse);
            console.log('Response:', response.data); // Log the response
            alert('Course added successfully!');
            navigate('/homePage');
        } catch (err) {
            console.error('Error in adding course:', err.response || err);
            alert('Failed to add course. Please try again.');
        }
    };


    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-teal-100">
            <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-lg">
                <header className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-blue-700 mb-1">Add New Course</h1>
                    <p className="text-sm text-gray-500">Please fill out the course details below</p>
                </header>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5" encType='multipart/form-data'>
                    {/* Course Name */}
                    <div>
                    <input type="file" name="image" id="" placeholder='image' onChange={handleImageInput} className='border w-[100%] p-2 mb-3 rounded-lg' />
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Course Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={addCourse.name}
                            onChange={handleInputChanges}
                            placeholder="Enter course name"
                            className="mt-2 block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-3"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Description
                        </label>
                        <textarea
                            name="description"
                            id="description"
                            value={addCourse.description}
                            onChange={handleInputChanges}
                            placeholder="Enter course description"
                            rows="3"
                            className="mt-2 block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-3"
                            required
                        ></textarea>
                    </div>

                    {/* Duration */}
                    <div>
                        <label
                            htmlFor="duration"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Duration (in weeks)
                        </label>
                        <input
                            type="number"
                            name="duration"
                            id="duration"
                            value={addCourse.duration}
                            onChange={handleInputChanges}
                            placeholder="Enter duration"
                            className="mt-2 block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-3"
                            required
                        />
                    </div>

                    {/* Instructor */}
                    <div>
                        <label
                            htmlFor="instructor"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Instructor Name
                        </label>
                        <input
                            type="text"
                            name="instructor"
                            id="instructor"
                            value={addCourse.instructor}
                            onChange={handleInputChanges}
                            placeholder="Enter instructor name"
                            className="mt-2 block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-3"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg shadow-md font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        Add Course
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CourseData;
