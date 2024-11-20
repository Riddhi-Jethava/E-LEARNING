const mongoose = require("mongoose");

const schema = mongoose.Schema({
    image: {
        type:String
    },
    name: {
        type: String,
        required : true
    },
    description: {
        type: String,
        required : true
    },
    duration: {
        type: String,
        required : true
    },
    instructor: {
        type: String,
        required : true
    }
});

const courseSchema = mongoose.model("courseData", schema);

module.exports = courseSchema

