const express = require("express");
const routes = express.Router();
const db = require("../config/database");
const controller = require("../controllers/userCtrl");
const courseCtrl = require("../controllers/courses");

routes.post("/login", controller.userLogin);
routes.post("/userSignup", controller.userSignup);
routes.post("/addCourse", controller.addCourse);

const multer = require("multer");
const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now())
    }
});

const uploads = multer({ storage: Storage }).single("image");

//course 

routes.get("/showCourses", courseCtrl.showCourses);
routes.post("/courses", uploads, courseCtrl.courses);
routes.delete("/deleteCourse", courseCtrl.deleteCourse);
routes.post("/editCourse", courseCtrl.editCourse);

const courseSchema = require("../model/course")

routes.get('/getCourseById', async (req, res) => {
    try {
        const { id } = req.query;
        const course = await courseSchema.findById(id);
        if (course) {
            res.status(200).json(course); // Return course data
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Edit course
routes.put('/editCourse', async (req, res) => {
    try {
        const { id } = req.query;
        const updatedCourse = await courseSchema.findByIdAndUpdate(id, req.body, { new: true });
        if (updatedCourse) {
            res.status(200).json(updatedCourse); // Return updated course
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});




module.exports = routes