const userSchema = require("../model/userSchema");
const jwt = require('jsonwebtoken')

module.exports.userSignup = async (req, res) => {
    try {
        const data = await userSchema.create(req.body)
        if (data) {
            res.status(200).json({ msg: 'Welcome to the site!' })
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({ msg: 'something went wrong, try again' })
    }
}

module.exports.userLogin = async (req, res) => {
    try {
        const user = await userSchema.findOne({ email: req.body.email, password: req.body.password });
        if (user || password == req.body.password) {
            const token = jwt.sign({user : user}, "chinchan")
            res.status(200).json({ msg: 'Login Successfully!' , token, userRole: user.role})
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({ msg: 'data not matched, try again' })
    }
}

module.exports.addCourse = (req,res) => {
    
}