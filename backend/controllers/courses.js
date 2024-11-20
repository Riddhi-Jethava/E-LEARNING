const courseSchema = require("../model/course");

module.exports.showCourses = async (req, res) => {
  try {
    const data = await courseSchema.find({});
    res.status(200).json({ msg: "course added", data }); // Ensure 'data' contains the courses
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Failed to fetch courses", error: err });
  }
};

module.exports.courses = async (req, res) => {
  console.log('Request Body:', req.body); // Log the incoming data
  try {
    const data = await courseSchema.create(req.body);
    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }
    res.status(200).json({ message: "Course added successfully", data });
  } catch (error) {
    console.error('Error in creating course:', error);
    res.status(500).json({ message: 'Failed to add course' });
  }
};

module.exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.query;
    const isDeleted = await courseSchema.findByIdAndDelete(id);

    if (isDeleted) {
      res.status(200).json({ message: 'Course deleted successfully' });
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error deleting course', error: err });
  }
};

module.exports.editCourse = async (req, res) => {
  try {
    const data = await courseSchema.findByIdAndUpdate(req.query.id, req.body);
    data
      ? res.status(200).json({ data })
      : res.status(404).json({ message: "Not Edited" })
  } catch (err) {
    console.log(err)
  }
}





