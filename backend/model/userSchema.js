const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["teacher", "student"], // Enum to restrict roles to teacher or student
        required: true,
    }
});

const userSchema = mongoose.model("userDetail", schema);

module.exports = userSchema

