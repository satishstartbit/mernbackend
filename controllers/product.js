  
const mongoose = require("mongoose");
const product = require("../models/product/product");
const addproduct = mongoose.model('product', product.product);

exports.addproduct = (req, res, next) => {
    var savedata = new addproduct({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price
    })
    savedata.save()
    
}


exports.deleteproduct = (req, res, next) => {
    addproduct.findById(req.body.id).then(product=>{
        return product.deleteOne();
    })
}
