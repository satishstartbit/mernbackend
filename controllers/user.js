
const mongoose = require("mongoose");
const user = require("../models/user/user");
const users = mongoose.model('user', user.user);
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
exports.registeruser = (req, res, next) => {

    bcrypt.hash(req.body.password, 12)
        .then((hashpassword) => {
            var savedata = new users({
                name: req.body.name,
                email: req.body.email,
                password: hashpassword
            })
            savedata.save()
        })
        .catch((err) => console.log(err))
}

exports.loginuser = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password
    console.log(req.body);
    let loadedUser;
    users.findOne({ email: email })
    loadedUser = user
    .then((user) => {
            return bcrypt.compare(password, user.password)
        })
        .then((isEqual) => {
            if (!isEqual) {
                const error = new Error("Wrong password")
                error.statusCode = 401
                throw error
            }

            const token = jwt.sign({
                email: loadedUser.email,
                userId: loadedUser._id.toString()
            }, "somesupersecretsecret", { expiresIn: "1h" })

            res.status(200).json({ token: token, userid: loadedUser._id.toString() })
        })
        .catch((err) => {
            console.log(err);
        })
}