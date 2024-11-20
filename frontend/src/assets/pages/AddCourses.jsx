import React, { useState } from 'react';
import axios from 'axios';

const AddCourses = () => {
    const [addCourse, setAddCourse] = useState({
        name: '',
        description: '',
    });

    const handleInputChanges = (e) => {
        const { name, value } = e.target;
        setAddCourse((preCourse) => ({
            ...preCourse,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:2000/addCourse', addCourse);
            alert('Course added successfully!');
            setAddCourse({ name: '', description: '' }); // Reset form
        } catch (err) {
            console.error(err);
            alert('Failed to add course. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center p-4">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">Add New Course</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Course Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={addCourse.name}
                            onChange={handleInputChanges}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="Enter course name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={addCourse.description}
                            onChange={handleInputChanges}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            rows="4"
                            placeholder="Enter course description"
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Add Course
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCourses;
