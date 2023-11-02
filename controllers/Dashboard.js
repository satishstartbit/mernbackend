
const mongoose = require("mongoose");
const product = require("../models/product/product");
const products = mongoose.model('product', product.product);

exports.dashboard = (req, res, next) => {
    const page = req.query.page || 1
    let totalitem;
    products.find()
        .count()
        .then((numproducts) => {
            totalitem = numproducts
            return products.find()
                .skip((page - 1) * 4)
                .limit(4)
        })
        .then(function (data) {
            res.send(JSON.stringify({
                data:data,
                totalitem: Math.ceil(totalitem/4)
            }))
        })

}