const mongoose = require("mongoose");
const user = require("../models/user/user");
const users = mongoose.model('user', user.user);
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const product = require("../models/product/product");
const addproduct = mongoose.model('product', product.product);
module.exports = {

    createUser({ userInput }, req) {
        console.log(userInput.name);
        bcrypt.hash(userInput.password, 12)
            .then((hashpassword) => {
                var savedata = new users({
                    name: userInput.name,
                    email: userInput.email,
                    password: hashpassword
                })
                savedata.save()
            })
        return {
            email: userInput.email,
            name: userInput.name,
            password: userInput.password
        }
    },

    addproduct({ userproduct }, req) {
        var savedata = new addproduct({
            title: userproduct.title,
            description: userproduct.description,
            price: userproduct.price
        })
        savedata.save()
        return {
            title: userproduct.title,
            description: userproduct.description,
            price: userproduct.price
        }
    },
    login: async function({ email, password }) {
        const userdata = await users.findOne({ email: email })
        const isEqual = await bcrypt.compare(password, userdata.password)
        if (!isEqual) {
            const error = new Error("Wrong password")
            error.statusCode = 401
            throw error
        }
        const token = jwt.sign({
            email: userdata.email,
            userId: userdata._id.toString()
        }, "somesupersecretsecret", { expiresIn: "1h" })
        return {
            token: token,
            userId: userdata._id.toString()
        }
    }

}