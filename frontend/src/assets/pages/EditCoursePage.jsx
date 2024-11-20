import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditCoursePage = () => {
  const { id } = useParams(); // Get the course id from the URL
  const [course, setCourse] = useState({
    name: '',
    subject: '',
    category: '',
    duration: '',
  });
  const navigate = useNavigate();

  // Fetch the current course data when the page loads
  useEffect(() => {
    axios
      .get(`http://localhost:2000/getCourseById?id=${id}`)
      .then((res) => {
        setCourse(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:2000/editCourse?id=${id}`, course);
      alert('Course updated successfully');
      navigate('/homePage'); // Redirect to homepage after update
    } catch (err) {
      console.log(err);
      alert('Failed to update course');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Edit Course
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Course Name</label>
            <input
              type="text"
              name="name"
              value={course.name}
              onChange={handleInputChanges}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              name="description"
              value={course.description}
              onChange={handleInputChanges}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Duration</label>
            <input
              type="text"
              name="duration"
              value={course.duration}
              onChange={handleInputChanges}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Instructor</label>
            <input
              type="text"
              name="instructor"
              value={course.instructor}
              onChange={handleInputChanges}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
          >
            Update Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCoursePage;
