let mongoose = require('mongoose'); 
 
let User = mongoose.model('User', {
    username: String,
    password: String,
    email: String,
    firstName: String,
    lastName: String
});

module.exports = User;
