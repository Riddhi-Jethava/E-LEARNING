import React, { useEffect, useState } from 'react';
import Header from '../components/Header'; // Assuming you have a header component
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn, FaPlay } from "react-icons/fa";

const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const navigate = useNavigate();

  // Fetch courses from backend
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    axios.get('http://localhost:2000/showCourses')
      .then(res => setCourses(res.data.data))
      .catch(err => console.error(err));
  };

  const handleEdit = (id) => {
    navigate(`/editCourse/${id}`);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:2000/deleteCourse?id=${id}`)
      .then((res) => {
        alert(res.data.message);
        fetchCourses(); // Reload courses after deletion
      })
      .catch((err) => {
        console.error(err);
        alert("Error deleting the course.");
      });
  };

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage('');
  };

  return (
    <div className={`relative bg-gray-100 ${isModalOpen ? 'opacity-50' : 'opacity-100'}`}>
      <Header />

      <div className="container mx-auto px-4 py-6 h-[75vh]">
        <h2 className="text-2xl font-bold text-center mb-6">Available Courses</h2>

        <div className="flex flex-wrap gap-4">
          {courses.map((course) => (
            <div
              key={course._id}
              className="course-item group relative p-4 shadow-lg rounded-md bg-white w-[24%] h-[350px] overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative bg-gray-200 border h-[160px] flex justify-center items-center">
                <img
                  src={course.image ? `http://localhost:2000/uploads/${course.image}` : ""}
                  alt="Course Preview"
                  className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 transition duration-300"
                />
                <FaPlay
                  className="text-white text-4xl opacity-0 group-hover:opacity-100 transition duration-300"
                />
                <button
                  onClick={() => openModal(`http://localhost:2000/uploads/${course.image}`)}
                  className="absolute bottom-2 left-2 bg-gray-800 text-white px-3 py-1 rounded-md text-sm opacity-0 group-hover:opacity-100 transition duration-300"
                >
                  View Video
                </button>
              </div>

              {/* Scrollable Course Details */}
              <div className="text-content p-4 overflow-hidden max-h-[170px] overflow-y-auto custom-scroll">
                <h3 className="text-xl font-semibold text-gray-800 mt-1 mb-3">{course.name}</h3>
                <p className="text-gray-600">
                  <span className="font-semibold">Description:</span> {course.description}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Duration:</span> {course.duration} week
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Instructor:</span> {course.instructor}
                </p>
              </div>

              {/* Swipe-Up Buttons */}
              <div
                className="absolute bottom-[-100%] left-0 w-full bg-gradient-to-t from-gray-800 to-transparent text-white flex justify-evenly items-center py-4 
             group-hover:bottom-0 transition-all duration-500 ease-in-out"
              >
                <button
                  onClick={() => handleEdit(course._id)}
                  className="bg-blue-500 px-4 py-2 rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(course._id)}
                  className="bg-red-500 px-4 py-2 rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>


          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto flex justify-between items-center">
          {/* Left: Links */}
          <div className="flex space-x-6">
            <a href="/homePage" className="hover:text-[#FF4744]">Home</a>
            <a href="/about" className="hover:text-[#FF4744]">About</a>
            <a href="/contact" className="hover:text-[#FF4744]">Contact</a>
          </div>

          {/* Middle: Social media */}
          <div className="flex space-x-4">
            <a href="#" className="text-2xl hover:text-[#FF4744]"><FaFacebookF /></a>
            <a href="#" className="text-2xl hover:text-[#FF4744]"><FaGooglePlusG /></a>
            <a href="#" className="text-2xl hover:text-[#FF4744]"><FaLinkedinIn /></a>
          </div>

          {/* Right: Copyright */}
          <div>
            <p className="text-sm">© 2024 Your Company Name. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg w-[900px] h-[400px] max-w-full">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
              ✕
            </button>
            <img
              src={selectedImage}
              alt="Selected Course"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
