var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports.user = new Schema({
    name:String,
    email: String,
    password:String
}, {
    collection: 'user'
});