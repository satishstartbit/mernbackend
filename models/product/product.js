var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports.product = new Schema({
    title:String,
    description: String,
    price:String
}, {
    collection: 'product'
});