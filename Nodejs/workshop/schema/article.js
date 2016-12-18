let mongoose = require('mongoose'); 
let dbconnection = require('./dbconnection.js'); 

let Article = mongoose.model('Articles', {
    title: { type: String, required: true },
    author: { type: String, required: true, default: "Unknown"},
    publishedAt: { type: Date, required: true, default: Date.now},
    urlToImage: { type: String },
    url: { type: String },
    description: { type: String }

});

module.exports = Article;